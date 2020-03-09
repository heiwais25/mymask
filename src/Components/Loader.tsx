import React from "react";
import { keyframes } from "styled-components";
import styled from "../Styles";
import { Loading } from "../Icons";

type Props = {
  size?: number;
  className?: string;
};

const Animation = keyframes`
    0%{
        transform: rotate(0deg); 
    }
    50%{
    }
    100%{
        transform: rotate(359deg); 
    }
`;

const Loader = styled.div`
  width: 100%;
  text-align: center;
  animation: ${Animation} 2s linear infinite;
  svg {
    fill: ${props => props.theme.blueColor};
  }
`;

export default ({ size, className }: Props) => (
  <Loader className={className}>
    <Loading size={size} />
  </Loader>
);
