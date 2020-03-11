import React from "react";
import styled from "../Styles/index";
import moment from "moment";

const Container = styled.div`
  ${props => props.theme.topBox};
  color: white;
  background-color: #1abc9c;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const ColItem = styled.div`
  :not(:last-child) {
    padding-right: 10px;
  }
  font-size: 12px;
`;

const Title = styled(ColItem)`
  font-size: 18px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const SubBold = styled.span`
  font-weight: 600;
`;

const maskRotation = ["전체", "1, 6", "2, 7", "3, 8", "4, 9", "5, 0", "전체"];

export default () => {
  return (
    <Container>
      <Col>
        {/* <ColItem>
          <Menu size={20} />
        </ColItem> */}
        <Title>
          {/* <Link to="/"> */}
          <Bold>마이마스크</Bold>

          {/* </Link> */}
        </Title>
      </Col>
      <Col>
        <ColItem>
          오늘의 마스크 5부제 <SubBold>(출생연도 끝자리 {maskRotation[moment().days()]})</SubBold>
        </ColItem>
      </Col>
    </Container>
  );
};
