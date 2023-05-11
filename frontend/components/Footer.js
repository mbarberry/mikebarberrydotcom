import { useRouter } from 'next/router';
import { chakra, useMediaQuery } from '@chakra-ui/react';

export default function Footer() {
  const [mobile] = useMediaQuery('(max-width: 750px)');
  const router = useRouter();
  return (
    <chakra.footer
      alignItems={mobile ? 'center' : undefined}
      bgColor='#eeeeee'
      bottom='0'
      display='flex'
      gap={mobile ? '30px' : undefined}
      h='100px'
      justifyContent={mobile ? 'center' : 'space-between'}
      pos='absolute'
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
