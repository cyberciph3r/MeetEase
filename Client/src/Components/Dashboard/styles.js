import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    height: "100vh",
    width: "100%",
    background: "linear-gradient(90deg,#FF416C,#FF4B2B)",
    flexDirection: "column",
    padding: "4rem",
    paddingTop: "5rem",
    boxSizing: "border-box",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      padding: "2rem",
      paddingTop: "5rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
      paddingTop: "4rem",
    },
  },
  meetingCard: {
    width: "80vw",
    backgroundColor: "black",
    color: "white",
    padding: "1rem",
    marginTop: "1rem",
    borderRadius: "5px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.5)",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem",
      width: "95%",
    },
  },
  meetingName: {
    fontSize: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      marginBottom: "0.5rem",
    },
  },
  meetingDsc: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "start",
    },
  },
  typography: {
    padding: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0.3rem",
      fontSize: "0.8rem",
    },
  },
  span: {
    color: "greenyellow",
  },
  icons: {
    marginLeft: "auto",
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
    },
  },
  shrMeeting: {
    backgroundColor: "red",
    padding: "0.5rem",
    margin: "0.5rem",
    borderRadius: "50%",
    cursor: "pointer",
    "&:hover": {
      borderRadius: "40%",
    },
  },
  editMeetingsLink: {
    textDecoration: "none",
    color: "white",
  },
  editMeeting: {
    backgroundColor: "blue",
    padding: "0.5rem",
    margin: "0.5rem",
    borderRadius: "50px",
    cursor: "pointer",
    "&:hover": {
      borderRadius: "40%",
    },
  },
  dltMeeting: {
    backgroundColor: "green",
    padding: "0.5rem",
    margin: "0.5rem",
    borderRadius: "50px",
    cursor: "pointer",
    "&:hover": {
      borderRadius: "40%",
    },
  },
  title: {
    color: "white",
    fontSize: "4rem",
    fontWeight: "bolder",
    fontFamily: "Poppins",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  createLink: {
    backgroundColor: "black",
    color: "white",
    textTransform: "none",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "bolder",
    letterSpacing: "2px",
    transition: "0.3s",
    padding: "0.5rem",
    borderRadius: "50px",
    "&:hover": {
      background: "white",
      color: "#FF464B",
    },
  },
}));

export default useStyles;
