import React from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core";
import { materialTheme } from "../Styles/MaterialTheme";
import "moment/locale/ko";

export default () => (
  <MaterialThemeProvider theme={materialTheme}>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Router />
        {/* <Footer /> */}
      </BrowserRouter>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </ThemeProvider>
  </MaterialThemeProvider>
);
