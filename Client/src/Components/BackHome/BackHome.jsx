import React from "react";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const BackHome = () => {
  const classes = useStyles();
  return (
    <div className={classes.oops}>
      <Typography className={classes.title}>
        Oops! Looks like you're not signed in.
      </Typography>
      <Typography className={classes.subTitle}>
        Please go back
        <Link to="/" className={classes.btn}>
          Home
        </Link>
        to sign in.
      </Typography>
    </div>
  );
};

export default BackHome;
