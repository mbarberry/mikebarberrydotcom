import {
  chakra,
  Box,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
} from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { MobileContext } from '#/components/context/MobileContext';
import { lambdaURL } from '#/utils';

export default function Year() {
  const [posts, setPosts] = useState([]);
  const [year, setYear] = useState(2019);

  const mobile = useContext(MobileContext);
  const router = useRouter();

  const handleBreadcrumbClick = (bcYear) => {
    if (!bcYear === year) {
      setYear(bcYear);
    }
  };

  useEffect(() => {
    let subscribed = true;

    if (subscribed) {
      fetch(`${lambdaURL}/blog`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          year,
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
  }, [year]);

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
            <Breadcrumb
              paddingTop={'30px'}
              fontSize='30px'
              fontWeight='bold'>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => handleBreadcrumbClick(2019)}>
                  2019
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem />
            </Breadcrumb>
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
          width={'100%'}
          justifyContent={'center'}
          alignItems={'center'}>
          <chakra.div
            display='flex'
            paddingTop='30px'>
            <Breadcrumb
              fontSize='30px'
              fontWeight='bold'>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => handleBreadcrumbClick(2019)}>
                  2019
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem />
            </Breadcrumb>
          </chakra.div>
          <chakra.div
            _hover={{
              cursor: 'pointer',
            }}
            padding={mobile ? '0px 15px' : '0px 30px'}
            display={'flex'}
            flexDirection={'column'}
            gap={mobile ? '40px' : '50px'}>
            {posts.map((element, idx) => {
              const { name, chip, min, date, preview, title } = element;
              return (
                <chakra.div
                  key={name}
                  display={'flex'}
                  flexDirection={'column'}
                  gap={mobile ? '30px' : '50px'}>
                  {idx === 0 && <Divider orientation='horizontal' />}
                  <chakra.div
                    onClick={() => {
                      router.push(`/blog/${year}/${name}`);
                    }}
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
                        fontSize={mobile ? '16px' : '20px'}
                        fontWeight={mobile ? 'normal' : 'bold'}
                        width={mobile ? '175px' : '350px'}>
                        {title}
                      </chakra.h1>
                      {!mobile && (
                        <chakra.p width={mobile ? '175px' : '350px'}>
                          {preview}
                        </chakra.p>
                      )}
                    </chakra.div>
                    <Image
                      width={mobile ? 120 : 200}
                      height={mobile ? 120 : 200}
                      src={`/blog/${name}/thumbnail.png`}
                      alt={`${name} blog thumbnail`}
                    />
                  </chakra.div>
                  <chakra.div
                    display='flex'
                    flexDirection='row'
                    flexWrap={'wrap'}
                    fontSize='12px'
                    alignItems={'center'}
                    gap='15px'>
                    <chakra.p
                      border={'1px solid rgb(192, 192, 192)'}
                      borderRadius={'100px'}
                      fontWeight={400}
                      lineHeight='20px'
                      padding={'8px 16px'}>
                      {chip}
                    </chakra.p>
                    <chakra.p>{`${min} min read`}</chakra.p>
                  </chakra.div>
                  {idx !== posts.length - 1 && (
                    <Divider orientation='horizontal' />
                  )}
                </chakra.div>
              );
            })}
          </chakra.div>
        </chakra.div>
      )}
    </chakra.div>
  );
}
