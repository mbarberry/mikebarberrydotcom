import { useEffect } from 'react';
import { lambdaURL } from '#/utils';

export default function Authorize() {
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      const url = new URL(window.location);
      const params = url.searchParams;
      const code = params.get('code');

      if (!code) return;

      const fetchTokenAndInfo = async () => {
        const response = await fetch(`${lambdaURL}/auth/google/token`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            code,
            env: process.env.NODE_ENV === 'development' ? 'dev' : 'prod',
          }),
        });
        const accessToken = await response.text();
        const infoResponse = await fetch(`${lambdaURL}/auth/google/info`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ accessToken }),
        });
        const { clientInfo } = await infoResponse.json();
        window.localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
        window.close();
      };

      fetchTokenAndInfo();
    }
    return () => {
      isSubscribed = false;
    };
  }, []);
}
