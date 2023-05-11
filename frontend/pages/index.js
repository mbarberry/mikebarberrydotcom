import { useRef, useState, useEffect } from 'react';
import { chakra } from '@chakra-ui/react';

import Animation from '#/components/Animation';
import Message from '#/components/Message';

import { triggerFireworks, lambdaURL, getRects } from '#/utils';

export default function Index() {
  const ref = useRef(null);

  const calcDimensions = () => {
    const [width, height] = getRects(ref.current);
    return { width, height };
  };

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
    <chakra.div h='100vh'>
      {showMessage && <Message />}
      <Animation
        loading={loading}
        setLoading={setLoading}
        calcDimensions={calcDimensions}
        ref={ref}
      />
    </chakra.div>
  );
}
