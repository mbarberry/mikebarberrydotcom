import { useEffect } from 'react';
import { ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import Head from 'next/head';

import theme from '../styles/theme';
import Layout from '../components/Layout';
import { MobileContextProvider } from '#/components/context/MobileContext';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import 'normalize.css/normalize.css';

export default function App({ Component, pageProps }) {
  const [mobile] = useMediaQuery('(max-width: 750px)');

  useEffect(() => {
    import('darkreader').then((dr) =>
      dr.enable({ brightness: 100, contrast: 90, sepia: 10 })
    );
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <MobileContextProvider mobile={mobile}>
        <Head>
          <title>MikeBarberry.com</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MobileContextProvider>
    </ChakraProvider>
  );
}
