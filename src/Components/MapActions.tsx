import React from "react";
import styled from "../Styles/index";
import { Location, UpArrow, Plus, Minus } from "../Icons";
import { IStore } from "../hooks/useFetchStores";
import Loader from "./Loader";
import { isMobile } from "react-device-detect";

const RightSideButtons = styled.div`
  position: absolute;
  top: ${props => props.theme.mapActionPadding};
  right: ${props => props.theme.mapActionPadding};
  z-index: 10;
`;

type IconButtonProps = {
  "data-focused"?: boolean;
};

const IconButton = styled.div<IconButtonProps>`
  ${props => props.theme.buttonBase};
  svg {
    fill: ${props => (props["data-focused"] ? "white !important" : props.theme.darkGreyColor)};
  }
  ${props => props.theme.iconButton};

  background-color: ${props => (props["data-focused"] ? props.theme.primaryColor : "white")};

  :not(:last-child) {
    margin-bottom: ${props => props.theme.mapActionPadding};
  }
`;

const BottomSideButtons = styled.div`
  position: absolute;
  bottom: ${props => (isMobile ? props.theme.mapActionPadding : "")};
  top: ${props => (!isMobile ? props.theme.mapActionPadding : "")};
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  svg {
    margin-left: 8px;
  }
`;

type ListViewButtonProps = {
  "data-disabled"?: boolean;
  "data-mobile"?: boolean;
};

const ListViewButton = styled.div<ListViewButtonProps>`
  ${props => props.theme.buttonBase};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: ${props => (props["data-mobile"] ? props.theme.primaryColor : "white")};
  color: ${props => (props["data-mobile"] ? "white" : "black")};
  padding: 8px 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  svg {
    fill: white !important;
  }
`;

const ButtonText = styled.span`
  pointer-events: none;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */

  /* Rules below not implemented in browsers yet */
  -o-user-select: none;
  user-select: none;
`;

const LoaderBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  /* transform: translate(-50%, -50%); */
  z-index: 1000;
`;

const BottomSign = styled.div`
  position: absolute;
  bottom: ${props => props.theme.mapActionPadding};
  right: ${props => props.theme.mapActionPadding};
  z-index: 10;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ZoomBox = styled.div`
  position: absolute;
  right: ${props => props.theme.mapActionPadding};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  z-index: 10;
  width: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ZoomButton = styled.div`
  ${props => props.theme.buttonBase};
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: center;
  align-items: center;
  padding: 8px;
  :not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.lightGreyColor} !important;
  }
`;

const ZoomIcon = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  text-align: center;
  display: block;
  width: 100%;
`;

// const BottomLeft = styled.div`
//   position: absolute;
//   bottom: ${props => props.theme.mapActionPadding};
//   left: ${props => props.theme.mapActionPadding};
//   z-index: 10;
// `;

const MeInfo = styled.span`
  text-shadow: 0.5px 0.5px 0.5px gray;
  :not(:last-child) {
    padding-bottom: 2px;
  }
`;

const DetailInfoBox = styled.div``;

type Props = {
  geoGranted: boolean;
  hasItem: boolean;
  loading: boolean;
  selectedStore?: IStore;
  detailDialogOpen?: boolean;
  openListDialog: () => void;
  moveToCurrentLocation: () => void;
  isCurrentLocation?: boolean;
  changeZoom: (direction: boolean) => void;
};

export default ({
  geoGranted,
  selectedStore,
  detailDialogOpen = false,
  openListDialog,
  loading,
  hasItem,
  changeZoom,
  moveToCurrentLocation,
  isCurrentLocation = false
}: Props) => {
  return (
    <>
      {geoGranted && (
        <RightSideButtons>
          <IconButton onClick={moveToCurrentLocation} data-focused={isCurrentLocation}>
            <Location size={24} />
          </IconButton>
        </RightSideButtons>
      )}
      <BottomSign>
        <MeInfo>김종현</MeInfo>
        <MeInfo>jongkoo25@gmail.com</MeInfo>
      </BottomSign>

      <ZoomBox>
        <ZoomButton onClick={() => changeZoom(true)}>
          <ZoomIcon>
            <Plus size={16} />
          </ZoomIcon>
        </ZoomButton>
        <ZoomButton onClick={() => changeZoom(false)}>
          <ZoomIcon>
            <Minus size={16} />
          </ZoomIcon>
        </ZoomButton>
      </ZoomBox>

      {!loading && (
        <BottomSideButtons>
          <ListViewButton data-mobile={hasItem} onClick={openListDialog}>
            <ButtonText>{hasItem ? "목록 보기" : "지도를 움직여보세요"}</ButtonText>
            {hasItem && isMobile && <UpArrow size={12} />}
          </ListViewButton>
          {selectedStore && detailDialogOpen && <DetailInfoBox />}
        </BottomSideButtons>
      )}
      {loading && (
        <LoaderBox>
          <Loader size={40} />
        </LoaderBox>
      )}
    </>
  );
};
