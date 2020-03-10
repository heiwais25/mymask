import React from "react";
import styled from "../Styles/index";
import moment from "moment";

const Container = styled.div`
  position: relative;
  z-index: 10;
  height: 44px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 3px 3px 0px rgba(0, 0, 0, 0.19);
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
          <Bold>My</Bold>
          <Bold>Mask</Bold>
          {/* </Link> */}
        </Title>
      </Col>
      <Col>
        <ColItem>
          오늘의 마스크 5부제{" "}
          <SubBold>(출생연도 끝자리 {maskRotation[moment().days()]})</SubBold>
        </ColItem>
      </Col>
    </Container>
  );
};
