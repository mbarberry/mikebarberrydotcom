import { useState, useContext } from 'react';
import { chakra, useTheme, Tooltip } from '@chakra-ui/react';

import { MobileContext } from '#/components/context/MobileContext';

export function Cards({ cards, renderCard }) {
  const mobile = useContext(MobileContext);
  return cards.map(({ color, tech, company, desc, pic, proj }, idx) => {
    const isLast = idx === cards.length - 1;
    const initialMargin = mobile || isLast ? 0 : -130;
    return renderCard({
      color,
      tech,
      company,
      desc,
      pic,
      proj,
      isLast,
      initialMargin,
    });
  });
}

export function Card({
  color,
  tech,
  desc,
  isLast,
  company,
  initialMargin,
  pic,
  proj,
}) {
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
      height={mobile ? undefined : '550px'}
      minH='350px'
      shadow='-2rem 0 3rem -2rem #000'>
      {showImg ? (
        <chakra.img
          src={pic}
          display='block'
          w={mobile ? '300px' : '400px'}
          height={mobile ? '340px' : '370px'}
          maxH={'370px'}
          maxW='400px'
        />
      ) : (
        <chakra.div
          w={mobile ? '300px' : '400px'}
          height={mobile ? '340px' : '370px'}
          maxH='400px'
          maxW='400px'
          padding='10px'
          border={'2px solid white'}
          overflowY={'auto'}
          display='flex'
          alignItems={mobile ? undefined : 'center'}
          justifyContent={'center'}>
          <chakra.p color={themeColor}>{desc}</chakra.p>
        </chakra.div>
      )}
      <chakra.p
        pt='20px'
        maxW={mobile ? '250px' : '400px'}
        fontFamily='Poppins'
        fontSize={'medium'}
        overflowWrap={'break-word'}
        whiteSpace='normal'>
        {proj}
      </chakra.p>
      <chakra.p
        color={color}
        w={mobile ? '250px' : undefined}
        pt='20px'
        fontSize='small'
        textTransform='uppercase'>
        {tech}
      </chakra.p>
      <chakra.p
        color={'auto'}
        w={mobile ? '250px' : undefined}
        pt='20px'
        fontSize='small'
        textTransform='uppercase'>
        {company}
      </chakra.p>
    </chakra.article>
  );
  return (
    <chakra.div maxW={mobile ? '450px' : undefined}>
      {showTooltip ? (
        <Tooltip
          openDelay={300}
          hasArrow={true}
          color='themeBlue.400'
          label='Click to view / hide details.'
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
