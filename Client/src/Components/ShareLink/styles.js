import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    height: "100vh",
    width: "100%",
    background: "linear-gradient(90deg,#FF416C,#FF4B2B)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
    },
  },
  title: {
    color: "white",
    fontSize: "2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  linkDiv: {
    display: "flex",
    gap: "1rem",
  },
  copyFld: {
    backgroundColor: "white",
    color: "black",
    padding: "0.5rem",
    borderRadius: "5px",
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  copyBtn: {
    backgroundColor: "black",
    color: "white",
    cursor: "pointer",
    border: "none",
    padding: "0.5rem",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  bth: {
    textDecoration: "none",
    backgroundColor: "black",
    color: "white",
    transition: "0.3s",
    borderRadius: "50px",
    margin: "1rem",
    padding: "0.5rem",
    cursor: "pointer",
    border: "none",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "white",
      color: "#FF464B",
    },
  },
  bthText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
}));

export default useStyles;
