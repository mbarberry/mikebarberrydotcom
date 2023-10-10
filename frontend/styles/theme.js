import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Poppins',
      },
    },
  },
  colors: {
    jaggedIce: {
      300: '#BFE3DD',
      400: '0xbfe3dd',
    },
    blue: {
      400: '#2C4071',
    },
  },
});

export default theme;
