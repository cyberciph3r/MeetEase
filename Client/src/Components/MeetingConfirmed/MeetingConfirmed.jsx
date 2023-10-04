import React from "react";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";

const MeetingConfirmed = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Typography className={classes.title}>Your meeting is booked!</Typography>
      <Typography className={classes.subtitle}>
        We've sent you an email confirmation with all the details. Have a great
        day!
      </Typography>
    </div>
  );
};

export default MeetingConfirmed;
