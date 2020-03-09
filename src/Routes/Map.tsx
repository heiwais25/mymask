import React from "react";
import styled from "../Styles/index";
import KakaoMap from "../Components/KakaoMap/KakaoMap";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 88px);
  svg {
    fill: ${props => props.theme.darkGreyColor};
  }
`;

export default () => {
  return (
    <Container>
      <KakaoMap />
    </Container>
  );
};
