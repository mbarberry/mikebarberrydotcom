import { useState, useContext } from 'react';
import { chakra, useTheme, Tooltip, useDisclosure } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';

import { MobileContext } from '#/components/context/MobileContext';
import ImgModal from './ImgModal';

export function Cards({ cards, renderCard }) {
  const mobile = useContext(MobileContext);
  const [showTooltip, setShowTooltip] = useState(true);
  const stopShowingTooltips = () => {
    setShowTooltip(false);
  };
  return cards.map(({ color, tech, company, desc, pic, proj }, idx) => {
    const isLast = idx === cards.length - 1;
    const initialMargin = mobile || isLast ? 0 : -130;
    return renderCard({
      color,
      tech,
      company,
      showTooltip,
      stopShowingTooltips,
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
  showTooltip,
  stopShowingTooltips,
  initialMargin,
  pic,
  proj,
}) {
  const mobile = useContext(MobileContext);
  const theme = useTheme();
  const themeColor = theme.colors.themeBlue[400];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [margin, setMargin] = useState(initialMargin);
  const [showImg, setShowImg] = useState(true);

  const handleMouseEnter = () => {
    if (mobile) return;
    setMargin(5);
  };
  const handleMouseLeave = () => {
    if (mobile || isLast) return;
    setMargin(margin - 135);
  };

  const handleImgClick = () => {
    setShowImg(!showImg);
    if (showTooltip) {
      stopShowingTooltips();
    }
  };

  const article = (
    <chakra.article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      gap='10px'
      mr={mobile ? 0 : margin}
      minW='300px'
      height={mobile ? undefined : '600px'}
      minH='350px'
      shadow='-2rem 0 3rem -2rem #000'>
      {showImg && showTooltip ? (
        <Tooltip
          openDelay={300}
          hasArrow={true}
          color='themeBlue.400'
          label='Click to view / hide details.'
          closeOnClick={true}
          placement='top'>
          <chakra.img
            onClick={handleImgClick}
            src={pic}
            display='block'
            w={mobile ? '300px' : '400px'}
            height={mobile ? '340px' : '370px'}
            maxH={'370px'}
            maxW='400px'
          />
        </Tooltip>
      ) : showImg ? (
        <chakra.img
          onClick={handleImgClick}
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
          onClick={handleImgClick}
          padding='10px'
          border={'2px solid white'}
          overflowY={'auto'}
          display='flex'
          alignItems={mobile ? undefined : 'center'}
          justifyContent={'center'}>
          <chakra.p color={themeColor}>{desc}</chakra.p>
        </chakra.div>
      )}
      <chakra.div
        display='flex'
        flexDir='row'
        alignItems={'center'}
        h='75px'
        gap='15px'>
        <chakra.p
          maxW={mobile ? '250px' : '400px'}
          fontFamily='Poppins'
          fontSize={'medium'}
          overflowWrap={'break-word'}
          whiteSpace='normal'>
          {proj}
        </chakra.p>
        <PlusSquareIcon
          color={'themeBlue.400'}
          alignSelf='center'
          onClick={() => {
            if (!showImg) {
              setShowImg(true);
            }
            onOpen();
          }}
        />
      </chakra.div>

      <chakra.p
        color={color}
        w={mobile ? '250px' : undefined}
        fontSize='small'
        textTransform='uppercase'>
        {tech}
      </chakra.p>
      <chakra.p
        color={'auto'}
        w={mobile ? '250px' : undefined}
        fontSize='small'
        textTransform='uppercase'>
        {company}
      </chakra.p>
    </chakra.article>
  );
  return (
    <chakra.div>
      <ImgModal
        open={isOpen}
        close={onClose}
        pic={pic}
      />
      <chakra.div maxW={mobile ? '450px' : undefined}>{article}</chakra.div>
    </chakra.div>
  );
}
