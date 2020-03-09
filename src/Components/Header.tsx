import React from "react";
import styled from "../Styles/index";
import { Menu } from "../Icons";
import { Link as RouterLink } from "react-router-dom";

const Container = styled.div`
  position: relative;
  z-index: 10;
  height: 44px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const ColItem = styled.div`
  :not(:last-child) {
    padding-right: 10px;
  }
`;

const Title = styled(ColItem)`
  font-size: 18px;
`;

const Light = styled.span``;
const Bold = styled.span`
  font-weight: 600;
`;

const Link = styled(RouterLink)`
  color: inherit;
`;

export default () => {
  return (
    <Container>
      <Col>
        <ColItem>
          <Menu size={20} />
        </ColItem>
        <Title>
          <Link to="/">
            <Light>My</Light>
            <Bold>Mask</Bold>
          </Link>
        </Title>
      </Col>
      <Col>
        <ColItem>공지사항</ColItem>
      </Col>
    </Container>
  );
};
