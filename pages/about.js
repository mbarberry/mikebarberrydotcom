import React, { useState } from 'react';
import { chakra } from '@chakra-ui/react';

const cardData = [
  {
    color: 'purple.500',
    desc: 'MySQL, Express.js, React.js, Node.js',
    pic: '/peerrx.png',
    proj: 'PeerRX',
    margin: -130,
    zIndex: 1,
  },
  {
    color: 'green.500',
    desc: 'MongoDB, Express.js, React.js, Node.js',
    pic: '/connexrx.png',
    proj: 'ConnexRX',
    margin: -130,
    zIndex: 1,
  },
  {
    color: 'orange.500',
    desc: 'MySQL, Laravel, Vue.JS, PHP',
    pic: '/net.png',
    proj: 'Network Engagement Tracker',
    margin: 0,
    zIndex: 1,
  },
];

function Card({ color, desc, pic, proj, initMargin, zIndex }) {
  const [margin, setMargin] = useState(initMargin);
  const handleMouseEnter = () => {
    setMargin(5);
  };
  const handleMouseLeave = () => {
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
        borderRadius='16px'
        background='linear-gradient(85deg, #ffffff, #d6d6d6)'
        display='flex'
        flexDir='column'
        transition='0.2s'
        m='0'
        mr={margin}
        minW='300px'
        minH='350px'
        shadow='-2rem 0 3rem -2rem #000'
        zIndex={zIndex}>
        <chakra.img
          src={pic}
          display='block'
          maxH='400px'
          maxW='400px'></chakra.img>
        <chakra.p
          pt='20px'
          fontFamily='Whitney SSm A, Whitney SSm B, Helvetica Neue,
                  Helvetica, Arial, sans-serif'>
          {proj}
        </chakra.p>
        <chakra.p
          color={color}
          pt='20px'
          fontSize='0.66rem'
          textTransform='uppercase'
          fontFamily='Whitney SSm A, Whitney SSm B, Helvetica Neue,
                  Helvetica, Arial, sans-serif'>
          {desc}
        </chakra.p>
      </chakra.article>
    </chakra.div>
  );
}

function ProjectHighlights() {
  return (
    <chakra.div
      boxSizing='border-box'
      display='flex'
      m='0 0 1rem'
      pos='absolute'
      bottom='100px'
      pl='70px'>
      <chakra.div
        mt='1rem'
        flex='0 0 200px'
        mr='1rem'
        pos='relative'
        display='flex'
        flexDir='column'
        justifyContent='flex-end'
        p='1.5rem'
        transform='translateY(-10px)'>
        <chakra.h2
          zIndex='3'
          color='black.500'
          fontWeight='lighter'
          fontFamily='Whitney SSm A, Whitney SSm B, Helvetica Neue,
                Helvetica, Arial, sans-serif'>
          Recent
          <br />
          Projects
        </chakra.h2>
      </chakra.div>
    </chakra.div>
  );
}

export default function About() {
  return (
    <chakra.div
      p='1rem 0 1rem 2rem'
      m='0'
      display='flex'
      overflowX='scroll'
      pos='relative'
      gridTemplateColumns='repeat(auto-fill, minmax(250px, 1fr))'
      gap='1rem'
      mh='450px'>
      {cardData.map((ele, idx) => {
        const margin = idx !== cardData.length - 1 ? '-130px' : '0px';
        return (
          <Card
            key={ele.proj}
            color={ele.color}
            desc={ele.desc}
            pic={ele.pic}
            proj={ele.proj}
            initMargin={margin}
            zIndex={ele.zIndex}
          />
        );
      })}
    </chakra.div>
  );
}
