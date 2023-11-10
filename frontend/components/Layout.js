import { chakra } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const router = useRouter();
  const [active, setActive] = useState(0);

  // Update on browser back button without
  // click event (and no Header rerender).
  useEffect(() => {
    const pages = {
      '/': 0,
      '/about': 1,
      '/resume': 2,
      '/blog': 3,
      '/contact': 4,
      '/portal': 5,
    };
    if (router.pathname in pages) {
      setActive(pages[router.pathname]);
    } else if (router.pathname.includes('blog')) {
      setActive(3);
    }
  }, [router.pathname]);

  return (
    <chakra.div minH='100vh'>
      <Header active={active} />
      <chakra.main pb='100px'>{children}</chakra.main>
      <Footer />
    </chakra.div>
  );
}
