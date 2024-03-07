import https from 'node:https';

import { MongoClient, ServerApiVersion } from 'mongodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import DOMPurify from 'isomorphic-dompurify';
import isEmail from 'validator/lib/isEmail.js';
import { google } from 'googleapis';

import { getIpInfo } from './utils.mjs';

const credentials = './mikebarberrycomdb.pem';

const PORTAL_PROD_URL = 'https://mikebarberry.com/portal';
const PORTAL_DEV_URL = 'http://localhost:3000/portal';

const client = new MongoClient(process.env.MONGO_URI, {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1,
});

const sesClient = new SESClient({ region: 'us-west-2' });

const logVisit = async (event) => {
  const ipAddress = event.requestContext.identity.sourceIp;
  const db = client.db('main');
  const collection = db.collection('visitors');
  try {
    const visitorInfo = await getIpInfo(ipAddress);
    const { state, city, time } = visitorInfo;
    if (
      ![
        '71.94.251.208',
        '47.36.143.4',
        '2600:6c55:497f:fd91:4dd6:8dde:f11e:d5af',
      ].includes(ipAddress)
    ) {
      await collection.insertOne({
        ipAddress,
        time,
        city,
        state,
      });
    }
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Request successfully processed.',
        reqIp: ipAddress,
        visitorInfo,
      }),
    };
  } catch (err) {
    console.log(`Error logging visit:\n${err}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: err,
      }),
    };
  }
};

const verifyHcaptcha = async (event) => {
  const body = JSON.parse(event.body);

  const formData = new URLSearchParams([
    ['response', body.token],
    ['secret', process.env.HCAPTCHA_SECRET],
  ]);

  try {
    const response = await fetch('https://api.hcaptcha.com/siteverify', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: formData,
    });
    const json = await response.json();
    const success = json.success || false;
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success,
      }),
    };
  } catch (err) {
    console.log(`Error verifying hcaptcha:\n${err}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Error verifying hcaptcha.',
      }),
    };
  }
};

const sendContactEmail = async (event) => {
  const body = JSON.parse(event.body);

  // Remove HTML.
  for (const [key, value] of Object.entries(body)) {
    if (['name', 'email', 'message'].includes(key)) {
      const purified = DOMPurify.sanitize(value, {
        ALLOWED_TAGS: [],
        KEEP_CONTENT: false,
      });
      body[key] = purified || 'Probably XSS attempt';
    }
  }

  const { name, email, message } = body;

  const toAddress = 'mbarberry15@gmail.com';
  const fromAddress = 'mail@mikebarberry.com';

  const command = {
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<div><p>Contact name: ${name}</p><p>Return email: ${email}</p><p>Message: ${message}</p></div>`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `Contact name: ${name}\nReturn email: ${email}\nMessage: ${message}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Mike Barberry Dot Com Contact Form`,
      },
    },
    Source: fromAddress,
  };

  try {
    const sendEmailCommand = new SendEmailCommand(command);
    await sesClient.send(sendEmailCommand);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
      }),
    };
  } catch (e) {
    console.error(`Failed to send email:\n${e}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Error sending contact email.',
      }),
    };
  }
};

const getYearPosts = async (event) => {
  const body = JSON.parse(event.body);
  const year = Number(body.year);

  const db = client.db('main');
  const collection = db.collection('blogs');

  try {
    const posts = await collection.find({ year }).toArray();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        posts,
      }),
    };
  } catch (e) {
    console.error(`Failed to get year blogs posts:\n${e}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Error getting year blog posts.',
      }),
    };
  }
};

const getPost = async (event) => {
  const body = JSON.parse(event.body);
  const { year, post } = body;

  const db = client.db('main');
  const collection = db.collection('blogs');

  try {
    const target = (await collection.find({ year, name: post }).toArray())[0];
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        html: target.html,
        claps: target.claps,
      }),
    };
  } catch (e) {
    console.error(`Failed to get post info:\n${e}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Error getting post info.',
      }),
    };
  }
};

