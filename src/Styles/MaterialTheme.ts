import { createMuiTheme } from "@material-ui/core";

export const materialTheme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(",")
  },
  palette: {
    primary: {
      main: "#2980b9"
    }
  },
  overrides: {
    MuiMenuItem: {
      root: {
        minHeight: "35px",
        fontSize: "16px"
      }
    },
    MuiToolbar: {
      root: {
        color: "white"
      }
    }
  }
});
