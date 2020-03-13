import React from "react";
import { Theme, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "../Components/MuiDialogTitle";
import styled from "../Styles/index";

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

type Props = {
  open: boolean;
  handleClose: () => void;
};

const BottomIcons = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 8px;
  font-size: 12px;
  padding: 8px;
  margin: 8px 0px;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  background: url("/images/marker-red.png") no-repeat;
  background-size: cover;
  width: 21px;
  height: 30px;
  margin-bottom: 8px;
`;

const GreenIcon = styled(Icon)`
  background: url("/images/marker-green.png") no-repeat;
  background-size: cover;
`;

const RedIcon = styled(Icon)`
  background: url("/images/marker-red.png") no-repeat;
  background-size: cover;
`;

const YellowIcon = styled(Icon)`
  background: url("/images/marker-yellow.png") no-repeat;
  background-size: cover;
`;

const GreyIcon = styled(Icon)`
  background: url("/images/marker-grey.png") no-repeat;
  background-size: cover;
`;

const IconText = styled.div``;

const RedText = styled.span`
  color: ${props => props.theme.redColor};
`;
export default function LandingDialog({ open, handleClose }: Props) {
  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <MuiDialogTitle id="customized-dialog-title" onClose={handleClose}>
        알림
      </MuiDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom variant="body2">
          서비 이용에 불편을 드려 죄송합니다. 본 서비스는 정부 공공 마스크 재고 정보 API를 이용하고
          있습니다. 현재 약국, 우체국
        </Typography>
        <Typography gutterBottom variant="body2">
          빠른 시일 내에 알림 추가, 어플리케이션이 제작될 예정입니다. 더 좋은 서비스를 제공하기 위해
          노력하겠습니다.
        </Typography>
        <Typography gutterBottom variant="body2">
          약사 분들을 포함하여 마스크로 인해 고생하시는 분들께 감사의 인사 한번씩 해주시면 좋을 것
          같습니다.{" "}
          <span role="img" aria-label="smile">
            😃
          </span>
        </Typography>
        <Typography gutterBottom variant="body1" color="secondary">
          <RedText>업데이트</RedText>
        </Typography>
        <Typography variant="body2">
          1. 원하는 장소를 검색할 수 있는 기능이 추가되었습니다.
        </Typography>
        <Typography variant="body2">2. 필터 기능이 추가되었습니다.</Typography>
        <Typography variant="body2" gutterBottom>
          2. 전체 목록을 볼 수 있는 버튼이 추가되었습니다.
        </Typography>

        <Typography gutterBottom variant="body1" color="secondary">
          <RedText>유의사항</RedText>
        </Typography>
        <Typography variant="body2">1. 공적 마스크 정보는 5분 이상 지연된 정보입니다.</Typography>
        <Typography variant="body2">
          2. 3월 15일까지 정부 데이터 공개는 베타서비스 중으로 실수량과 일부 차이가 있을 수 있습니다
        </Typography>
        <Typography gutterBottom variant="body2">
          3. 마스크 재고는 구체적인 수치가 공개되지 않으며 다음 4개의 구간으로 나타납니다.
        </Typography>
        <BottomIcons>
          <IconBox>
            <GreyIcon />
            <IconText>0 ~ 1개</IconText>
          </IconBox>
          <IconBox>
            <YellowIcon />
            <IconText>2 ~ 29개</IconText>
          </IconBox>
          <IconBox>
            <RedIcon />
            <IconText>30 ~ 99개</IconText>
          </IconBox>
          <IconBox>
            <GreenIcon />
            <IconText>100개 이상</IconText>
          </IconBox>
        </BottomIcons>
        <Typography gutterBottom variant="body2">
          마이마스크 (My Mask)
        </Typography>
        <Typography gutterBottom variant="body2">
          개발자 : 김종현 (jongkoo25@gmail.com)
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
