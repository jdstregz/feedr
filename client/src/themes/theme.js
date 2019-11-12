import { createMuiTheme } from '@material-ui/core';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        lightest: '#dff7ff',
        light: '#ace9fe',
        lightish: '#70dbfe',
        main: '#00ccff',
        darkeh: '#00c0ff',
        darkish: '#00b4ff',
        darker: '#00a6f4',
        darkerer: '#0093e1',
        darkererer: '#0081cd',
        dark: '#0061ac',
      },
      secondary: {
        dark: '#fc8410',
        main: '#0e0e0e',
        lighteh: '#ffc62a',
        lighter: '#ffde33',
        light: '#f8e82d',
        lighterer: '#fbed51',
        lightfug: '#fdf273',
        lightest: '#fef69c',
        lightester: '#fffac4',
        basicallyWhite: '#fffee7',
      },
      background: {
        main: '#222222',
        light: '#6d6d6d',
        dark: '#141414',
        white: '#ffffff',
        medium: '#474747',
        darkish: '#333333',
      },
      accent: {
        light: '#00f2ea',
        main: '#00d9df',
        dark: '#007768',
      },
    },
    typography: {
      fontFamily: [
        'Arial',
        'sans-serif',
        '"Helvetica Neue"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',

        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h6: {
        fontWeight: 800,
      },
      username: {
        font: 'Roboto',
        fontWeight: 800,
      },
    },
  }),
);

export default theme;
