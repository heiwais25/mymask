import React from "react";
import styled from "../Styles";
import { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core";
import { materialTheme } from "../Styles/MaterialTheme";

const Wrapper = styled.div`
  /* margin: 0 auto;
  width: 100%; */
`;

export default () => {
  return (
    <MaterialThemeProvider theme={materialTheme}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <BrowserRouter>
          <Wrapper>
            <Router />
            {/* <Footer /> */}
          </Wrapper>
        </BrowserRouter>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        {/* <LandingDialog open={open} handleClose={() => setOpen(false)} /> */}
      </ThemeProvider>
    </MaterialThemeProvider>
  );
};
