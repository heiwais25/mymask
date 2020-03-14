import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core";
import { materialTheme } from "../Styles/MaterialTheme";
import LandingDialog from "./LandingDialog";
import { NOTICE_CHECK_KEY, NOTICE_CHECK_TOKEN } from "../constants";
import moment from "moment";

export default () => {
  const dueDate = moment("2020-03-10T23:00:00Z").toDate();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const checkToken = localStorage.getItem(NOTICE_CHECK_KEY);
    if (!checkToken || checkToken !== NOTICE_CHECK_TOKEN) {
      setOpen(true);
    }
  }, []);

  const handleDialogClose = () => {
    if (moment().isBefore(moment(dueDate))) {
      return;
    }

    setOpen(false);
    localStorage.setItem(NOTICE_CHECK_KEY, NOTICE_CHECK_TOKEN);
  };

  return (
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
};
