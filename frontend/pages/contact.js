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
import { lambdaURL, handleVerification } from '#/utils';

const initialState = {
  name: '',
  email: '',
  message: '',
  verified: false,
  loading: false,
  alert: {
    type: 'success',
    text: 'Email sent to me!',
  },
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
    case 'alert': {
      return {
        ...state,
        alert: {
          type: action.alert.type,
          text: action.alert.text,
        },
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
      if (json.success) {
        dispatch({ type: 'verify', verfied: true });
      } else {
        dispatch({
          type: 'alert',
          alert: {
            type: 'error',
            text: 'Uh oh, hcaptcha failed. Mike would be happy if you let him know you encountered this error on the site.',
          },
        });
        onOpen();
      }
    } finally {
      dispatch({ type: 'loading', loading: false });
    }
  };

  const sendContactEmail = async (e) => {
    if (!e.isTrusted) return;
    for (const [key, value] of Object.entries(state)) {
      if (['name', 'email', 'message'].includes(key)) {
        if (!value) return;
      }
    }
    try {
      dispatch({ type: 'loading', loading: true });
      const response = await fetch(`${lambdaURL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          message: state.message,
        }),
      });
      const json = await response.json();
      if (json.success) {
        dispatch({
          type: 'alert',
          alert: { type: 'success', text: 'Email sent to me!' },
        });
        onOpen();
        dispatch({ type: 'reset' });
      } else {
        dispatch({
          type: 'alert',
          alert: {
            type: 'error',
            text: 'Uh oh, email failed to send. Mike would be happy if you let him know you encountered this error on the site.',
          },
        });
        onOpen();
      }
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
      {isOpen && (
        <Message
          type={state.alert.type}
          words={state.alert.text}
        />
      )}
      <chakra.div
        width='50%'
        display='flex'
        alignItems='center'
        flexDirection='column'
        justifyContent='center'
        fontFamily='Poppins'
        gap='30px'>
        <chakra.h1
          paddingTop={mobile ? '20px' : '30px'}
          fontSize={mobile ? '20px' : '24px'}
          textAlign={mobile ? 'center' : undefined}>
          I&lsquo;d &#10084; to get to know you!
        </chakra.h1>
        <FormControl>
          <chakra.div
            display='flex'
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            textAlign='start'
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
            <chakra.div>
              <FormLabel>How can we work together?</FormLabel>
              <Textarea
                rows='10'
                resize='none'
                autoCorrect='on'
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
              onExpire={() => dispatch({ type: 'verify', verified: false })}
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
