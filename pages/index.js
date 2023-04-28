import { useRef, useState, useEffect } from 'react';

import Loading from '../components/Loading';
import Animation from '../components/Animation';
import Message from '../components/Message';

import { triggerFireworks, lambdaURL } from '../utils';

export default function Index() {
  const refContainer = useRef(null);

  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const oneDay = 86400000;
    const now = Date.now();
    const lastFireworkDisplay = window.localStorage.getItem('fireworks');

    if (!loading) {
      if (!lastFireworkDisplay || lastFireworkDisplay < now - oneDay) {
        triggerFireworks();
        window.localStorage.setItem('fireworks', now);
        fetch(lambdaURL);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      }
    }
  }, [loading]);

  return (
    <div
      style={{ height: '100vh', width: '100%', position: 'relative' }}
      ref={refContainer}>
      {loading && <Loading />}
      {showMessage && <Message />}
      <Animation
        setLoading={setLoading}
        refContainer={refContainer}
      />
    </div>
  );
}
