import { chakra, Spinner } from '@chakra-ui/react';

export default function Loading({ loading }) {
  return (
    loading && (
      <chakra.div justify='center'>
        <Spinner
          pos='absolute'
          top='40%'
          left='50%'
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
