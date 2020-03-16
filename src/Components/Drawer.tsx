import React from "react";
import styled from "../Styles/index";
import { version, NOTICE_DIALOG } from "../constants";
import { Notice, Mail } from "../Icons";
import { Divider, SwipeableDrawer, ListItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  :not(:last-child) {
    padding-bottom: 8px;
  }

  svg {
    fill: ${props => props.theme.darkGreyColor};
  }
`;

const Rows = styled.div`
  padding-bottom: 8px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
  height: 55px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  padding-bottom: 4px;
`;

const Meta = styled.span`
  color: ${props => props.theme.darkGreyColor};
  font-size: 12px;
`;

const RowItem = styled.div`
  padding: 0px 10px;
  display: flex;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 8px;
`;

const Text = styled.span``;

type Props = {
  open: boolean;
  setDrawerOpen: (state: boolean) => void;
};

export default ({ open, setDrawerOpen }: Props) => {
  const history = useHistory();
  const sendMail = () => {
    window.open(
      "mailto:jongkoo25@gmail.com?subject=제안합니다&body=아무거나 생각나는대로 다 제안해주세요!<br/>더 좋은 서비스로 보답하겠습니다. 감사합니다"
    );
    setDrawerOpen(false);
  };

  const openNotice = () => {
    history.push({ hash: NOTICE_DIALOG });
    setDrawerOpen(false);
  };

  return (
    <SwipeableDrawer
      open={open}
      onClose={() => setDrawerOpen(false)}
      onOpen={() => setDrawerOpen(true)}
    >
      <Container>
        <Rows>
          <Row>
            <TitleBox>
              <Title>마이마스크</Title>
              <Meta>{version}</Meta>
            </TitleBox>
            <Divider />
          </Row>
          <Row>
            <ListItem button disableGutters onClick={openNotice}>
              <RowItem>
                <IconBox>
                  <Notice size={20} />
                </IconBox>
                <Text>공지사항</Text>
              </RowItem>
            </ListItem>
          </Row>
        </Rows>
        <Rows>
          <Row>
            <ListItem button disableGutters onClick={sendMail}>
              <RowItem>
                <IconBox>
                  <Mail size={20} />
                </IconBox>
                <Text>제안하기</Text>
              </RowItem>
            </ListItem>
          </Row>
        </Rows>
      </Container>
    </SwipeableDrawer>
  );
};
