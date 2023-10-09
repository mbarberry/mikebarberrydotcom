import {
  chakra,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { useReducer, useContext } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { MobileContext } from '#/components/context/MobileContext';
import Message from '#/components/index/Message';

import { lambdaURL } from '#/utils';

const initialState = {
  name: '',
  email: '',
  message: '',
  verified: false,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'name': {
      return {
        ...state,
        name: action.name,
      };
    }
    case 'email': {
      return {
        ...state,
        email: action.email,
      };
    }
    case 'message': {
      return {
        ...state,
        message: action.message,
      };
    }
    case 'verify': {
      return {
        ...state,
        verified: action.verfied,
      };
    }
    case 'reset': {
      return {
        ...state,
        name: '',
        email: '',
        message: '',
      };
    }
    case 'loading': {
      return {
        ...state,
        loading: action.loading,
      };
    }
  }
  throw new Error('Unknown action type.');
};

export default function Contact() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mobile = useContext(MobileContext);

  const { isOpen, onOpen, onClose } = useDisclosure({
    onOpen: () => {
      setTimeout(() => {
        onClose();
      }, 5000);
    },
  });

  const handleVerification = async (token) => {
    dispatch({ type: 'loading', loading: true });
    try {
      const response = await fetch(`${lambdaURL}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const json = await response.json();
      const success = json.success;
      if (success) {
        dispatch({ type: 'verify', verfied: true });
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: 'loading', loading: false });
    }
  };

  const sendContactEmail = async (e) => {
    dispatch({ type: 'loading', loading: true });
    if (!e.isTrusted) return;
    for (const [key, value] of Object.entries(state)) {
      if (['name', 'email', 'message'].includes(key)) {
        if (!value) return;
      }
    }
    try {
      const response = await fetch(`${lambdaURL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          message: state.message,
        }),
      });
      await response.json();
      onOpen();
      dispatch({ type: 'reset' });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: 'loading', loading: false });
    }
  };

  return (
    <chakra.div
      width='100%'
      height='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      marginBottom='20px'>
      {isOpen && <Message words='Email sent to me!' />}
      <chakra.div
        width='50%'
        display='flex'
        alignItems='center'
        flexDirection='column'
        justifyContent='center'
        fontFamily='Poppins'
        gap='30px'>
        <chakra.h1
          paddingTop={mobile ? '35px' : '30px'}
          fontSize={mobile ? '20px' : '24px'}>
          I&lsquo;d &#10084; to get to know you!
        </chakra.h1>
        <FormControl>
          <chakra.div
            display='flex'
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            fontFamily='Poppins'
            gap='15px'>
            <chakra.div>
              <FormLabel>What should I call you?</FormLabel>
              <Input
                isRequired={true}
                type='text'
                value={state.name}
                onChange={(e) =>
                  dispatch({ type: 'name', name: e.target.value })
                }
                size='lg'
              />
            </chakra.div>
            <chakra.div>
              <FormLabel>Where can I return an email?</FormLabel>
              <Input
                isRequired={true}
                type='email'
                value={state.email}
                onChange={(e) =>
                  dispatch({ type: 'email', email: e.target.value })
                }
                size='lg'
              />
            </chakra.div>
            <chakra.div marginBottom='30px'>
              <FormLabel>How can we work together?</FormLabel>
              <Textarea
                rows='10'
                isRequired={true}
                value={state.message}
                type='text'
                onChange={(e) =>
                  dispatch({ type: 'message', message: e.target.value })
                }
                size='lg'
              />
            </chakra.div>
            <HCaptcha
              theme='dark'
              sitekey='ca6ff6ad-f857-4ead-b213-df8bef9e769f'
              onVerify={(token) => handleVerification(token)}
            />
            <Button
              colorScheme='teal'
              isLoading={state.loading}
              isDisabled={!state.verified}
              onClick={(e) => sendContactEmail(e)}
              rightIcon={<EmailIcon />}>
              Send me an email
            </Button>
          </chakra.div>
        </FormControl>
      </chakra.div>
    </chakra.div>
  );
}
