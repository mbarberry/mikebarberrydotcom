import { MongoClient, ServerApiVersion } from 'mongodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import DOMPurify from 'isomorphic-dompurify';
import { getIpInfo } from './utils.mjs';

const credentials = './mikebarberrycomdb.pem';

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
        Data: `**MikeBarberry.com Contact**`,
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
    console.error(`Failed to get post HTML:\n${e}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Error getting post HTML.',
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
    const posts = await collection
      .find({})
      .project({ year: 1, _id: 0 })
      .toArray();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        years: [...new Set(posts.map((post) => post.year))].sort(),
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
    }
  }
}
