import {
  chakra,
  Box,
  SkeletonCircle,
  SkeletonText,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { MobileContext } from '#/components/context/MobileContext';

export function YearBreadcrumbs({ handleBreadcrumbClick }) {
  return (
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
  );
}

export function BlogPosts({ posts, renderBlogPost }) {
  const mobile = useContext(MobileContext);

  return posts.map((element, idx) => {
    const { name, chip, min, date, preview, title } = element;
    const aboveDivider =
      idx === 0 ? <Divider orientation='horizontal' /> : null;
    const belowDivider =
      idx !== posts.length - 1 ? <Divider orientation='horizontal' /> : null;
    const renderedPreview = !mobile ? (
      <chakra.p width={mobile ? '175px' : '350px'}>{preview}</chakra.p>
    ) : null;
    return renderBlogPost({
      name,
      chip,
      min,
      date,
      renderedPreview,
      aboveDivider,
      belowDivider,
      title,
    });
  });
}

export function BlogPost({
  year,
  name,
  chip,
  min,
  date,
  renderedPreview,
  aboveDivider,
  belowDivider,
  title,
}) {
  const mobile = useContext(MobileContext);
  const router = useRouter();

  return (
    <chakra.div
      key={name}
      display={'flex'}
      flexDirection={'column'}
      gap={mobile ? '30px' : '50px'}>
      {aboveDivider}
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
          {renderedPreview}
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
      {belowDivider}
    </chakra.div>
  );
}
