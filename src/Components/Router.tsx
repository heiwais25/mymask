import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Map from "../Routes/Map";
import styled from "../Styles";
import Header from "./Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HeaderBox = styled.div``;

const PageBox = styled.div`
  display: flex;
  height: 100%;
`;

export default () => {
  return (
    <Container>
      <HeaderBox>
        <Header />
        {/* <Search /> */}
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
};
