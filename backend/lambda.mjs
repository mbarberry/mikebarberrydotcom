import { MongoClient, ServerApiVersion } from 'mongodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
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
    console.log(`Error logging visit: ${err}`);
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
    console.error(`Failed to send email: ${e}`);
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
  } else if (event.httpMethod === 'POST') {
    switch (event.path) {
      case '/verify': {
        return verifyHcaptcha(event);
      }
      case '/contact': {
        return sendContactEmail(event);
      }
    }
  } else if (event.httpMethod === 'GET' && event.path === '/visitor') {
    return logVisit(event);
  }
}
