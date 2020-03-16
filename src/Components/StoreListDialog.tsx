import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import { isMobile } from "react-device-detect";
import styled from "../Styles/index";
import MuiDialogTitle from "../Components/MuiDialogTitle";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import DialogContent from "./MuiDialogContent";
import AutoSize from "react-virtualized-auto-sizer";
import { useLocation, useHistory } from "react-router-dom";
import { IStore, IRemainStat } from "../hooks/useFetchStores";
import { STORE_LIST_DIALOG, statusString } from "../constants";

const ListItemContainer = styled.div`
  padding: 8px 0px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;

const Cols = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  :not(:last-child) {
    padding-right: 16px;
  }
`;

const Row = styled.div`
  :not(:last-child) {
    padding-bottom: 8px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 16px;
  padding-right: 8px;
`;

type StatusProps = {
  "data-stat": IRemainStat;
};

const Status = styled.div<StatusProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;

  display: flex;
  align-items: center;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${props =>
    props["data-stat"] === "plenty"
      ? props.theme.greenColor
      : props["data-stat"] === "some"
      ? props.theme.yellowColor
      : props["data-stat"] === "few"
      ? props.theme.redColor
      : props.theme.greyColor};
`;

const Text = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

const FakeBox = styled.div`
  width: 60px;
`;

const Meta = styled.span``;

type Props = {
  stores: IStore[];
  handleItemClick: (store: IStore) => void;
};

export default ({ stores, handleItemClick }: Props) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [visibleStores, setVisibleStores] = useState<IStore[]>([]);
  useEffect(() => {
    if (location.hash === STORE_LIST_DIALOG) {
      if (stores.length > 0) {
        setOpen(true);
        setVisibleStores(stores.sort((a, b) => a.distance - b.distance));
      } else {
        history.replace({ hash: "" });
      }
    } else {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash, stores]);

  const handleClose = () => {
    history.goBack();
  };

  const RowItem = ({ index, style }: ListChildComponentProps) => {
    const store = visibleStores[index];
    return (
      <ListItem
        style={style}
        button
        key={store.code}
        onClick={() => handleItemClick(store)}
        divider
      >
        <ListItemContainer>
          <Cols>
            <Row>
              <TitleBox>
                <Title>{store.name}</Title>
                {store.distance >= 0 && <Meta>{`${store.distance}m`}</Meta>}
              </TitleBox>
            </Row>
            <Row>
              <Text>{store.addr}</Text>
            </Row>
          </Cols>
          <Cols>
            <Row>
              <FakeBox />
            </Row>
          </Cols>
          <Status data-stat={store.remain_stat}>{statusString[store.remain_stat]}</Status>
        </ListItemContainer>
      </ListItem>
    );
  };

  return (
    <Dialog fullScreen={isMobile} fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <MuiDialogTitle id="customized-dialog-title" onClose={handleClose}>
        주변 목록
      </MuiDialogTitle>
      <DialogContent
        dividers
        style={{
          padding: 0,
          flex: "1 1 auto",
          height: "50vh",
          overflow: "hidden"
        }}
      >
        <AutoSize defaultHeight={100}>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={60}
              itemCount={visibleStores.length}
            >
              {RowItem}
            </FixedSizeList>
          )}
        </AutoSize>
      </DialogContent>
    </Dialog>
  );
};
