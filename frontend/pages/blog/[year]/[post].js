import { useEffect, useState, useContext } from 'react';
import { chakra, Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

import { MobileContext } from '#/components/context/MobileContext';
import { lambdaURL } from '#/utils';

export async function getStaticPaths() {
  try {
    const response = await fetch(`${lambdaURL}/blog`);
    const json = await response.json();

    const paths = json.posts.map((post) => {
      return { params: { year: `${post.year}`, post: post.name } };
    });

    return {
      paths,
      fallback: false,
    };
  } catch (e) {
    console.log(`Error getting blog post static paths:\n${e}`);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }) {
  const { year, post } = params;

  try {
    const response = await fetch(`${lambdaURL}/blog/post`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        year: Number(year),
        post,
      }),
    });
    const json = await response.json();

    return {
      props: {
        html: json.html,
      },
    };
  } catch (e) {
    console.log(`Error:\n${e}`);
    return {
      props: {
        html: null,
      },
    };
  }
}

export default function Post({ html }) {
  const router = useRouter();
  const mobile = useContext(MobileContext);

  const skeleton = (
    <Box
      boxShadow='lg'
      padding='30px 60px'
      bg='white'>
      <chakra.div
        display='flex'
        flexDir='column'
        gap='40px'>
        <SkeletonText
          mt='4'
          noOfLines={24}
          spacing='8'
          skeletonHeight='1'
        />
      </chakra.div>
    </Box>
  );

  return (
    <chakra.div
      padding={mobile ? '20px' : '50px 240px'}
      display='flex'
      height='100%'
      width='100%'
      flexDir='column'
      gap={mobile ? '20px' : '50px'}>
      <chakra.div
        onClick={() => router.push(`/blog`)}
        _hover={{ cursor: 'pointer' }}
        width='40px'
        height='40px'
        display='flex'
        justifyContent={'center'}
        alignItems={'center'}
        border='solid'
        borderRadius={'30px'}>
        <ArrowLeftIcon />
      </chakra.div>
      {html ? (
        <Box
          sx={{
            '& div': {
              display: 'flex',
              flexDirection: 'column',
              gap: mobile ? '25px' : '35px',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            },
            '.title': {
              fontSize: mobile ? '32px' : '42px',
              lineHeight: '52px',
              letterSpacing: '-0.0011em',
              fontWeight: 700,
            },
            '& p': {
              fontSize: mobile ? '18px' : '20px',
              lineHeight: '32px',
              letterSpacing: '-0.003em',
            },
            '& h1': {
              fontSize: mobile ? '20px' : '24px',
              lineHeight: '30px',
              letterSpacing: '-0.0016em',
              fontWeight: 600,
            },
            '.image': {
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            },
            '#caption': {
              color: 'rgb(107, 107, 107)',
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '-0.003em',
            },
            '#chips': {
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '15px',
            },
            '.chip': {
              fontSize: mobile ? '16px' : 'inherit',
              border: '1px solid rgb(192, 192, 192)',
              borderRadius: '100px',
              fontWeight: 400,
              lineHeight: '20px',
              padding: '8px 16px',
              color: 'rgb(36, 36, 36)',
            },
            '& a': {
              _hover: {
                textDecor: 'underline',
              },
            },
            '& ul': {
              marginLeft: '20px',
              textAlign: 'left',
            },
            '& li': {
              padding: '5px 0px',
              fontSize: mobile ? '18px' : '20px',
              lineHeight: '32px',
              letterSpacing: '-0.003em',
            },
          }}
          dangerouslySetInnerHTML={{ __html: html }}></Box>
      ) : (
        skeleton
      )}
    </chakra.div>
  );
}
