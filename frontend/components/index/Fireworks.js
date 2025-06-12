import { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import Message from './Message';
import { triggerFireworks, shouldShowFireworks, lambdaURL } from '#/utils';

export default function Fireworks({ ready }) {
  const { isOpen, onOpen, onClose } = useDisclosure({
    onOpen: () => {
      setTimeout(() => {
        onClose();
      }, 5000);
    },
  });

  useEffect(() => {
    const lastFireworkDisplay = window.localStorage.getItem('fireworks');
    if (ready && shouldShowFireworks({ lastFireworkDisplay })) {
      triggerFireworks();
      onOpen();
      window.localStorage.setItem('fireworks', Date.now());
      fetch(`${lambdaURL}/visitor`);
    }
  }, [ready]);

  return (
    isOpen && (
      <Message
        type='success'
        words={`Hi, thanks for stopping by!`}
      />
    )
  );
}
