import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
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
  },
  saveBtn: {
    textDecoration: "none",
    backgroundColor: "black",
    color: "white",
    transition: "0.3s",
    borderRadius: "50px",
    padding: "0.4rem",
    margin: "0.5rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "white",
      color: "#FF464B",
    },
  },
}));

export default useStyles;
