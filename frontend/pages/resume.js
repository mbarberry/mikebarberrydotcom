import { useContext } from 'react';
import Image from 'next/image';
import { chakra, Icon } from '@chakra-ui/react';
import { TbFileTypePdf, TbFileTypeDocx } from 'react-icons/tb';
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
          <Icon
            color='themeBlue.400'
            as={TbFileTypeDocx}
            boxSize={mobile ? 100 : 150}
          />
        </chakra.a>
        <chakra.a
          color='melanie.200'
          href='/Mike_Barberry_Resume.pdf'
          target='_blank'>
          <Icon
            as={TbFileTypePdf}
            boxSize={mobile ? 100 : 150}
          />
        </chakra.a>
      </chakra.div>
    </chakra.div>
  );
}
