import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
export const theme = createMuiTheme({
  direction: "rtl",

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 961,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: " IRANSans ",
  },
  palette: {
    primary: {
      main: "#1E4383",
    },
    secondary: {
      main: "#277FE5",
    },
  },
});
