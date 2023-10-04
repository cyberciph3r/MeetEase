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
    paddingTop: "0rem",
    color: "white",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "2rem",
    padding: "1rem",
    fontFamily: "Poppins",
    marginRight: "auto",
    [theme.breakpoints.down("xs")]: {
      padding: "0rem",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      fontSize: "1rem",
    },
  },
  txt: {
    fontFamily: "poppins",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },

  setDiv: {
    display: "flex",
    width: "90vw",
    justifyContent: "space-between",
  },
  setDivFlex: {
    display: "flex",
    alignItems: "center",
  },
  durationTextFld: {
    width: "10%",
    margin: "1rem",
    backgroundColor: "white",
    outline: "none",
    border: "none",
    borderRadius: "5px",
    padding: "1rem",
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      width: "35%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "7%",
      padding: "0.5rem",
      margin: "0.5rem",
      fontSize: "0.8rem",
    },
  },
  durationBtn: {
    backgroundColor: "black",
    color: "white",
    transition: "0.3s",
    borderRadius: "50px",
    padding: "0.6rem",
    border: "none",
    cursor: "pointer",
    fontFamily: "Montserrat",
    "&:hover": {
      backgroundColor: "white",
      color: "#FF464B",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.5rem",
    },
  },
  form: {
    paddingTop: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
  },
  txtFld: {
    width: "20rem",
    margin: "1rem",
    backgroundColor: "white",
    outline: "none",
    border: "none",
    borderRadius: "5px",
    padding: "1rem",
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      width: "35%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: "0.5rem",
      margin: "0.5rem",
      fontSize: "1rem",
    },
  },
  nxtBtn: {
    textTransform: "none",
    backgroundColor: "black",
    color: "white",
    transition: "0.3s",
    borderRadius: "50px",
    padding: "0.8rem",
    letterSpacing: "1px",
    cursor: "pointer",
    border: "none",
    fontFamily: "Montserrat",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "white",
      color: "#FF464B",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0.5rem",
      margin: "auto",
      fontSize: "0.8rem",
    },
  },
}));

export default useStyles;
