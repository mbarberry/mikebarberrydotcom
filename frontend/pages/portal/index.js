import { useEffect, useState } from 'react';

import ClientLogin from '#/components/portal/ClientLogin';
import ClientPage from '#/components/portal/ClientPage';

export default function Portal() {
  const [client, setClient] = useState(null);

  useEffect(() => {
    let subscribed = true;

    const setClientInfo = () => {
      const clientInfo = JSON.parse(window.localStorage.getItem('clientInfo'));
      setClient(clientInfo);
    };

    if (subscribed) {
      if (window.localStorage.getItem('clientInfo')) {
        setClientInfo();
      }

      window.addEventListener('storage', setClientInfo);
    }

    return () => {
      subscribed = false;
      window.removeEventListener('storage', setClientInfo);
    };
  }, []);

  if (!client) {
    return <ClientLogin />;
  }
  return (
    <ClientPage
      client={client}
      signOut={() => {
        window.localStorage.removeItem('clientInfo');
        setClient(null);
      }}
    />
  );
}
