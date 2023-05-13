import { useRef, useState } from 'react';
import { chakra } from '@chakra-ui/react';

import Animation from '#/components/Animation';
import Loading from '#/components/Loading';
import Fireworks from '#/components/Fireworks';
import { getRects } from '#/utils';

export default function Index() {
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);

  return (
    <chakra.div h='100vh'>
      <Fireworks ready={!loading} />
      <Animation
        ref={ref}
        setLoading={setLoading}
        calcDimensions={() => getRects(ref.current)}
      />
      <Loading loading={loading} />
    </chakra.div>
  );
}
