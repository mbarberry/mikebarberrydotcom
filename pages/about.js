import React, { useState } from 'react';
import { chakra } from '@chakra-ui/react';

const cardData = [
  {
    color: 'purple.500',
    desc: 'MySQL, Express.js, React.js, Node.js',
    pic: '/peerrx.png',
    proj: 'PeerRX',
  },
  {
    color: 'green.500',
    desc: 'MongoDB, Express.js, React.js, Node.js',
    pic: '/connexrx.png',
    proj: 'ConnexRX',
  },
  {
    color: 'orange.500',
    desc: 'MySQL, Laravel, Vue.JS, PHP',
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
    <chakra.div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
        m='0'
        mr={margin}
        minW='300px'
        minH='350px'
        shadow='-2rem 0 3rem -2rem #000'
        zIndex='1'
      >
        <chakra.img
          src={pic}
          display='block'
          maxH='400px'
          maxW='400px'
        ></chakra.img>
        <chakra.p
          pt='20px'
          fontFamily='Whitney SSm A, Whitney SSm B, Helvetica Neue,
                  Helvetica, Arial, sans-serif'
        >
          {proj}
        </chakra.p>
        <chakra.p
          color={color}
          pt='20px'
          fontSize='0.66rem'
          textTransform='uppercase'
          fontFamily='Whitney SSm A, Whitney SSm B, Helvetica Neue,
                  Helvetica, Arial, sans-serif'
        >
          {desc}
        </chakra.p>
      </chakra.article>
    </chakra.div>
  );
}

function Cards() {
  return (
    <chakra.div
      p='1rem 0 1rem 2rem'
      m='0'
      display='flex'
      overflowX='scroll'
      pos='relative'
      gridTemplateColumns='repeat(auto-fill, minmax(250px, 1fr))'
      gap='1rem'
      mh='450px'
    >
      {cardData.map((ele, idx) => {
        const isLast = idx === cardData.length - 1;
        return (
          <Card
            key={ele.proj}
            color={ele.color}
            desc={ele.desc}
            pic={ele.pic}
            proj={ele.proj}
            isLast={isLast}
          />
        );
      })}
    </chakra.div>
  );
}

function RecentProjects() {
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
      mr='1rem'
      pos='relative'
      display='flex'
      flexDir='column'
      justifyContent='flex-end'
      p='1.5rem'
      transform='translateY(-10px)'
    >
      <chakra.h2
        zIndex='3'
        color='black.500'
        fontWeight='lighter'
        fontFamily='Whitney SSm A, Whitney SSm B, Helvetica Neue,
                Helvetica, Arial, sans-serif'
      >
        Recent
        <br />
        Projects
      </chakra.h2>
    </chakra.div>
  );
}

export default function About() {
  return (
    <chakra.div
      boxSizing='border-box'
      display='flex'
      m='0 0 1rem'
      pos='relative'
      pl='70px'
    >
      <RecentProjects />
      <Cards></Cards>
    </chakra.div>
  );
}
