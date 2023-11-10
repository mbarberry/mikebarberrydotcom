import {
  chakra,
  Modal,
  Button,
  Icon,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FcGoogle, FcCustomerSupport } from 'react-icons/fc';

import { lambdaURL } from '#/utils';

export default function ClientLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGoogleSignIn = async () => {
    const response = await fetch(`${lambdaURL}/auth/google/url`);
    const url = await response.text();
    const windowFeatures = 'left=500,top=500,width=800,height=800';
    window.open(url, '_blank', windowFeatures);
  };

  return (
    <chakra.div
      display='flex'
      height='100%'
      width='100%'
      justifyContent='center'
      alignItems='center'
      paddingTop='45px'
      flexDir='column'>
      <Modal
        size={'lg'}
        isCentered={false}
        trapFocus={false}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody minH={'500px'}>
            <chakra.div
              display='flex'
              flexDir='column'
              gap='50px'>
              <chakra.div
                display='flex'
                flexDir='column'
                justifyContent={'center'}
                alignItems='center'
                gap='15px'>
                <chakra.h1
                  fontSize='18px'
                  paddingTop='30px'>
                  Sign in to
                </chakra.h1>
                <chakra.img
                  height='200'
                  width='200'
                  borderRadius='100px'
                  src='/mbllc.png'
                  alt='logo'
                />
              </chakra.div>
              <chakra.div
                display='flex'
                justifyContent={'center'}
                alignItems={'center'}
                flexDir='column'
                gap='20px'>
                <Button
                  onClick={handleGoogleSignIn}
                  colorScheme='messenger'
                  size='md'>
                  <FcGoogle />
                  &nbsp;&nbsp;&nbsp; Google
                </Button>
              </chakra.div>
            </chakra.div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <chakra.div
        display='flex'
        flexDir={'column'}
        alignContent={'center'}
        justifyContent={'center'}
        textAlign={'center'}
        gap='20px'>
        <chakra.div
          display='flex'
          flexDir={'row'}
          alignContent={'center'}
          justifyContent={'center'}
          textAlign={'center'}
          gap='5px'>
          <chakra.p fontSize='18px'>Access your client portal page </chakra.p>
          <Icon
            color='black'
            alignSelf='center'
            as={FcCustomerSupport}
            boxSize={30}
          />
        </chakra.div>
        <Button
          alignSelf='center'
          width='50%'
          onClick={() => onOpen()}>
          Log In
        </Button>
      </chakra.div>
    </chakra.div>
  );
}
