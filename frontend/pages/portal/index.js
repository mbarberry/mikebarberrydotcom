import { useEffect, useState } from 'react';

import ClientLogin from '#/components/portal/ClientLogin';
import ClientPage from '#/components/portal/ClientPage';
import { PortalContextProvider } from '#/components/context/PortalContext';
import { PortalWrapper } from '#/components/portal/Wrappers';
import { lambdaURL } from '#/utils';

export default function Portal() {
  const [client, setClient] = useState(null);

  useEffect(() => {
    let subscribed = true;

    const url = new URL(window.location);
    const params = url.searchParams;
    const code = params.get('code');

    const checkLocalStorage = () => {
      const clientInfo = JSON.parse(window.localStorage.getItem('clientInfo'));
      return clientInfo;
    };

    const setLocalStorage = (key, value) => {
      window.localStorage.setItem(key, value);
    };

    const clearURLSearchParams = () => {
      window.history.pushState(
        {},
        '',
        `${window.location.origin}${window.location.pathname}`
      );
    };

    const finishGoogleAuth = async () => {
      try {
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
        if (subscribed) {
          setLocalStorage('clientInfo', JSON.stringify(clientInfo));
          setClient(clientInfo);
        }
      } catch (e) {
        console.log(`Error finishing Google authorization:\n${e}`);
      } finally {
        clearURLSearchParams();
      }
    };

    if (code) {
      finishGoogleAuth();
    } else {
      const clientStored = checkLocalStorage();
      if (clientStored) {
        if (subscribed) {
          setClient(clientStored);
        }
      }
    }

    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <PortalContextProvider client={client}>
      <PortalWrapper
        render={(authenticated) => {
          if (authenticated) {
            return (
              <ClientPage
                signOut={() => {
                  window.localStorage.removeItem('clientInfo');
                  setClient(null);
                }}
              />
            );
          }
          return <ClientLogin />;
        }}
      />
    </PortalContextProvider>
  );
}
