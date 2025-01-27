import { createTheme, Theme } from "@mui/material/styles";

export const createAppTheme = (prefersDarkMode: boolean): Theme => {
  return createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#646cff",
      },
      secondary: {
        main: "#00d3a2",
      },
      background: {
        default: prefersDarkMode ? "#1a1a1a" : "#f9f9f9",
        paper: prefersDarkMode ? "#1a1a1a" : "#f9f9f9",
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
