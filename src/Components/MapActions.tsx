import React from "react";
import styled from "../Styles/index";
import { Location, UpArrow } from "../Icons";
import { IStore, IRemainStat } from "../hooks/useFetchStores";
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

const TopFilterButtonsBox = styled.div`
  display: flex;
  position: absolute;
  top: ${props => props.theme.mapActionPadding};
  left: ${props => props.theme.mapActionPadding};
  z-index: 10;
`;

const MarkerIcon = styled.div`
  background: url("/images/marker-red.png") no-repeat;
  background-size: cover;
  width: 14px;
  height: 20px;
`;

const GreenIcon = styled(MarkerIcon)`
  background: url("/images/marker-green.png") no-repeat;
  background-size: cover;
`;

const RedIcon = styled(MarkerIcon)`
  background: url("/images/marker-red.png") no-repeat;
  background-size: cover;
`;

const YellowIcon = styled(MarkerIcon)`
  background: url("/images/marker-yellow.png") no-repeat;
  background-size: cover;
`;

const GreyIcon = styled(MarkerIcon)`
  background: url("/images/marker-grey.png") no-repeat;
  background-size: cover;
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

type FilterButtonProps = {
  "data-focused"?: boolean;
};

const FilterButton = styled.div<FilterButtonProps>`
  ${props => props.theme.unselectableText}
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 4px 4px;
  color: ${props => (props["data-focused"] ? "white" : "black")};
  background: linear-gradient(
    90deg,
    white,
    white 35%,
    ${props => (props["data-focused"] ? props.theme.blueColor : "white")} 35%
  );
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  :not(:last-child) {
    margin-right: ${props => props.theme.mapActionPadding};
  }

  /* width: 60px; */
  /* height: 40px; */
`;

const FilterText = styled.span`
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  padding-left: 8px;
  padding-right: 4px;
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
  filterButtonState: { [key in IRemainStat]: boolean };
  toggleFilter: (key: IRemainStat) => void;
};

export default ({
  selectedStore,
  detailDialogOpen = false,
  openListDialog,
  loading,
  hasItem,
  moveToCurrentLocation,
  filterButtonState,
  toggleFilter,
  isCurrentLocation = false
}: Props) => {
  return (
    <>
      <TopFilterButtonsBox>
        <FilterButton
          onClick={loading ? () => null : () => toggleFilter("plenty")}
          data-focused={filterButtonState.plenty}
        >
          <GreenIcon />
          <FilterText>충분</FilterText>
        </FilterButton>
        <FilterButton
          onClick={loading ? () => null : () => toggleFilter("some")}
          data-focused={filterButtonState.some}
        >
          <YellowIcon />
          <FilterText>보통</FilterText>
        </FilterButton>
        <FilterButton
          onClick={loading ? () => null : () => toggleFilter("few")}
          data-focused={filterButtonState.few}
        >
          <RedIcon />
          <FilterText>부족</FilterText>
        </FilterButton>
        <FilterButton
          onClick={loading ? () => null : () => toggleFilter("empty")}
          data-focused={filterButtonState.empty}
        >
          <GreyIcon />
          <FilterText>없음</FilterText>
        </FilterButton>
      </TopFilterButtonsBox>
      <RightSideButtons>
        <IconButton
          onClick={moveToCurrentLocation}
          data-focused={isCurrentLocation}
        >
          <Location size={24} />
        </IconButton>
        {/* <IconButton>
          <Filter size={20} />
        </IconButton> */}
      </RightSideButtons>
      <BottomSign>
        <MeInfo>김종현</MeInfo>
        <MeInfo>jongkoo25@gmail.com</MeInfo>
      </BottomSign>
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
