import React, { useState } from "react";
import useStyles from "./styles";
import { Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import useStore from "../Zustand/zustand";

const Home = () => {
  const classes = useStyles();
  const { user, login, logout } = useStore();

  const handleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      var code = codeResponse.code;
      var response = await fetch("https://meetease.onrender.com/create-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
        }),
      });

      try {
        var data = await response.json();
        login(data);
      } catch (error) {
        console.log(error);
      }
    },
    flow: "auth-code",
    scope: "openid email profile https://www.googleapis.com/auth/calendar",
  });

  return (
    <div className={classes.main}>
      <>
        {user != null && (
          <Toolbar className={classes.appBar}>
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
          </Toolbar>
        )}
      </>

      <Typography className={classes.title}>MeetEase</Typography>
      <Typography className={classes.subtitle}>
        Effortless Scheduling for Perfect Meetings
      </Typography>
      <div>
        {user != null ? (
          <Link to="/create" className={classes.createLink}>
            + Create
          </Link>
        ) : (
          <>
            <GoogleButton type="dark" onClick={() => handleLogin()} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
