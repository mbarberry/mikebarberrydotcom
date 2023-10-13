import { useContext } from 'react';
import Image from 'next/image';
import { chakra } from '@chakra-ui/react';
import { MobileContext } from '#/components/context/MobileContext';

export default function Resume() {
  const mobile = useContext(MobileContext);

  return (
    <chakra.div
      w='100%'
      h={mobile ? '300px' : '500px'}
      justifyContent={'center'}
      alignItems={'center'}
      display={'flex'}>
      <chakra.div
        display={'flex'}
        flexDirection={mobile ? 'column' : 'row'}
        gap='20px'>
        <chakra.a
          href='/Mike_Barberry_Resume.docx'
          alt='Docx icon'
          download>
          <Image
            width={mobile ? 120 : 200}
            height={mobile ? 120 : 200}
            src='/docx-icon.png'
            alt='Docx icon'
          />
        </chakra.a>
        <chakra.a
          href='/Mike_Barberry_Resume.pdf'
          target='_blank'>
          <Image
            width={mobile ? 120 : 200}
            height={mobile ? 120 : 200}
            src='/pdf-icon.png'
            alt='Docx icon'
          />
        </chakra.a>
      </chakra.div>
    </chakra.div>
  );
}
