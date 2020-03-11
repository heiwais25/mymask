import React from "react";
import styled from "../Styles/index";
import MarkerIconButton from "./MarkerIconButton";
import { IRemainStat } from "../hooks/useFetchStores";
import { statusString, statueColor } from "../constants";

const Container = styled.div`
  ${props => props.theme.topBox};
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
  markersVisibility: { [key in IRemainStat]: boolean };
  toggleFilter: (key: IRemainStat) => void;
};

export default ({ markersVisibility, toggleFilter }: Props) => {
  return (
    <>
      <Container>
        <Title>필터</Title>
        <IconButtonGroup>
          {Object.keys(markersVisibility).map(rawKey => {
            const key = rawKey as IRemainStat;
            return (
              <MarkerIconButton
                focused={markersVisibility[key]}
                key={key}
                text={statusString[key]}
                iconColor={statueColor[key]}
                onClick={() => toggleFilter(key)}
              />
            );
          })}
        </IconButtonGroup>
      </Container>
    </>
  );
};
