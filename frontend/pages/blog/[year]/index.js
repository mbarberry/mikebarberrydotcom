import {
  chakra,
  Box,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { MobileContext } from '#/components/context/MobileContext';
import { lambdaURL } from '#/utils';

export default function Year() {
  const [posts, setPosts] = useState([]);
  const [year, setYear] = useState(null);

  const mobile = useContext(MobileContext);
  const router = useRouter();

  useEffect(() => {
    let subscribed = true;

    if (subscribed) {
      const pathname = window.location.pathname;
      const pathyear = pathname.slice(pathname.lastIndexOf('/') + 1);

      if (!isNaN(Number(pathyear))) {
        setYear(pathyear);
      }

      fetch(`${lambdaURL}/blog`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          year: pathyear,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setPosts(json.posts);
        });
    }
    return () => {
      subscribed = false;
    };
  }, [router.pathname]);

  return (
    <chakra.div paddingBottom={'50px'}>
      {posts.length === 0 ? (
        <chakra.div
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          gap={mobile ? '30px' : '50px'}>
          {year ? (
            <chakra.h1
              paddingTop={'30px'}
              fontSize='30px'
              fontWeight='bold'>
              {2019}
            </chakra.h1>
          ) : (
            <Skeleton height='20px' />
          )}
          <chakra.div
            display='flex'
            flexDir={'column'}
            gap={'50px'}
            width={mobile ? '350px' : '350px'}>
            <Box
              boxShadow='lg'
              bg='white'>
              <SkeletonCircle size='10' />
              <SkeletonText
                mt='4'
                noOfLines={4}
                spacing='4'
                skeletonHeight='2'
              />
            </Box>
            <Box
              boxShadow='lg'
              bg='white'>
              <SkeletonCircle size='10' />
              <SkeletonText
                mt='4'
                noOfLines={4}
                spacing='4'
                skeletonHeight='2'
              />
            </Box>
            <Box
              boxShadow='lg'
              bg='white'>
              <SkeletonCircle size='10' />
              <SkeletonText
                mt='4'
                noOfLines={4}
                spacing='4'
                skeletonHeight='2'
              />
            </Box>
            <Box
              boxShadow='lg'
              bg='white'>
              <SkeletonCircle size='10' />
              <SkeletonText
                mt='4'
                noOfLines={4}
                spacing='4'
                skeletonHeight='2'
              />
            </Box>
          </chakra.div>
        </chakra.div>
      ) : (
        <chakra.div
          display={'flex'}
          flexDir={'column'}
          gap={mobile ? '45px' : '50px'}
          width={'100%'}>
          <chakra.div
            display='flex'
            paddingTop='30px'
            justifyContent={'center'}
            alignItems={'center'}>
            <chakra.h1
              fontSize='30px'
              fontWeight='bold'>
              {year}
            </chakra.h1>
          </chakra.div>
          <chakra.div
            _hover={{
              cursor: 'pointer',
            }}
            padding={mobile ? '0px 15px' : '0px 30px'}
            display={'flex'}
            flexDirection={'column'}
            gap={mobile ? '30px' : '50px'}>
            {posts.map((element) => {
              const { html, name, date, preview, title } = element;
              return (
                <chakra.div
                  onClick={() => {
                    router.push(`/blog/${year}/${name}`);
                  }}
                  key={name}
                  display={'flex'}
                  paddingLeft={mobile ? '50px' : undefined}
                  gap={'20px'}
                  width={mobile ? '80%' : '100%'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <chakra.div
                    display={'flex'}
                    flexDirection={'column'}
                    gap='20px'>
                    <chakra.p
                      fontSize='12px'
                      fontWeight='light'>
                      {date}
                    </chakra.p>
                    <chakra.h1
                      fontSize='20px'
                      fontWeight='bold'
                      width={mobile ? '175px' : '350px'}>
                      {title}
                    </chakra.h1>
                    <chakra.p width={mobile ? '175px' : '350px'}>
                      {preview}
                    </chakra.p>
                  </chakra.div>
                  <Image
                    width={mobile ? 120 : 200}
                    height={mobile ? 120 : 200}
                    src={`/blog/${name}/thumbnail.png`}
                    alt={`${name} blog thumbnail`}
                  />
                </chakra.div>
              );
            })}
          </chakra.div>
        </chakra.div>
      )}
    </chakra.div>
  );
}
