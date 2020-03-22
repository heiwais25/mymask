import React, { useState } from "react";
import styled from "../Styles/index";
import KakaoMap from "../Components/KakaoMap/KakaoMap";
import TopFilters from "../Components/TopFilters";
import { IVisibleRemainStat } from "../utils/stores";
import LandingDialog from "../Components/LandingDialog";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  svg {
    fill: ${props => props.theme.darkGreyColor};
  }
`;

const MapBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export default () => {
  const [markersVisibility, setMarkersVisibility] = useState<
    { [key in IVisibleRemainStat]: boolean }
  >({
    plenty: true,
    some: true,
    few: true,
    empty: true
  });

  const toggleFilter = (key: IVisibleRemainStat) => {
    const current = markersVisibility[key];
    setMarkersVisibility({
      ...markersVisibility,
      [key]: !current
    });
  };

  return (
    <Container>
      <TopFilters markersVisibility={markersVisibility} toggleFilter={toggleFilter} />
      <MapBox>
        <KakaoMap markersVisibility={markersVisibility} />
      </MapBox>
      <LandingDialog />
    </Container>
  );
};
