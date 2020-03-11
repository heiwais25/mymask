import React from "react";
import { createStyles, Theme, WithStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { Finder } from "../Icons";
import Input from "./Input";
import { FormEvent } from "react";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      margin: 0,
      padding: theme.spacing(1.5),
      backgroundColor: "#2980b9",
      color: "white",
      height: "55px",
      alignItems: "center",
      justifyContent: "space-between"
    },
    closeButton: {
      color: "white"
    }
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const IconButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
  border-radius: 50%;
  padding: 6px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled(Input)`
  background-color: transparent;
  outline: 0;
  border-width: 0 0 1px;
  border-color: white;
  color: white;
  padding: 0;
  margin: 0px 4px;
  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  font-size: 14px;
  width: 100%;
`;

type Props = {
  value?: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
};

const SearchTitle = withStyles(styles)((props: DialogTitleProps & Props) => {
  const { classes, onClose, value, onChange, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <SearchContainer>
        <SearchInput placeholder="장소, 주소, 지명 등을 입력하세요" onChange={onChange} />
        <IconButtonBox>
          <Finder size={20} />
        </IconButtonBox>
      </SearchContainer>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default SearchTitle;