const updatePostClaps = async (event) => {
  const body = JSON.parse(event.body);
  const { year, post, email } = body;

  const db = client.db('main');
  const collection = db.collection('blogs');

  const validateEmail = () => {
    return isEmail(email);
  };

  try {
    // Exit if not valid email.
    if (!validateEmail()) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Invalid email address.',
        }),
      };
    }

    const findPost = { year, name: post };
    const target = (await collection.find(findPost).toArray())[0];

    // Exit if post not found.
    if (!target) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Post not found.',
        }),
      };
    }

    // Exit if email already clapped
    // for this post.
    if (target.clappers.includes(email)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Email address already clapped for this post.',
        }),
      };
      // Update post claps and clappers.
    } else {
      const updatePost = {
        $inc: { claps: 1 },
        $push: { clappers: email },
      };
      const result = await collection.updateOne(findPost, updatePost);

      // Everything worked.
      if (result.acknowledged) {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            success: true,
          }),
        };
        // An error updating the post.
      } else {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            success: false,
            error: 'Error updating post claps.',
          }),
        };
      }
    }
    // Server error in the try block.
  } catch (e) {
    console.error(`Failed to update post claps:\n${e}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Server error updating post claps.',
      }),
    };
  }
};

const getAllBlogPosts = async (event) => {
  const db = client.db('main');
  const collection = db.collection('blogs');

  try {
    const posts = await collection.find({}).toArray();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        posts,
      }),
    };
  } catch (e) {
    console.error(`Failed to get all blogs posts:\n${e}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Error getting all blog posts.',
      }),
    };
  }
};

const getPostYears = async () => {
  const db = client.db('main');
  const collection = db.collection('blogs');

  try {
    // Return post years sorted
    // in desc. order as { year,
    // count: # of posts }.
    const posts = await collection
      .find({})
      .project({ year: 1, _id: 0 })
      .toArray();
    const uniqueYears = [...new Set(posts.map((post) => post.year))];
    const uniqueYearsWCount = uniqueYears.map((year) => {
      return {
        year,
        count: posts.filter((post) => post.year === year).length,
      };
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        years: uniqueYearsWCount.sort((a, b) => b.year - a.year),
      }),
    };
  } catch (e) {
    console.error(`Failed to get post years:\n${e}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Error getting post years.',
      }),
    };
  }
};

const addExclude = async (event) => {
  const db = client.db('main');
  const collection = db.collection('emails');

  const { name, website, email } = event.queryStringParameters;

  try {
    const result = await collection.insertOne({ name, website, email });
    if (result.acknowledged) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain',
        },
        body: 'Successfully opted out.',
      };
    }
  } catch (e) {
    console.log(`Error opting out:\n${e}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: 'A server error occurred while opting out. Operation failed.',
    };
  }
};

const getGoogleAuthURL = (event) => {
  const { env } = event.queryStringParameters;

  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    redirectUri: env === 'prod' ? PORTAL_PROD_URL : PORTAL_DEV_URL,
  });

  try {
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'online',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: url,
    };
  } catch (e) {
    console.log(`Error getting Google auth URL:\n${e}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: 'Error getting Google auth URL.',
    };
  }
};

const getGoogleAuthToken = async (event) => {
  const { code, env } = JSON.parse(event.body);

  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    redirectUri: env === 'prod' ? PORTAL_PROD_URL : PORTAL_DEV_URL,
  });

  try {
    const token = await oauth2Client.getToken(code);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: token.tokens.access_token,
    };
  } catch (e) {
    console.log(`Error getting Google auth token:\n${e}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: 'Error getting Google auth token.',
    };
  }
};

