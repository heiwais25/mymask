import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Map from "../Routes/Map";
import styled from "../Styles";
import Header from "./Header";
import useKakaoLinkAuth from "../hooks/useKakaoInit";
import Loader from "./Loader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const HeaderBox = styled.div``;

const PageBox = styled.div`
  display: flex;
  height: 100%;
`;

const LoaderBox = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 18px;
    :not(:last-child) {
      margin-bottom: 16px;
    }
    color: ${props => props.theme.darkGreyColor};
  }
`;

const ErrorText = styled.span``;

const ErrorTitle = styled.span`
  font-size: 18px;
  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

export default () => {
  const { authorized, loadFailed } = useKakaoLinkAuth();

  if (loadFailed) {
    return (
      <Container>
        <ErrorBox>
          <span role="img" aria-label="sorry" aria-labelledby="sorry">
            죄송합니다. 😭
          </span>
          <ErrorText>현재 카카오맵이 이용불가능한 상태입니다</ErrorText>
          <ErrorText>잠시 후에 다시 이용해주세요</ErrorText>
          <ErrorTitle>- 마이마스크 -</ErrorTitle>
        </ErrorBox>
      </Container>
    );
  }

  return (
    <Container>
      {!authorized && (
        <LoaderBox>
          <Loader />
        </LoaderBox>
      )}
      {authorized && (
        <>
          <HeaderBox>
            <Header />
          </HeaderBox>
          <PageBox>
            <Switch>
              <Route path="/">
                <Map />
              </Route>
              <Redirect path="*" to="/" />
            </Switch>
          </PageBox>
        </>
      )}
    </Container>
  );
};
