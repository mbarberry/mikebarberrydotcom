import { Alert, AlertIcon } from '@chakra-ui/react';

export default function Message({ type, words }) {
  return (
    <Alert
      status={type}
      variant='left-accent'
      pos='absolute'
      top='7'
      opacity='90%'
      left='50%'
      transform='translate(-50%)'
      w='auto'>
      <AlertIcon />
      {words}
    </Alert>
  );
}
