import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { createAppTheme } from "./theme";

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () => createAppTheme(prefersDarkMode),
    [prefersDarkMode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
