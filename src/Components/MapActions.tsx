import React from "react";
import styled from "../Styles/index";
import { Filter, Location, UpArrow } from "../Icons";
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
    fill: ${props =>
      props["data-focused"] ? "white !important" : props.theme.darkGreyColor};
  }
  ${props => props.theme.iconButton};

  background-color: ${props =>
    props["data-focused"] ? props.theme.blueColor : "white"};

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
`;

const ListViewButton = styled.div`
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  padding: 8px 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
`;

const ButtonText = styled.span`
  padding-right: 8px;
`;

const LoaderBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  /* transform: translate(-50%, -50%); */
  z-index: 1000;
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
        <IconButton
          onClick={moveToCurrentLocation}
          data-focused={isCurrentLocation}
        >
          <Location size={24} />
        </IconButton>
        <IconButton>
          <Filter size={20} />
        </IconButton>
      </RightSideButtons>
      {!loading && hasItem && (
        <BottomSideButtons>
          <ListViewButton onClick={openListDialog}>
            <ButtonText>목록 보기</ButtonText>
            <UpArrow size={12} />
          </ListViewButton>
          {selectedStore && detailDialogOpen && <DetailInfoBox></DetailInfoBox>}
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
