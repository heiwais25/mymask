import React from "react";
import styled from "../Styles/index";
import MarkerIconButton from "./MarkerIconButton";
import { IVisibleRemainStat } from "../utils/stores";
import { statusString, statusColor } from "../constants";

const Container = styled.div`
  ${props => props.theme.topBox};
  height: ${props => props.theme.filterBoxHeight};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.span`
  padding-right: 8px;
`;

const IconButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

type Props = {
  markersVisibility: { [key in IVisibleRemainStat]: boolean };
  toggleFilter: (key: IVisibleRemainStat) => void;
};

export default ({ markersVisibility, toggleFilter }: Props) => {
  return (
    <>
      <Container>
        <Title>필터</Title>
        <IconButtonGroup>
          {Object.keys(markersVisibility).map(rawKey => {
            const key = rawKey as IVisibleRemainStat;
            return (
              <MarkerIconButton
                focused={markersVisibility[key]}
                key={key}
                text={statusString[key]}
                iconColor={statusColor[key]}
                onClick={() => toggleFilter(key)}
              />
            );
          })}
        </IconButtonGroup>
      </Container>
    </>
  );
};
