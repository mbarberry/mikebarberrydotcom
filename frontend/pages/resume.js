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
      h={mobile ? undefined : '400px'}
      justifyContent={'center'}
      paddingTop={'30px'}
      alignItems={'center'}
      display={'flex'}>
      <chakra.div
        display={'flex'}
        flexDirection={mobile ? 'column' : 'row'}
        paddingBottom={'50px'}
        gap='20px'>
        <chakra.a
          href='/Barberry_Resume_Current.docx'
          alt='Docx icon'
          download>
          <Icon
            color='themeBlue.400'
            strokeWidth={1}
            as={TbFileTypeDocx}
            boxSize={mobile ? '75px' : '120px'}
          />
        </chakra.a>
        <chakra.a
          href='/Barberry_Resume_Current.pdf'
          target='_blank'>
          <Icon
            color='melanie.200'
            as={TbFileTypePdf}
            strokeWidth={1}
            boxSize={mobile ? '75px' : '120px'}
          />
        </chakra.a>
      </chakra.div>
    </chakra.div>
  );
}
