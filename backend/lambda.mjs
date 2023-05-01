import { MongoClient, ServerApiVersion } from 'mongodb';
import { getIpInfo } from './utils.mjs';

const credentials = './mikebarberrycomdb.pem';

const client = new MongoClient(process.env.MONGO_URI, {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1,
});

export async function handler(event) {
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
    console.log(`An error occurred: ${err}`);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        err,
      }),
    };
  }
}
