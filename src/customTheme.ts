import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import TwentiethCentury from "./static/fonts/TwentiethCenturyforKenmoreMedium.ttf";

const themeBase = createTheme({
  typography: {
    fontFamily: "TwentiethCentury, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'TwentiethCentury';
          src: url(${TwentiethCentury}) format('woff2');
          font-weight: normal;
          font-style: normal;
        }
      `,
    },
  },
});

export const customTheme = responsiveFontSizes(themeBase);
