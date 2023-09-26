import { useContext } from 'react';
import { chakra } from '@chakra-ui/react';

import { MobileContext } from '#/components/context/MobileContext';

export default function RecentProjects() {
  const mobile = useContext(MobileContext);
  return (
    <chakra.div
      _after={
        mobile
          ? {}
          : {
              content: '""',
              bg: 'white',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '95%',
              height: '100%',
              zIndex: '2',
              borderRadius: '8px',
            }
      }
      _before={{
        content: '""',
        bg: 'linear-gradient(130deg, #5992b9, #afe1f8 41.07%,#f5c4a1 76.05%)',
        opacity: '0.6',
        position: 'absolute',
        top: mobile ? '20px' : '-5px',
        left: '-5px',
        width: '100%',
        height: mobile ? '100px' : 'calc(100% + 10px)',
        zIndex: '1',
        borderRadius: '12px',
        maxWidth: '100%',
      }}
      alignItems={mobile ? 'center' : undefined}
      display='flex'
      flex={mobile ? '0 1 0px' : '0 0 200px'}
      flexDir='column'
      justifyContent={mobile ? 'center' : 'flex-end'}
      mt={mobile ? '2rem' : '1rem'}
      mr={mobile ? undefined : '.5rem'}
      p={mobile ? '40px' : '1.5rem'}
      transform={mobile ? 'translateY(-40px)' : 'translateY(-10px)'}>
      <chakra.div
        zIndex='3'
        color={'black.500'}
        fontWeight='lighter'
        display='flex'
        flexDir='column'
        gap='5px'>
        <h1>Recent</h1>
        <h1>Projects</h1>
      </chakra.div>
    </chakra.div>
  );
}
