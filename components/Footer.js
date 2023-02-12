import { chakra, useMediaQuery } from '@chakra-ui/react';

import { sharedAdaptiveDisplay } from '../styles/sharedStyles';

export default function Footer() {
  const [mobile] = useMediaQuery('(max-width: 800px)');
  const adaptiveDisplay = sharedAdaptiveDisplay(mobile);
  return (
    <chakra.footer
      h={mobile ? '80px' : '100px'}
      bgColor='#eeeeee'
      bottom='0'
      pos='absolute'
      w='100%'
      justifyContent={mobile ? 'center' : 'space-between'}
      alignItems={mobile ? 'center' : undefined}
      sx={{ ...adaptiveDisplay }}>
      <chakra.span
        p={mobile ? undefined : '10px 0px 0px 30px'}
        letterSpacing='0.1rem'
        fontSize='small'>
        CC Attribution Littlest Tokyo by Glen Fox
      </chakra.span>
      <chakra.span
        p={mobile ? undefined : '10px 30px 0px 0px'}
        letterSpacing='0.1rem'
        fontWeight='500'>
        2023 &nbsp; &nbsp; mikebarberry.com
      </chakra.span>
    </chakra.footer>
  );
}
