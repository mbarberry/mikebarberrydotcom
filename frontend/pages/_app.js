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

const seoPageInfo = {
  Resume: {
    title: `Mike Barberry's Resume: an experienced full stack software engineer open to new clients.`,
    description: `A highlight of Mike's impressive professional software engineering accomplishments.`,
  },
  Home: {
    title: `Mike Barberry's Website Homepage: an experienced full stack software engineer open to new clients.`,
    description: `Mike's homepage that features an advanced 3D graphic, demonstrating his strong engineering skills.`,
  },
  Contact: {
    title: `Mike Barberry's Contact Page: an experienced full stack software engineer open to new clients.`,
    description: `Mike built this form so prospective clients and/or partners can easily send him an email.`,
  },
  Portal: {
    title: `Mike Barberry, an experienced software engineer, Client Portal page.`,
    description: `Mike's clients can use this portal to access useful features.`,
  },
  Blog: {
    title: `Mike Barberry, a software engineer, Blog page`,
    description: `Software engineering blog posts written by the experienced software engineer, Mike Barberry.`,
  },
  About: {
    title: `Mike Barberry's About page that highlights his recent software engineering professional accomplishments.`,
    description: `Learn more about the software Mike Barberry has built during his successful career.`,
  },
  Post: {
    title: `Mike Barberry, a software engineer, Blog Post page`,
    description: `An insightful software engineering blog post written by Mike Barberry.`,
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
            <title>{`Mike Barberry SWE ${Component.name}`}</title>
            <link
              rel='canonical'
              href={
                `https://mikebarberry.com${router.pathname}` ??
                'https://mikebarberry.com'
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
                seoPageInfo[Component.name]?.title ??
                'Mike Barberry LLC Webpage'
              }
            />
            <meta
              property='og:description'
              content={
                seoPageInfo[Component.name]?.description ??
                'Mike Barberry LLC Webpage'
              }
            />
            <meta
              name='description'
              content={
                seoPageInfo[Component.name]?.description ??
                'Mike Barberry LLC Webpage'
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
