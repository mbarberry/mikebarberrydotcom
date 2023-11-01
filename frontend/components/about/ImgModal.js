import { useContext } from 'react';
import {
  chakra,
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { MobileContext } from '#/components/context/MobileContext';

export default function ImgModal({ open, close, pic }) {
  const mobile = useContext(MobileContext);
  return (
    <Modal
      size={'full'}
      isOpen={open}
      onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <chakra.div
            display='flex'
            justifyContent={'center'}
            alignItems={'center'}>
            <chakra.img
              src={pic}
              width={mobile ? '100%' : '60%'}
              height={mobile ? '100%' : '60%'}
            />
          </chakra.div>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={'jaggedIce.500'}
            mr={3}
            onClick={close}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
