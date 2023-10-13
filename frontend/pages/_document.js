import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='robots'
          content='index,follow'
        />
      </Head>
      <body>
        <Main style={{ height: '100%' }} />
        <NextScript />
      </body>
    </Html>
  );
}
