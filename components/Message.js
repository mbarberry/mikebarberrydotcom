import { Alert, AlertIcon } from '@chakra-ui/react';

export default function Message() {
  return (
    <Alert
      status='success'
      variant='left-accent'
      pos='absolute'
      top='7'
      left='50%'
      transform='translate(-50%)'
      w='auto'>
      <AlertIcon />
      Hi, thanks for stopping by!
    </Alert>
  );
}
