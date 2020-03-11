import React from "react";
import { createStyles, Theme, WithStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      margin: 0,
      padding: theme.spacing(1.5, 2),
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

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="body1">{children}</Typography>
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

export default DialogTitle;
