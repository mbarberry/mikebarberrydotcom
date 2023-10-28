import {
  chakra,
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

export default function ImgModal({ open, close, pic }) {
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
              w={'50%'}
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
