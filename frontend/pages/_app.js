import { useEffect } from 'react';
import { chakra, ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import Head from 'next/head';

import theme from '../styles/theme';
import Layout from '../components/Layout';
import { MobileContextProvider } from '#/components/context/MobileContext';
import { CacheContextProvider } from '#/components/context/CacheContext';

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
        <chakra.div
          display='flex'
          flexDirection='column'>
          <Head>
            <title>MikeBarberry.com</title>
          </Head>
          {Component.name === 'Authorize' ? (
            // Don't wrap authorization page
            // with header and footer.
            <Component {...pageProps} />
          ) : (
            <Layout>
              <CacheContextProvider>
                <Component {...pageProps} />
              </CacheContextProvider>
            </Layout>
          )}
        </chakra.div>
      </MobileContextProvider>
    </ChakraProvider>
  );
}
