import React from "react";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const ShareLink = ({ meetingid }) => {
  const classes = useStyles();
  const alert = useAlert();
  const url = `${import.meta.env.VITE_FRONTEND_URL}/join/${meetingid}`;
  return (
    <div className={classes.main}>
      <Typography className={classes.title}>
        Your meeting is ready to share!
      </Typography>
      <Typography className={classes.subtitle}>
        Paste this link in a message to invite them to pick times.
      </Typography>
      <div className={classes.linkDiv}>
        <input className={classes.txtFld} value={url} readOnly />
        <CopyToClipboard text={url}>
          <ContentCopyIcon
            className={classes.copyBtn}
            onClick={() => {
              alert.success("Copied");
            }}
          />
        </CopyToClipboard>
      </div>
      <Link to="/" className={classes.bth}>
        <Typography className={classes.bthText}>Home</Typography>
      </Link>
    </div>
  );
};

export default ShareLink;
