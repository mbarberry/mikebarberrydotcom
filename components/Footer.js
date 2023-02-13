import { useRouter } from 'next/router';
import { chakra, useMediaQuery } from '@chakra-ui/react';

import { sharedAdaptiveDisplay } from '../styles/sharedStyles';

export default function Footer() {
  const router = useRouter();
  const [mobile] = useMediaQuery('(max-width: 750x)');
  const adaptiveDisplay = sharedAdaptiveDisplay(mobile);
  return (
    <chakra.footer
      alignItems={mobile ? 'center' : undefined}
      bgColor='#eeeeee'
      bottom='0'
      h='100px'
      justifyContent={mobile ? 'center' : 'space-between'}
      pos='absolute'
      sx={{ ...adaptiveDisplay }}
      w='100%'>
      <chakra.p
        fontSize='small'
        letterSpacing='0.1rem'
        p={mobile ? undefined : '10px 0px 0px 30px'}>
        {router.pathname === '/'
          ? 'CC Attribution Littlest Tokyo by Glen Fox '
          : ' '}
      </chakra.p>
      <chakra.div
        display='flex'
        justifyContent={mobile ? 'space-around' : undefined}
        fontWeight='500'
        letterSpacing='0.1rem'
        p={mobile ? undefined : '10px 30px 0px 0px'}>
        <chakra.p>2023</chakra.p>
        <chakra.p pl='10px'>mikebarberry.com</chakra.p>
      </chakra.div>
    </chakra.footer>
  );
}
