import { chakra } from '@chakra-ui/react';
import Image from 'next/image';
import { useContext } from 'react';

import { MobileContext } from '#/components/context/MobileContext';

export default function Me() {
  const mobile = useContext(MobileContext);
  return (
    <chakra.div
      bg={`center / cover no-repeat url('/astoria.jpg')`}
      display={'inline-block'}>
      <chakra.div
        flexShrink={0}
        display='flex'
        paddingTop={'10px'}
        padding={mobile ? '40px 0px 25px 0px' : undefined}
        flexDirection='column'
        justifyContent={mobile ? 'center' : undefined}
        alignItems={mobile ? 'center' : undefined}
        alignSelf={mobile ? undefined : 'center'}
        gap='20px'>
        <Image
          style={{
            alignSelf: 'center',
            borderRadius: '200px',
            objectFit: 'contain',
          }}
          height={mobile ? 150 : 300}
          width={mobile ? 175 : 350}
          src='/pic.png'
          alt='A picture of me.'
        />
        <chakra.p
          textAlign='center'
          textShadow='-1px -1px 0 #000, 2px -1px 0 #000, -1px 2px 0 #000, 1px 1px 0 #000;'
          fontSize={mobile ? undefined : '18px'}
          padding={mobile ? '0px 10px' : '0px 0px 20px 0px'}>
          Hi 🙂! I&lsquo;m a software engineer based on the East Coast.
        </chakra.p>
      </chakra.div>
    </chakra.div>
  );
}
