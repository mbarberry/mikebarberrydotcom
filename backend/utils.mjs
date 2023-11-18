import https from 'node:https';

export function getIpInfo(ipAddress) {
  return new Promise((resolve, reject) => {
    https.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}&ip=${ipAddress}`,
      (res) => {
        res
          .on('data', (rawData) => {
            const data = JSON.parse(rawData);
            resolve({
              state: data.state_prov,
              city: data.city,
              time: data.time_zone.current_time,
            });
          })
          .on('error', (err) => {
            reject({ error: err });
          });
      }
    );
  });
}

function getZoomToken(reqURL) {
  return new Promise((resolve, reject) => {
    const req = https.request(reqURL, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const { access_token } = JSON.parse(data);
        resolve(access_token);
      });
    });
    req.on('error', (e) => {
      reject(e.message);
    });
  });
}

export async function getZoomAuthToken() {
  const requestQuery = new URLSearchParams([
    ['grant_type', 'account_credentials'],
    ['account_id', process.env['ZOOM_ACCOUNT_ID']],
  ]);

  const request = {
    hostname: 'zoom.us',
    path: '/oauth/token'.concat(`?${requestQuery.toString()}`),
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env['ZOOM_CLIENT_ID']}:${process.env['ZOOM_CLIENT_SECRET']}`
      ).toString('base64')}`,
    },
  };

  try {
    const accessToken = await getZoomToken(request);
    return accessToken;
  } catch (e) {
    return new Error(e);
  }
}

export function makeZoomMeetingReq(reqURL, requestData) {
  return new Promise((resolve, reject) => {
    const req = https.request(reqURL, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    });
    req.on('error', (e) => {
      reject(e.message);
    });
    req.write(requestData);
    req.end();
  });
}
