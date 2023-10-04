import React from "react";
import useStyles from "./styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStore from "../Zustand/zustand";
const AppBarComponent = () => {
  const classes = useStyles();
  const { logout } = useStore();

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.appBar}>
        <Link to="/" className={classes.logo}>
          MeetEase
        </Link>
        <div>
          <Link
            className={classes.logoutBtn}
            onClick={() => {
              logout();
            }}
          >
            Sign out
          </Link>
          <Link to="/dashboard" className={classes.profileBtn}>
            Dashboard
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
