import { useContext } from 'react';
import { chakra, Button, Flex } from '@chakra-ui/react';
import { LuLogOut } from 'react-icons/lu';

import { MobileContext } from '../context/MobileContext';

export default function ClientPage({ client, signOut }) {
  const mobile = useContext(MobileContext);

  return (
    <chakra.div
      w={'100%'}
      padding={'0px 30%'}>
      <Flex
        direction='column'
        paddingTop='30px'>
        <chakra.div
          display='flex'
          flexDir='column'
          gap={mobile ? '40px' : '10px'}>
          <chakra.div
            display='flex'
            justifyContent={mobile ? 'center' : 'flex-end'}>
            <Flex gap='10px'>
              <Button color={'jaggedIce.300'}>
                <LuLogOut />
                &nbsp;&nbsp;Log Out
              </Button>
            </Flex>
          </chakra.div>
          <chakra.div
            display='flex'
            flexDir='column'
            gap='15px'>
            <h1>{client.name}</h1>
            <h1>{client.email}</h1>
            <h1>{client.id}</h1>
          </chakra.div>
        </chakra.div>
      </Flex>
    </chakra.div>
  );
}
