import { useState, useContext } from 'react';
import { chakra, useTheme, Tooltip } from '@chakra-ui/react';

import { MobileContext } from '#/components/context/MobileContext';

export function Cards({ cards, renderCard }) {
  const mobile = useContext(MobileContext);
  return cards.map(({ color, tech, desc, pic, proj }, idx) => {
    const isLast = idx === cards.length - 1;
    const initialMargin = mobile || isLast ? 0 : -130;
    return renderCard({ color, tech, desc, pic, proj, isLast, initialMargin });
  });
}

export function Card({ color, tech, desc, isLast, initialMargin, pic, proj }) {
  const mobile = useContext(MobileContext);
  const theme = useTheme();
  const themeColor = theme.colors.themeBlue[400];

  const [margin, setMargin] = useState(initialMargin);
  const [showImg, setShowImg] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleMouseEnter = () => {
    if (mobile) return;
    setMargin(5);
  };
  const handleMouseLeave = () => {
    if (mobile || isLast) return;
    setMargin(margin - 135);
  };

  const article = (
    <chakra.article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setShowImg(!showImg);
        if (showTooltip) {
          setShowTooltip(false);
        }
      }}
      _hover={{
        transform: mobile ? undefined : 'rotate(0.01turn)',
        cursor: 'pointer',
      }}
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
      {showImg ? (
        <chakra.img
          src={pic}
          display='block'
          w={mobile ? '250px' : '400px'}
          h={mobile ? '250px' : '225px'}
          maxH='400px'
          maxW='400px'
        />
      ) : (
        <chakra.div
          w={mobile ? '250px' : '400px'}
          h={mobile ? '250px' : '225px'}
          maxH='400px'
          maxW='400px'
          display='flex'
          alignItems={'center'}
          justifyContent={'center'}>
          <chakra.p color={themeColor}>{desc}</chakra.p>
        </chakra.div>
      )}
      <chakra.p
        pt='20px'
        maxW={mobile ? '250px' : '400px'}
        fontFamily='Poppins'
        wordBreak={'break-all'}
        whiteSpace='normal'>
        {proj}
      </chakra.p>
      <chakra.p
        color={color}
        w={mobile ? '250px' : undefined}
        pt='20px'
        fontSize='0.66rem'
        textTransform='uppercase'>
        {tech}
      </chakra.p>
    </chakra.article>
  );
  return (
    <chakra.div maxW={mobile ? '450px' : undefined}>
      {showTooltip ? (
        <Tooltip
          openDelay={150}
          hasArrow={true}
          label='Click to show/hide details.'
          closeOnClick={true}
          placement='top'>
          {article}
        </Tooltip>
      ) : (
        article
      )}
    </chakra.div>
  );
}
