import React from "react";
import styled from "../Styles/index";
import Input from "./Input";
import useInput from "../hooks/useInput";

const Container = styled.div`
  position: relative;
  z-index: 10;
  height: 44px;
  background-color: #fff;
  display: flex;
  box-shadow: 0 3px 3px 0px rgba(0, 0, 0, 0.19);
  padding: 10px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  input {
    width: 100%;
  }
  padding: 3px 0px;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const search = useInput("");
  return (
    <Container>
      <Content>
        <Input
          placeholder="장소, 주소, 지명 등을 입력하세요"
          value={search.value}
          onChange={search.onChange}
        />
      </Content>
    </Container>
  );
};
