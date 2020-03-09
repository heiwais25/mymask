import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Map from "../Routes/Map";
import styled from "../Styles";
import Header from "./Header";
import Search from "./Search";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* position: relative; */
  height: 100vh;
`;

const HeaderBox = styled.div``;

const PageBox = styled.div``;

export default () => (
  <Container>
    <HeaderBox>
      <Header />
      <Search />
    </HeaderBox>
    <PageBox>
      <Switch>
        <Route path="/">
          <Map />
        </Route>
        <Redirect path="*" to="/" />
      </Switch>
    </PageBox>
  </Container>
);
