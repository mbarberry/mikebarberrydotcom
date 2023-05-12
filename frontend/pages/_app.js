import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

import theme from '../styles/theme';
import Layout from '../components/Layout';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import 'normalize.css/normalize.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('darkreader').then((dr) =>
      dr.enable({ brightness: 100, contrast: 90, sepia: 10 })
    );
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>MikeBarberry.com</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
