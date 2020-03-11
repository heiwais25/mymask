import React from "react";
import styled from "../Styles/index";
import { Location, UpArrow } from "../Icons";
import { IStore } from "../hooks/useFetchStores";
import Loader from "./Loader";

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
  bottom: ${props => props.theme.mapActionPadding};
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  svg {
    margin-left: 8px;
  }
`;

type ListViewButtonProps = {
  "data-disabled"?: boolean;
};

const ListViewButton = styled.div<ListViewButtonProps>`
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  padding: 8px 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
`;

const ButtonText = styled.span``;

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

const MeInfo = styled.span`
  text-shadow: 0.5px 0.5px 0.5px gray;
  :not(:last-child) {
    padding-bottom: 2px;
  }
`;

const DetailInfoBox = styled.div``;

type Props = {
  hasItem: boolean;
  loading: boolean;
  selectedStore?: IStore;
  detailDialogOpen?: boolean;
  openListDialog: () => void;
  moveToCurrentLocation: () => void;
  isCurrentLocation?: boolean;
};

export default ({
  selectedStore,
  detailDialogOpen = false,
  openListDialog,
  loading,
  hasItem,
  moveToCurrentLocation,
  isCurrentLocation = false
}: Props) => {
  return (
    <>
      <RightSideButtons>
        <IconButton onClick={moveToCurrentLocation} data-focused={isCurrentLocation}>
          <Location size={24} />
        </IconButton>
      </RightSideButtons>
      <BottomSign>
        <MeInfo>김종현</MeInfo>
        <MeInfo>jongkoo25@gmail.com</MeInfo>
      </BottomSign>
      {!loading && (
        <BottomSideButtons>
          <ListViewButton onClick={openListDialog}>
            <ButtonText>{hasItem ? "목록 보기" : "지도를 움직여보세요"}</ButtonText>
            {hasItem && <UpArrow size={12} />}
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