const getGoogleAuthInfo = async (event) => {
  const { accessToken } = JSON.parse(event.body);

  try {
    const client = new google.auth.OAuth2();
    client.setCredentials({ access_token: accessToken });
    const command = google.oauth2({
      auth: client,
      version: 'v2',
    });
    const { data } = await command.userinfo.get();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clientInfo: data }),
    };
  } catch (e) {
    console.log(`Error getting Google auth info:\n${e}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: 'Error getting Google auth info.',
    };
  }
};

const createZoomMeeting = async (event) => {
  const { Authorization } = event.headers;
  if (!Authorization.split(' ')[1] === process.env.SECRET_PASSWORD) {
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: 'Not authorized.',
    };
  }
  const getZoomToken = async () => {
    const creds = {
      actid: process.env.ZOOM_ACCOUNT_ID,
      cliid: process.env.ZOOM_CLIENT_ID,
      clisec: process.env.ZOOM_CLIENT_SECRET,
    };

    const formData = new URLSearchParams([
      ['grant_type', 'account_credentials'],
      ['account_id', creds.actid],
    ]);

    const request = {
      hostname: 'zoom.us',
      path: '/oauth/token'.concat(`?${formData.toString()}`),
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${creds.cliid}:${creds.clisec}`
        ).toString('base64')}`,
      },
    };

    const makeRequest = () => {
      return new Promise((resolve, reject) => {
        const req = https.request(request, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            const { access_token } = JSON.parse(data);
            resolve(access_token);
          });

          res.on('error', (e) => {
            reject(e.message);
          });
        });

        req.on('error', (e) => {
          reject(e.message);
        });

        req.end();
      });
    };

    let accessToken = null;
    try {
      accessToken = await makeRequest();
      return accessToken;
    } catch (e) {
      console.log(`Error getting Zoom access token: ${e}`);
    } finally {
      return accessToken;
    }
  };

  const accessToken = await getZoomToken();
  if (!accessToken) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: `Error getting Zoom access token`,
    };
  }

  const makeMeeting = async () => {
    let client, meeting;
    try {
      const body = JSON.parse(event.body);
      client = body.client;
      meeting = body.meeting;
    } catch (e) {
      console.log(`Error parsing JSON body: ${e}`);
      return null;
    }

    const topic = `${client.name} & Mike Meeting`;

    const createStartTime = () => {
      for (const [key, value] of Object.entries(meeting)) {
        if (value < 10) {
          meeting[key] = '0'.concat(value);
        }
      }
      return `${meeting.year}-${meeting.month}-${meeting.day}T${meeting.hour}:${meeting.minute}:00`;
    };

    const requestData = JSON.stringify({
      agenda: topic,
      topic,
      type: 2,
      duration: 30,
      settings: {
        waiting_room: false,
        email_notification: true,
        join_before_host: true,
        meeting_authentication: false,
        meeting_invitees: [
          {
            email: client.email,
          },
        ],
      },
      timezone: 'America/Los_Angeles',
      start_time: createStartTime(),
    });

    const request = {
      hostname: 'api.zoom.us',
      path: `/v2/users/me/meetings`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    const makeRequest = () => {
      return new Promise((resolve, reject) => {
        const req = https.request(request, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            resolve(JSON.parse(data));
          });

          res.on('error', (e) => {
            reject(e.message);
          });
        });

        req.on('error', (e) => {
          reject(e.message);
        });

        req.write(requestData);

        req.end();
      });
    };

    let meetingInfo = null;
    try {
      meetingInfo = await makeRequest();
    } catch (e) {
      console.log(`Error making Zoom meeting request: ${e}`);
    } finally {
      return meetingInfo;
    }
  };

  const meetingInfo = await makeMeeting();
  if (!meetingInfo) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: `Error making Zoom meeting`,
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startURL: meetingInfo.start_url,
      topic: meetingInfo.topic,
      joinURL: meetingInfo.join_url,
      startTime: meetingInfo.startTime,
      password: meetingInfo.password,
    }),
  };
};

const addClientReview = async (event) => {
  try {
    const db = client.db('main');
    const reviews = db.collection('reviews');
    const clients = db.collection('clients');

    const { firstName, lastName, company, review } = JSON.parse(event.body);

    // Check if the company from the form matches
    // a name from the official clients collection.
    const isLegit =
      (await clients.find({ organizationName: company }).toArray()).length > 0;

    if (!isLegit) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain',
        },
        body: `Unknown organization.`,
      };
    }

    const result = await reviews.insertOne({
      firstName,
      lastName,
      company,
      review,
    });

    if (result.acknowledged) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain',
        },
        body: 'Review added!',
      };
    }
    throw new Error('Problem inserting into MongoDB collection.');
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: `Error adding client review.`,
    };
  }
};

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'access-control-allow-headers':
          'content-type,x-amz-date,authorization,x-api-key,x-amz-security-token,origin,accept',
        'access-control-allow-methods': 'options,post,get,put,delete',
        'access-control-allow-origin': '*',
      },
    };
  } else if (event.httpMethod === 'GET') {
    switch (event.path) {
      case '/visitor': {
        return logVisit(event);
      }
      case '/blog': {
        return getAllBlogPosts(event);
      }
      case '/blog/years': {
        return getPostYears(event);
      }
      case '/outreach/exclude': {
        return addExclude(event);
      }
      case '/auth/google/url': {
        return getGoogleAuthURL(event);
      }
    }
  } else if (event.httpMethod === 'POST') {
    switch (event.path) {
      case '/verify': {
        return verifyHcaptcha(event);
      }
      case '/contact': {
        return sendContactEmail(event);
      }
      case '/blog/year': {
        return getYearPosts(event);
      }
      case '/blog/post': {
        return getPost(event);
      }
      case '/blog/post/clap': {
        return updatePostClaps(event);
      }
      case '/auth/google/token': {
        return getGoogleAuthToken(event);
      }
      case '/auth/google/info': {
        return getGoogleAuthInfo(event);
      }
      case '/auth/zoom/meeting': {
        return createZoomMeeting(event);
      }
      case '/review': {
        return addClientReview(event);
      }
    }
  } else {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: 'File not found.',
    };
  }
}
