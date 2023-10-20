import { useContext } from 'react';
import { chakra, Tag } from '@chakra-ui/react';

import { MobileContext } from '#/components/context/MobileContext';

function DotBackground() {
  return (
    <chakra.div
      bg={`url('/dots.svg') repeat-x center top`}
      color='rgba(35, 33, 41, 0.8)'
      border='3px #5992b9'
      overflow='hidden'
      borderStyle='solid hidden hidden solid'>
      <chakra.div
        _after={{
          content: '""',
          display: 'block',
          h: '195px',
          w: '1px',
          pos: 'relative',
          top: '15px',
          left: 'calc(50% - 2px)',
        }}
        mb='10px'></chakra.div>
    </chakra.div>
  );
}

export function AboutPageContainer({ children }) {
  const mobile = useContext(MobileContext);
  return (
    <chakra.div
      display='flex'
      flexDir='column'
      m='0 0 1rem'
      pl={mobile ? undefined : '30px'}>
      {!mobile && <DotBackground />}
      <chakra.div
        display='flex'
        flexDir={mobile ? 'column' : undefined}
        maxWidth={'100%'}>
        {children}
      </chakra.div>
    </chakra.div>
  );
}

export function CardsContainer({ children }) {
  const mobile = useContext(MobileContext);
  return (
    <chakra.div
      alignItems={mobile ? 'center' : undefined}
      flexDir={mobile ? 'column' : undefined}
      justifyContent={mobile ? 'center' : undefined}
      p={mobile ? undefined : '1rem 0 1rem 2rem'}
      overflowX={mobile ? 'hidden' : 'scroll'}
      display={'flex'}
      justifySelf={'flex-start'}
      gap='2rem'
      top={mobile ? '-20px' : undefined}
      position={mobile ? 'relative' : undefined}
      paddingBottom={'35px'}>
      {mobile && (
        <Tag
          size='lg'
          colorScheme='twitter'
          borderRadius='full'>
          Click picture to view / hide details.
        </Tag>
      )}
      {children}
    </chakra.div>
  );
}
