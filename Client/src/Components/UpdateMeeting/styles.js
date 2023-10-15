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
    padding: "1rem",
    color: "white",
  },
  title: {
    fontSize: "2rem",
  },
  txtFld: {
    margin: "1rem",
    backgroundColor: "white",
    outline: "none",
    border: "none",
    borderRadius: "5px",
    padding: "1rem",
    fontSize: "1.2rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0.8rem",
      fontSize: "0.8rem",
    },
  },
  btnsDiv: {
    display: "flex",
  },
  cnlLink: {
    textDecoration: "none",
    color: "red",
    backgroundColor: "black",
    borderRadius: "50px",
    transition: "0.3s",
    margin: "1rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  svLink: {
    textDecoration: "none",
    color: "greenyellow",
    backgroundColor: "black",
    borderRadius: "50px",
    transition: "0.3s",
    margin: "1rem",
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  },
}));

export default useStyles;
