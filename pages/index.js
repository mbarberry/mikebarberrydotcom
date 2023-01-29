import { useRef, useState, useEffect } from 'react';

import Loading from '../components/Loading';
import Animation from '../components/Animation';
import Message from '../components/Message';

import { triggerFireworks } from '../utils/welcomeVistor';

export default function Index() {
  const refContainer = useRef(null);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const oneDay = 86400000;
    const now = Date.now();
    const lastFireworkDisplay = window.localStorage.getItem('fireworks');

    if (!lastFireworkDisplay || lastFireworkDisplay < now - oneDay) {
      triggerFireworks();
      window.localStorage.setItem('fireworks', now);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, []);

  return (
    <div
      style={{ height: '100vh', width: '100vw', position: 'relative' }}
      ref={refContainer}>
      {loading && <Loading />}
      {!loading && showMessage ? <Message /> : null}
      <Animation
        setLoading={setLoading}
        refContainer={refContainer}
      />
    </div>
  );
}
