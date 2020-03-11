import React from "react";
import styled from "../Styles/index";
import moment from "moment";
import { Finder } from "../Icons";
import { useHistory } from "react-router-dom";
import { SEARCH_DIALOG } from "../constants";

const Container = styled.div`
  ${props => props.theme.topBox};
  color: white;
  height: 66px;
  background-color: ${props => props.theme.primaryColor};
  justify-content: space-between;
  align-items: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColItem = styled.div`
  :not(:last-child) {
    padding-right: 10px;
  }
  font-size: 12px;
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

const IconButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
  border-radius: 50%;
  padding: 6px;
`;

const maskRotation = ["전체", "1, 6", "2, 7", "3, 8", "4, 9", "5, 0", "전체"];

export default () => {
  const history = useHistory();

  const onSearchClick = () => {
    history.push({
      hash: SEARCH_DIALOG
    });
  };

  return (
    <Container>
      <>
        <Col>
          <Title>
            <Bold>마이마스크</Bold>
          </Title>
          <ColItem>
            오늘의 마스크 5부제 <SubBold>(출생연도 끝자리 {maskRotation[moment().days()]})</SubBold>
          </ColItem>
        </Col>
        <Col>
          <IconButton onClick={() => onSearchClick()}>
            <Finder size={20} />
          </IconButton>
        </Col>
      </>
    </Container>
  );
};
