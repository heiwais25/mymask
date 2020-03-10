import React, { useState, useEffect } from "react";
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
import LandingDialog from "./LandingDialog";
import { DIALOG_CHECK_KEY, DIALOG_CHECK_TOKEN } from "../constants";
import moment from "moment";

const Wrapper = styled.div`
  /* margin: 0 auto;
  width: 100%; */
`;

export default () => {
  const dueDate = moment("2020-03-10T23:00:00Z").toDate();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const checkToken = localStorage.getItem(DIALOG_CHECK_KEY);
    if (!checkToken || checkToken !== DIALOG_CHECK_TOKEN) {
      setOpen(true);
    }
  }, []);

  const handleDialogClose = () => {
    if (moment().isBefore(moment(dueDate))) {
      return;
    }

    setOpen(false);
    localStorage.setItem(DIALOG_CHECK_KEY, DIALOG_CHECK_TOKEN);
  };

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
        <LandingDialog open={open} handleClose={handleDialogClose} />
      </ThemeProvider>
    </MaterialThemeProvider>
  );
};
