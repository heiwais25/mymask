import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import { isMobile } from "react-device-detect";
import styled from "../Styles/index";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import DialogContent from "./MuiDialogContent";
import AutoSize from "react-virtualized-auto-sizer";
import { useLocation, useHistory } from "react-router-dom";
import { SEARCH_DIALOG } from "../constants";
import SearchTitle from "./SearchTitle";
import { IPlace, IDocument, ILatLng } from "./KakaoMap/types";
import { FormEvent } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { searchPlacesAPI } from "../search";
import Loader from "./Loader";

const ListItemContainer = styled.div`
  padding: 8px 0px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Cols = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: keep-all;
  :not(:last-child) {
    padding-right: 16px;
  }
`;

const Row = styled.div`
  :not(:last-child) {
    padding-bottom: 4px;
  }
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 4px;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 16px;
  padding-right: 8px;
`;

const Text = styled.span``;

const Address = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.theme.darkGreyColor};
`;

const Meta = styled.span`
  color: ${props => props.theme.greyColor};
  font-size: 14px;
`;

const StatusBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const searchAPIDebounced = AwesomeDebouncePromise(searchPlacesAPI, 1000);

type Props = {
  handleItemClick: (latLng: ILatLng) => void;
};

export default ({ handleItemClick }: Props) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<IDocument[]>([]);
  const [placeSearchService, setPlaceSearchService] = useState<IPlace>();

  const handleItemClickWithClose = (latLng: ILatLng) => {
    handleClose();
    handleItemClick(latLng);
  };

  useEffect(() => {
    const placeSearchService = new window.kakao.maps.services.Places();
    setPlaceSearchService(placeSearchService);
  }, []);

  const handleSearchChange = async (e: FormEvent<HTMLInputElement>) => {
    // setSearch(e.currentTarget.value);
    try {
      setLoading(true);
      if (e.currentTarget.value && placeSearchService) {
        const result = await searchAPIDebounced(placeSearchService, e.currentTarget.value);
        setSearchResults(result);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.hash === SEARCH_DIALOG) {
      setOpen(true);
    } else {
      setOpen(false);
      setSearchResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  const handleClose = () => {
    history.goBack();
  };

  const RowItem = ({ index, style }: ListChildComponentProps) => {
    const document = searchResults[index];
    return (
      <ListItem
        style={style}
        button
        divider
        onClick={() =>
          handleItemClickWithClose(
            new window.kakao.maps.LatLng(Number(document.y), Number(document.x))
          )
        }
      >
        <ListItemContainer>
          <Cols>
            <Row>
              <TitleBox>
                <Title>{document.place_name}</Title>
                <Meta>{`${document.category_group_name}`}</Meta>
              </TitleBox>
            </Row>
            <Row>
              <Address>{document.address_name}</Address>
            </Row>
          </Cols>
        </ListItemContainer>
      </ListItem>
    );
  };

  return (
    <Dialog fullScreen={isMobile} fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <SearchTitle
        id="customized-dialog-title"
        onClose={handleClose}
        // value={search}
        onChange={handleSearchChange}
      >
        주변 목록
      </SearchTitle>
      <DialogContent
        dividers
        style={{
          padding: 0,
          flex: "1 1 auto",
          height: "50vh",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <AutoSize defaultHeight={100}>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={60}
              itemCount={searchResults.length}
            >
              {RowItem}
            </FixedSizeList>
          )}
        </AutoSize>
        {!loading && searchResults.length === 0 && (
          <StatusBox>검색어에 해당하는 결과가 없습니다</StatusBox>
        )}
        {loading && searchResults.length === 0 && (
          <StatusBox>
            <Loader size={48} />
          </StatusBox>
        )}
      </DialogContent>
    </Dialog>
  );
};
