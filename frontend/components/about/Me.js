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
      padding={mobile ? '10px 0px' : undefined}
      flexDirection='column'
      paddingRight={mobile ? undefined : '50px'}
      justifyContent={mobile ? 'center' : undefined}
      alignItems={mobile ? 'center' : undefined}
      gap='20px'>
      <Image
        style={{
          alignSelf: 'center',
          borderRadius: '200px',
          objectFit: 'contain',
        }}
        height={mobile ? 150 : 300}
        width={mobile ? 175 : 350}
        src='/Me.jpg'
        alt='A picture of me.'
      />
      <chakra.p
        textAlign='center'
        padding={mobile ? '0px 10px' : undefined}>
        Hi, I&lsquo;m a software engineer based out of Astoria, Oregon.
      </chakra.p>
    </chakra.div>
  );
}
