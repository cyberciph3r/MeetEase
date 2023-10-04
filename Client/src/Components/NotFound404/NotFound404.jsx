import React from "react";
import useStyles from "./styles";
import { Button, Typography } from "@material-ui/core";

const NotFound404 = ({ meetingid }) => {
  const classes = useStyles();
  const url = "http://localhost:5173/join/" + meetingid;
  return (
    <div className={classes.main}>
      <Typography className={classes.title}>404</Typography>
      <Typography className={classes.subtitle}>
        The page you're looking for doesn't exist.
      </Typography>
    </div>
  );
};

export default NotFound404;
