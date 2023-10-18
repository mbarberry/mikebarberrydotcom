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
      500: '#4DA6A6',
      600: '#0A5450',
    },
    themeBlue: {
      400: '#2C4071',
    },
    roseFog: {
      200: '#EAC8C2',
    },
    melanie: {
      200: '#EAC2E5',
    },
  },
});

export default theme;
