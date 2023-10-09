import { chakra, Spinner } from '@chakra-ui/react';
import { useContext } from 'react';
import { MobileContext } from '../context/MobileContext';

export default function Loading({ loading }) {
  const mobile = useContext(MobileContext);

  return (
    loading && (
      <chakra.div justify='center'>
        <Spinner
          pos='absolute'
          top='40%'
          left={mobile ? '45%' : '50%'}
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.100'
          color='jaggedIce.300'
          size='xl'
        />
      </chakra.div>
    )
  );
}
