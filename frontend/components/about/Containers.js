import { useContext } from 'react';
import { chakra, Tag } from '@chakra-ui/react';

import { MobileContext } from '#/components/context/MobileContext';

function DotBackground() {
  return (
    <chakra.div
      color='rgba(35, 33, 41, 0.8)'
      border='3px #5992b9'
      overflow='hidden'
      borderStyle='solid hidden hidden solid'></chakra.div>
  );
}

export function AboutPageContainer({ children }) {
  const mobile = useContext(MobileContext);
  return (
    <chakra.div
      display='flex'
      height='100%'
      w={'100%'}
      flexDir={'column'}>
      {!mobile && <DotBackground />}
      {children}
    </chakra.div>
  );
}

export function ProjectsContainer({ children }) {
  const mobile = useContext(MobileContext);
  return (
    <chakra.div
      display='flex'
      m={mobile ? undefined : '0 0 1rem'}
      pl={mobile ? undefined : '60px'}
      flexDir={mobile ? 'column' : undefined}
      maxWidth={'100%'}>
      {children}
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
      _after={
        mobile
          ? {}
          : {
              content: '""',
              position: 'absolute',
              right: 0,
              top: '34rem',
              bottom: '10rem',
              width: '10px',
              borderRadius: '5px',
              background:
                'linear-gradient(130deg, #5992b9, #afe1f8 41.07%,#f5c4a1 90.05%)',
              boxShadow: '-10px 0 20px 3px #000',
            }
      }
      gap='2rem'
      top={mobile ? '-20px' : undefined}
      position={mobile ? 'relative' : undefined}
      paddingBottom={mobile ? '20px' : '35px'}>
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
