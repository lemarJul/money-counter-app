import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/TextField" {
  interface TextFieldPropsVariantOverrides {
    numberfield: true;
  }
}

export const createAppTheme = (prefersDarkMode: boolean): Theme => {
  const deepBlue = "#1E2A38";
  const electricBlue = "#3A7DFF";
  // const vibrantGreen = "#3CB878";
  // const warmOrange = "#F5A623";
  // const goldenBrown = "#A67C52";
  const darkCharcoal = "#12181B";
  const coolGray = "#B0BEC5";
  const softWhite = "#F9FAFB";
  // const warningRed = "#E63946";
  // const softYellow = "#FFD700";

  return createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: electricBlue,
        light: "#66B2FF", //Example lighter shade
        dark: deepBlue, //Example darker shade
        contrastText: prefersDarkMode ? softWhite : darkCharcoal,
      },
      // secondary: {
      //   main: vibrantGreen,
      //   light: "#62D19A", //Example lighter shade
      //   dark: "#27865C", //Example darker shade
      //   contrastText: prefersDarkMode ? softWhite : darkCharcoal,
      // },
      info: {
        main: electricBlue,
        light: "#66B2FF", //Example lighter shade
        dark: deepBlue, //Example darker shade
        contrastText: prefersDarkMode ? softWhite : darkCharcoal,
      },
      background: {
        default: prefersDarkMode ? darkCharcoal : softWhite,
        paper: prefersDarkMode ? darkCharcoal : softWhite,
      },
      text: {
        primary: prefersDarkMode ? softWhite : darkCharcoal,
        secondary: prefersDarkMode ? coolGray : coolGray,
      },
    },
    typography: {
      fontFamily:
        '"Roboto", system-ui, -apple-system, "Open Sans", "Helvetica Neue", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          #root {
            width: 100vw;
            height: 100dvh;
            max-width: 1280px;
            max-height: 100dvh;
            margin: auto;
            overflow: hidden;
          }
        `,
      },
    },
  });
};
