import { ChakraProvider } from '@chakra-ui/react';
import 'normalize.css/normalize.css';

import theme from '../styles/theme';
import Layout from '../components/Layout';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
