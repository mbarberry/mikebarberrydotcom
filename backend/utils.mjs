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
