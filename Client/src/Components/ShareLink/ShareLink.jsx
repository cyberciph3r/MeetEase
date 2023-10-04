import React from "react";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const ShareLink = ({ meetingid, meetingDuration, schedulerView }) => {
  const classes = useStyles();
  const alert = useAlert();
  const url = `http://localhost:5173/join/${meetingid}/${schedulerView}/${meetingDuration}`;
  return (
    <div className={classes.main}>
      <Typography className={classes.title}>
        Meeting created! You can share the below link with your users
      </Typography>
      <div className={classes.linkDiv}>
        <Typography className={classes.copyFld}>{url}</Typography>
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
        <Typography className={classes.bthText}>Back to Home</Typography>
      </Link>
    </div>
  );
};

export default ShareLink;
