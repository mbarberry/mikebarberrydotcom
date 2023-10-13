import { useContext } from 'react';
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
        <a
          href='/Mike_Barberry_Resume.docx'
          alt='Docx icon'
          download>
          <img
            width={mobile ? '120px' : '200px'}
            height={mobile ? '120px' : '200px'}
            src='/docx-icon.png'
            alt='Docx icon'
          />
        </a>
        <a
          href='/Mike_Barberry_Resume.pdf'
          target='_blank'>
          <img
            width={mobile ? '120px' : '200px'}
            height={mobile ? '120px' : '200px'}
            src='/pdf-icon.png'
            alt='Docx icon'
          />
        </a>
      </chakra.div>
    </chakra.div>
  );
}
