import {
  chakra,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useReducer } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { lambdaURL } from '#/utils';

const intitialState = {
  clapperEmail: '',
  loading: false,
  verified: false,
  error: {
    isError: false,
    message: '',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'email': {
      return {
        ...state,
        clapperEmail: action.email,
      };
    }
    case 'loading': {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case 'verified': {
      return {
        ...state,
        verified: action.verified,
      };
    }
    case 'message': {
      return {
        ...state,
        alertMessage: action.message,
      };
    }
    case 'error': {
      return {
        ...state,
        error: {
          isError: action.isError || false,
          message: action.message || '',
        },
      };
    }
  }
};

export default function ClapModal({
  open,
  close,
  post,
  year,
  updateClaps,
  clapSent,
}) {
  const [state, dispatch] = useReducer(reducer, intitialState);

  const clearError = () => {
    if (state.error.isError) {
      dispatch({ type: 'error' });
    }
  };

  const handleVerification = async (token) => {
    clearError();
    dispatch({ type: 'loading', loading: true });
    try {
      const response = await fetch(`${lambdaURL}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const json = await response.json();
      if (json.success) {
        dispatch({ type: 'verified', verified: true });
      } else {
        dispatch({
          type: 'error',
          isError: true,
          message:
            'Uh oh, hcaptcha failed. Mike would be happy if you let him know you encountered this error on the site.',
        });
        openMess();
      }
    } finally {
      dispatch({ type: 'loading', loading: false });
    }
  };

  const updatePostClaps = async () => {
    clearError();
    dispatch({ type: 'loading', loading: true });
    try {
      const response = await fetch(`${lambdaURL}/blog/post/clap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post,
          year,
          email: state.clapperEmail,
        }),
      });
      const json = await response.json();
      if (json.success) {
        updateClaps((claps) => claps + 1);
        clapSent();
        close();
      } else {
        dispatch({ type: 'error', isError: true, message: json.error });
      }
    } finally {
      dispatch({ type: 'loading', loading: false });
    }
  };

  const inputText = state.error.isError ? (
    <FormErrorMessage>{state.error.message}</FormErrorMessage>
  ) : (
    <FormHelperText>
      {`Limit one applaud per address: I won't send you emails.`}
    </FormHelperText>
  );

  return (
    <Modal
      isOpen={open}
      onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Applaud Story!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <chakra.div
            display='flex'
            flexDir='column'
            gap='30px'>
            <FormControl isInvalid={state.error.isError}>
              <FormLabel>{`What's Your Email Address?`}</FormLabel>
              <Input
                color={'jaggedIce.500'}
                _placeholder={{ color: 'inherit' }}
                isRequired={true}
                type='email'
                value={state.clapperEmail}
                onChange={(e) =>
                  dispatch({ type: 'email', email: e.target.value })
                }
                size='lg'
              />
              {inputText}
            </FormControl>
            <HCaptcha
              onExpire={() => dispatch({ type: 'verified', verified: false })}
              theme='dark'
              sitekey='ca6ff6ad-f857-4ead-b213-df8bef9e769f'
              onVerify={(token) => handleVerification(token)}
            />
          </chakra.div>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='teal'
            isLoading={state.loading}
            isDisabled={!state.verified}
            mr={3}
            onClick={() => updatePostClaps()}>
            Send
          </Button>
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
