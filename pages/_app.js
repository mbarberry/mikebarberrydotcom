import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

import theme from '../styles/theme';
import Layout from '../components/Layout';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import 'normalize.css/normalize.css';

export default function App({ Component, pageProps }) {
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
