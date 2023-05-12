import { useRef, useState, useEffect } from 'react';
import { chakra, useDisclosure } from '@chakra-ui/react';

import Animation from '#/components/Animation';
import Message from '#/components/Message';

import { triggerFireworks, lambdaURL, getRects } from '#/utils';

export default function Index() {
  const ref = useRef(null);

  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure({
    onOpen: () => {
      setTimeout(() => {
        onClose();
      }, 5000);
    },
  });

  useEffect(() => {
    const oneDay = 86400000;
    const now = Date.now();
    const lastFireworkDisplay = window.localStorage.getItem('fireworks');

    if (!loading) {
      if (!lastFireworkDisplay || lastFireworkDisplay < now - oneDay) {
        triggerFireworks();
        window.localStorage.setItem('fireworks', now);
        fetch(lambdaURL);
        onOpen();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <chakra.div h='100vh'>
      {isOpen && <Message />}
      <Animation
        loading={loading}
        setLoading={setLoading}
        calcDimensions={() => getRects(ref.current)}
        ref={ref}
      />
    </chakra.div>
  );
}
