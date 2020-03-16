import React from "react";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import { isMobile } from "react-device-detect";
import styled from "../../Styles/index";
import MuiDialogTitle from "../MuiDialogTitle";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import DialogContent from "../MuiDialogContent";
import AutoSize from "react-virtualized-auto-sizer";
import { DialogActions, Button, TextField } from "@material-ui/core";
import { BookmarkData } from "../../utils/bookmark";
import { Edit, Delete, Undo } from "../../Icons";

type ContainerProps = {
  "data-delete"?: boolean;
};

const ListItemContainer = styled.div<ContainerProps>`
  padding: 8px 0px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
  color: ${props => (props["data-delete"] ? props.theme.redColor : "black")};
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

const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Text = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

const FormBox = styled.div`
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  form {
    height: 100%;
    width: 100%;
  }
`;

const ImageMap = styled.div`
  height: 100%;
  width: 100%;
`;

const DialogTitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const DialogTitleMain = styled.span`
  font-weight: 600;
  font-size: 16px;
  padding-bottom: 4px;
`;

const DialogTitleSub = styled.span`
  font-size: 12px;
`;

const EmptyTextBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActionIcon = styled.div`
  ${props => props.theme.buttonBase};
  background-color: ${props => props.theme.lightGreyColor};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  :not(:last-child) {
    margin-right: 8px;
  }
`;

const Actions = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 10;
  svg {
    fill: ${props => props.theme.blackColor};
  }
`;

type Props = {
  bookmarks: BookmarkData[];
  handleItemClickWithClose: (bookmark: BookmarkData) => void;
  handleClose: () => void;
  editOpen: boolean;
  setEditOpen: (value: boolean) => void;
  setName: (name: string) => void;
  name: string;
  handleAddBookmark: () => void;
  currentAddress: string;
  open: boolean;
  editEnable: boolean;
  handleEditEnable: () => void;
  handleEditDisable: () => void;
  handleEditStart: (bookmark: BookmarkData) => void;
  handleCloseEdit: () => void;
  handleDeleteTarget: () => void;
  handleDeleteTargetChange: (bookmark?: BookmarkData) => void;
  deleteTarget?: BookmarkData;
};

export default ({
  bookmarks,
  name,
  handleItemClickWithClose,
  handleClose,
  setName,
  setEditOpen,
  editOpen,
  handleAddBookmark,
  currentAddress,
  open,
  editEnable,
  handleEditEnable,
  handleEditDisable,
  handleEditStart,
  handleCloseEdit,
  handleDeleteTargetChange,
  handleDeleteTarget,
  deleteTarget
}: Props) => {
  const closeAll = () => {
    handleCloseEdit();
    handleClose();
  };

  const RowItem = ({ index, style }: ListChildComponentProps) => {
    const bookmark = bookmarks[index];
    const isDeleteTarget = deleteTarget?.id === bookmark.id;
    return (
      <ListItem
        style={style}
        button={!editEnable as true}
        key={index}
        onClick={() => (editEnable ? null : handleItemClickWithClose(bookmark))}
        divider
      >
        <ListItemContainer data-delete={isDeleteTarget}>
          <Cols>
            {!isDeleteTarget && (
              <>
                <Row>
                  <TitleBox>
                    <Title>{bookmark.name}</Title>
                  </TitleBox>
                </Row>
                <Row>
                  <Text>{bookmark.address}</Text>
                </Row>
              </>
            )}
            {isDeleteTarget && (
              <Row>
                <TitleBox>
                  <Title>{`"${bookmark.name}"를 지우시겠습니까?`}</Title>
                </TitleBox>
              </Row>
            )}
          </Cols>
          {isDeleteTarget && (
            <Actions>
              <ActionIcon onClick={() => handleDeleteTargetChange(undefined)}>
                <Undo size={16} />
              </ActionIcon>
              <ActionIcon onClick={() => handleDeleteTarget()}>
                <Delete size={16} />
              </ActionIcon>
            </Actions>
          )}
          {!isDeleteTarget && editEnable && (
            <Actions>
              <ActionIcon
                onClick={e => {
                  e.stopPropagation();
                  handleEditStart(bookmark);
                }}
              >
                <Edit size={16} />
              </ActionIcon>
              <ActionIcon onClick={() => handleDeleteTargetChange(bookmark)}>
                <Delete size={16} />
              </ActionIcon>
            </Actions>
          )}
        </ListItemContainer>
      </ListItem>
    );
  };

  return (
    <Dialog fullScreen={isMobile} fullWidth maxWidth={"sm"} open={open} onClose={closeAll}>
      <FormContainer>
        <MuiDialogTitle id="customized-dialog-title" onClose={closeAll}>
          <DialogTitleBox>
            <DialogTitleMain>저장된 장소</DialogTitleMain>
            <DialogTitleSub>인터넷 쿠키를 삭제시 초기화됩니다</DialogTitleSub>
          </DialogTitleBox>
        </MuiDialogTitle>
        <DialogContent
          dividers
          style={{
            padding: 0,
            flex: "1 1 auto",
            height: !isMobile ? "50vh" : "100%",
            overflow: "hidden"
          }}
        >
          <ContentContainer>
            {!editOpen && bookmarks.length > 0 && (
              <AutoSize defaultHeight={100}>
                {({ height, width }) => (
                  <FixedSizeList
                    height={height}
                    width={width}
                    itemSize={60}
                    itemCount={bookmarks.length}
                  >
                    {RowItem}
                  </FixedSizeList>
                )}
              </AutoSize>
            )}
            {editOpen && (
              <FormBox>
                <Row>
                  <TextField
                    autoFocus
                    placeholder="장소 이름"
                    fullWidth
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Row>
                <Row>
                  <Text>{currentAddress}</Text>
                </Row>
                <Row></Row>
                <ImageMap id="static_map" />
              </FormBox>
            )}
            {bookmarks.length === 0 && <EmptyTextBox>새로운 장소를 저장해보세요</EmptyTextBox>}
          </ContentContainer>
        </DialogContent>
        <DialogActions>
          {editEnable && !editOpen && (
            <>
              <Button color="primary" variant="outlined" onClick={handleEditDisable}>
                수정 완료
              </Button>
            </>
          )}
          {!editEnable && !editOpen && (
            <>
              {bookmarks.length > 0 && (
                <Button color="primary" variant="outlined" onClick={handleEditEnable}>
                  수정
                </Button>
              )}
              <Button color="primary" variant="outlined" onClick={() => setEditOpen(true)}>
                현재 장소 저장
              </Button>
            </>
          )}
          {editOpen && (
            <>
              <Button color="secondary" type="reset" variant="outlined" onClick={handleCloseEdit}>
                취소
              </Button>
              <Button
                color="primary"
                type="submit"
                variant="outlined"
                onClick={() => handleAddBookmark()}
              >
                저장
              </Button>
            </>
          )}
        </DialogActions>
      </FormContainer>
    </Dialog>
  );
};
