import { useContext } from 'react';
import { chakra, Button, Flex } from '@chakra-ui/react';
import { LuLogOut } from 'react-icons/lu';

import { MobileContext } from '../context/MobileContext';
import { PortalContext } from '../context/PortalContext';

export default function ClientPage({ signOut }) {
  const mobile = useContext(MobileContext);
  const client = useContext(PortalContext);

  return (
    <chakra.div
      w={'100%'}
      padding={mobile ? '0px 50px 30px' : '0px 30%'}>
      <Flex
        direction='column'
        paddingTop={mobile ? '50px' : '30px'}>
        <chakra.div
          display='flex'
          flexDir='column'
          gap={mobile ? '40px' : '40px'}>
          <chakra.div
            display='flex'
            justifyContent={mobile ? 'center' : 'flex-end'}>
            <Flex gap='10px'>
              <Button
                onClick={signOut}
                color={'jaggedIce.300'}>
                <LuLogOut />
                &nbsp;&nbsp;Log Out
              </Button>
            </Flex>
          </chakra.div>
          <chakra.div
            display='flex'
            flexDir='column'
            gap='15px'>
            <h1>Hi, {client.name}👋. Welcome to the client portal! </h1>
            <p>Start a project to gain full feature access. 🔨</p>
          </chakra.div>
        </chakra.div>
      </Flex>
    </chakra.div>
  );
}
