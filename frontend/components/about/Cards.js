import { useState, useContext } from 'react';
import { chakra } from '@chakra-ui/react';

import { MobileContext } from '#/components/context/MobileContext';

export function Cards({ cards, renderCard }) {
  const mobile = useContext(MobileContext);
  return cards.map(({ color, desc, pic, proj }, idx) => {
    const isLast = idx === cards.length - 1;
    const initialMargin = mobile || isLast ? 0 : -130;
    return renderCard({ color, desc, pic, proj, isLast, initialMargin });
  });
}

export function Card({ color, desc, isLast, initialMargin, pic, proj }) {
  const mobile = useContext(MobileContext);
  const [margin, setMargin] = useState(initialMargin);

  const handleMouseEnter = () => {
    if (mobile) return;
    setMargin(5);
  };
  const handleMouseLeave = () => {
    if (mobile || isLast) return;
    setMargin(margin - 135);
  };
  return (
    <chakra.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      maxW={mobile ? '450px' : undefined}>
      <chakra.article
        _hover={{ transform: mobile ? 'scale(1.05)' : 'rotate(0.01turn)' }}
        sx={{ transition: mobile ? undefined : 'margin 0.2s' }}
        p='1.5rem'
        borderRadius='16px'
        background='linear-gradient(85deg, #ffffff, #d6d6d6)'
        display='flex'
        flexDir='column'
        mr={mobile ? 0 : margin}
        minW='300px'
        minH='350px'
        shadow='-2rem 0 3rem -2rem #000'>
        <chakra.img
          src={pic}
          display='block'
          w={mobile ? '250px' : '400px'}
          h={mobile ? '250px' : '225px'}
          maxH='400px'
          maxW='400px'
        />
        <chakra.p
          pt='20px'
          fontFamily='Poppins'
          whiteSpace='break-spaces'>
          {proj}
        </chakra.p>
        <chakra.p
          color={color}
          w={mobile ? '250px' : undefined}
          pt='20px'
          fontSize='0.66rem'
          textTransform='uppercase'>
          {desc}
        </chakra.p>
      </chakra.article>
    </chakra.div>
  );
}
