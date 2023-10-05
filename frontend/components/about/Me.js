import { chakra } from '@chakra-ui/react';
import Image from 'next/image';
import { useContext } from 'react';

import { MobileContext } from '#/components/context/MobileContext';

export default function Me() {
  const mobile = useContext(MobileContext);
  return (
    <chakra.div
      flexShrink={0}
      display='flex'
      flexDirection='column'
      paddingRight={mobile ? undefined : '50px'}
      justifyContent={mobile ? 'center' : undefined}
      alignItems={mobile ? 'center' : undefined}
      gap='20px'>
      <Image
        style={{
          borderRadius: '200px',
          objectFit: 'contain',
        }}
        height={300}
        width={350}
        src='/Me.jpg'
        alt='A picture of me.'
      />
      <chakra.p textAlign='center'>
        Hi, I&lsquo;m a software engineer based out of Astoria, Oregon.
      </chakra.p>
    </chakra.div>
  );
}
