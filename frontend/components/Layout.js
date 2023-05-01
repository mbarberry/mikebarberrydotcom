import { chakra } from '@chakra-ui/react';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <chakra.div minH='100vh'>
      <Header />
      <chakra.main pb='100px'>{children}</chakra.main>
      <Footer />
    </chakra.div>
  );
}
