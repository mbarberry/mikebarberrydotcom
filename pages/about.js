import React, { useState } from 'react';
import { chakra, useMediaQuery } from '@chakra-ui/react';

import { sharedAdaptiveDisplay } from '../styles/sharedStyles';

const cardData = [
  {
    color: 'purple.500',
    desc: 'React.js, Node.js, Express.js, MySQL',
    pic: '/peerrx.png',
    proj: 'PeerRX',
  },
  {
    color: 'green.500',
    desc: 'React.js, Node.js, Express.js, MongoDB',
    pic: '/connexrx.png',
    proj: 'ConnexRX',
  },
  {
    color: 'orange.500',
    desc: 'Vue.js, PHP 7, Laravel, MySQL',
    pic: '/net.png',
    proj: 'Network Engagement Tracker',
  },
];

function Card({ color, desc, pic, proj, isLast }) {
  const [margin, setMargin] = useState(isLast ? 0 : -130);
  const handleMouseEnter = () => {
    setMargin(5);
  };
  const handleMouseLeave = () => {
    if (isLast) return;
    setMargin((margin) => margin - 135);
  };
  return (
    <chakra.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <chakra.article
        _hover={{ transform: 'rotate(0.01turn)' }}
        sx={{ transition: '0.2s' }}
        p='1.5rem'
        pos='relative'
        borderRadius='16px'
        background='linear-gradient(85deg, #ffffff, #d6d6d6)'
        display='flex'
        flexDir='column'
        transition='all 0.2s ease 0s'
        mr={margin}
        minW='300px'
        minH='350px'
        shadow='-2rem 0 3rem -2rem #000'>
        <chakra.img
          src={pic}
          display='block'
          maxH='400px'
          maxW='400px'
        />
        <chakra.p
          pt='20px'
          fontFamily='Poppins'>
          {proj}
        </chakra.p>
        <chakra.p
          color={color}
          pt='20px'
          fontSize='0.66rem'
          textTransform='uppercase'>
          {desc}
        </chakra.p>
      </chakra.article>
    </chakra.div>
  );
}

function Cards({ adaptiveDisplay, mobile }) {
  return (
    <chakra.div
      p={mobile ? undefined : '1rem 0 1rem 2rem'}
      overflowX={mobile ? 'hidden' : 'scroll'}
      pos='relative'
      gap='1rem'
      sx={{ ...adaptiveDisplay }}>
      {cardData.map((ele, idx) => {
        const { proj, color, desc, pic } = ele;
        const isLast = idx === cardData.length - 1;
        return (
          <Card
            key={proj}
            color={color}
            desc={desc}
            pic={pic}
            proj={proj}
            isLast={isLast}
          />
        );
      })}
    </chakra.div>
  );
}

function RecentProjects({ mobile }) {
  return (
    <chakra.div
      _before={{
        content: '""',
        bg: 'linear-gradient(130deg, #5992b9, #afe1f8 41.07%,#f5c4a1 76.05%)',
        opacity: '0.6',
        position: 'absolute',
        top: '-5px',
        left: '-5px',
        width: 'calc(100% + 10px)',
        height: 'calc(100% + 10px)',
        zIndex: '1',
        borderRadius: '12px',
      }}
      _after={{
        content: '""',
        bg: 'white',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '2',
        borderRadius: '8px',
      }}
      mt='1rem'
      flex='0 0 200px'
      mr={mobile ? '' : '1rem'}
      pos='relative'
      display='flex'
      flexDir='column'
      justifyContent='flex-end'
      p='1.5rem'
      transform='translateY(-10px)'>
      <chakra.h2
        zIndex='3'
        color='black.500'
        fontWeight='lighter'>
        Recent
        <br />
        Projects
      </chakra.h2>
    </chakra.div>
  );
}

function DotBackground() {
  return (
    <chakra.div
      bg={`url('/dots.svg') repeat-x center top`}
      color='rgba(35, 33, 41, 0.8)'
      border='3px #dbf0ff'
      borderStyle='solid hidden hidden solid'
      pos='relative'
      maxW='100vw'>
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

export default function About() {
  const [mobile] = useMediaQuery('(max-width: 800px)');
  const adaptiveDisplay = sharedAdaptiveDisplay(mobile);
  return (
    <chakra.div
      boxSizing='border-box'
      display='grid'
      m='0 0 1rem'
      pl={mobile ? undefined : '30px'}>
      {!mobile && <DotBackground />}
      <chakra.div sx={{ ...adaptiveDisplay }}>
        <RecentProjects mobile={mobile} />
        <Cards
          mobile={mobile}
          adaptiveDisplay={adaptiveDisplay}
        />
      </chakra.div>
    </chakra.div>
  );
}
