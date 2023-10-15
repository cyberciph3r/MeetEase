import React from "react";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";

const NotFound404 = () => {
  const classes = useStyles();
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
