import {
  chakra,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Blog() {
  const router = useRouter();

  return (
    <chakra.div
      padding={'30px 0px 0px 60px'}
      fontSize='18px'>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/blog/2019')}>
            2019
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem />
      </Breadcrumb>
    </chakra.div>
  );
}
