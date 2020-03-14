import React, { useState } from "react";
import styled from "../Styles/index";
import moment from "moment";
import { Finder, Menu } from "../Icons";
import { useHistory } from "react-router-dom";
import { SEARCH_DIALOG } from "../constants";
import Drawer from "./Drawer";

const Container = styled.div`
  ${props => props.theme.topBox};
  color: white;
  height: 55px;
  background-color: ${props => props.theme.primaryColor};
  justify-content: space-between;
  align-items: center;
`;

const Col = styled.div`
  display: flex;
`;

const ColItem = styled.div`
  :not(:last-child) {
    padding-right: 8px;
  }
  font-size: 12px;
  display: flex;
  flex-direction: column;
`;

const Title = styled(ColItem)`
  font-size: 18px;
  padding-bottom: 6px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const SubBold = styled.span`
  font-weight: 600;
`;

const SubTitle = styled.div``;

const IconButton = styled.div`
  ${props => props.theme.buttonBase}
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
  border-radius: 50%;
  padding: 4px;
`;

const maskRotation = ["전체", "1, 6", "2, 7", "3, 8", "4, 9", "5, 0", "전체"];

export default () => {
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onSearchClick = () => {
    history.push({
      hash: SEARCH_DIALOG
    });
  };

  return (
    <Container>
      <>
        <Col>
          <ColItem>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <Menu size={20} />
            </IconButton>
          </ColItem>
          <ColItem>
            <Title>
              <Bold>마이마스크</Bold>
            </Title>
            <SubTitle>
              오늘의 마스크 5부제{" "}
              <SubBold>(출생연도 끝자리 {maskRotation[moment().days()]})</SubBold>
            </SubTitle>
          </ColItem>
        </Col>
        <Col>
          <IconButton onClick={() => onSearchClick()}>
            <Finder size={20} />
          </IconButton>
        </Col>
      </>

      <Drawer open={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </Container>
  );
};
