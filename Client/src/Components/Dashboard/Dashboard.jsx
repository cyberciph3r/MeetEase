import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStore from "../Zustand/zustand";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShareIcon from "@mui/icons-material/Share";
import BackHome from "../BackHome/BackHome";
import AppBarComponent from "../AppBar/AppBarComponent";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAlert } from "react-alert";

const Dashboard = () => {
  const classes = useStyles();
  const { user } = useStore();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const alert = useAlert();

  useEffect(() => {
    const getMeetingsData = async () => {
      try {
        var response = await fetch(
          "https://meetease-571g.onrender.com/get-meetings-data",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_email: user.email,
            }),
          }
        );

        try {
          var data = await response.json();
          setMeetings(data);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log("Error:", error);
      }

      setLoading(false);
    };
    getMeetingsData();
  }, [meetings]);

  const handleDeleteMeeting = async (mid) => {
    await fetch("https://meetease-571g.onrender.com/delete-meeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meeting_id: mid,
      }),
    });
  };

  if (user == null) {
    return <BackHome />;
  }

  if (loading) {
    return (
      <div className={classes.main}>
        <Typography className={classes.title}>Loading...</Typography>
      </div>
    );
  }
  return (
    <>
      <AppBarComponent />
      <div className={classes.main}>
        <Typography className={classes.title}>
          {meetings.length == 0 ? "No Meetings Found!" : "My Meetings"}
        </Typography>
        {meetings.map((meeting) => {
          return (
            <div className={classes.meetingCard}>
              <Typography className={classes.meetingName}>
                {meeting["meeting_name"]}
              </Typography>
              <div className={classes.meetingDsc}>
                <Typography className={classes.typography}>
                  ID: <span className={classes.span}>{meeting["mid"]}</span>
                </Typography>
                <Typography className={classes.typography}>
                  Date created:{" "}
                  <span className={classes.span}>
                    {meeting["date_created"].toUpperCase()}
                  </span>
                </Typography>
                <div className={classes.icons}>
                  <CopyToClipboard
                    text={`https://meetease.netlify.app/join/${meeting["mid"]}`}
                  >
                    <ShareIcon
                      className={classes.shrMeeting}
                      onClick={() => {
                        alert.success("Link copied!");
                      }}
                      style={{
                        width: "1rem",
                        height: "1rem",
                      }}
                    />
                  </CopyToClipboard>

                  <Link
                    className={classes.editMeetingsLink}
                    to={`https://meetease.netlify.app/editMeeting/${meeting["mid"]}`}
                  >
                    <EditNoteIcon
                      className={classes.editMeeting}
                      style={{
                        width: "1rem",
                        height: "1rem",
                      }}
                    />
                  </Link>
                  <DeleteForeverIcon
                    onClick={() => {
                      var res = window.confirm(
                        "Do you really want to delete the meeting?"
                      );
                      if (res) {
                        handleDeleteMeeting(meeting["mid"]);
                        alert.success("Meeting Deleted!");
                      }
                    }}
                    className={classes.dltMeeting}
                    style={{
                      width: "1rem",
                      height: "1rem",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
