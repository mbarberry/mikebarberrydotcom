import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Poppins',
        minH: '100vh',
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'space-between',
      },
    },
  },
});

export default theme;
