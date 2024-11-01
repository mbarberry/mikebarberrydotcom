import { useEffect } from 'react';
import { useRouter } from 'next/router';
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

const shouldIndex = () => {
  return process.env.ENVIRONMENT === 'prod' ? 'index,follow' : 'noindex,follow';
};

const PREFIX = 'MB SWE';

const seoPageInfo = {
  Resume: {
    title: `${PREFIX} Resume`,
    description: `${PREFIX} Resume`,
  },
  Home: {
    title: `${PREFIX} Home`,
    description: `${PREFIX} Home`,
  },
  Contact: {
    title: `${PREFIX} Contact`,
    description: `${PREFIX} Contact`,
  },
  Portal: {
    title: `${PREFIX} Client Portal`,
    description: `${PREFIX} Client Portal`,
  },
  Blog: {
    title: `${PREFIX} Blog`,
    description: `${PREFIX} Blog`,
  },
  About: {
    title: `${PREFIX} About`,
    description: `${PREFIX} About`,
  },
  Post: {
    title: `${PREFIX} Blog Post`,
    description: `${PREFIX} Blog Post`,
  },
};

export default function App({ Component, pageProps }) {
  const [mobile] = useMediaQuery('(max-width: 750px)');
  const router = useRouter();

  useEffect(() => {
    import('darkreader').then((dr) =>
      dr.enable({ brightness: 100, contrast: 90, sepia: 10 })
    );
  }, []);

  // Code handles edge cases of Component.name timing errors and 404 / 500 pages.

  return (
    <ChakraProvider theme={theme}>
      <MobileContextProvider mobile={mobile}>
        <chakra.div
          display='flex'
          flexDirection='column'>
          <Head>
            <title>{`${
              seoPageInfo[Component.name]?.title ||
              `${PREFIX} ${Component.name}`
            }`}</title>
            <link
              rel='canonical'
              href={
                `https://www.mikebarberry.com${router.pathname}` ??
                'https://www.mikebarberry.com'
              }
            />
            <meta
              name='robots'
              content={shouldIndex()}
            />
            <meta
              name='googlebot'
              content={shouldIndex()}
            />
            <meta
              property='og:title'
              content={
                seoPageInfo[Component.name]?.title ?? 'Mike Barberry SWE'
              }
            />
            <meta
              property='og:description'
              content={
                seoPageInfo[Component.name]?.description ?? 'Mike Barberry SWE'
              }
            />
            <meta
              name='description'
              content={
                seoPageInfo[Component.name]?.description ?? 'Mike Barberry SWE'
              }
            />
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
