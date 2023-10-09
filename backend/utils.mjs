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

export function checkCaptcha(token) {
  const formData = `response=${token}&secret=${process.env.HCAPTCHA_SECRET}`;
  return new Promise((resolve, reject) => {
    fetch('https://api.hcaptcha.com/siteverify', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      method: 'POST',
      data: formData,
    })
      .then((res) => res.json)
      .then((data) => resolve(data))
      .catch((err) => console.log(err));
  });
}
