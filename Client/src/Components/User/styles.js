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
  form: {
    display: "flex",
    height: "100vh",
    width: "100%",
    background: "linear-gradient(90deg,#FF416C,#FF4B2B)",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "4rem",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      padding: "2rem",
    },
  },
  title: {
    fontSize: "2rem",
    fontFamily: "Poppins",
    marginRight: "auto",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  subtitle: {
    fontSize: "1.5rem",
    fontFamily: "Poppins",
    marginRight: "auto",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  hostdetails: {
    fontSize: "0.8rem",
    fontFamily: "Poppins",
    marginRight: "auto",
    paddingBottom: "1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6rem",
    },
  },
  txtFld: {
    marginTop: "1rem",
    width: "50%",
    backgroundColor: "white",
    outline: "none",
    border: "none",
    borderRadius: "5px",
    padding: "1rem",
    fontSize: "1.2rem",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: "0.6rem",
      fontSize: "1rem",
    },
  },
  msg: {
    fontFamily: "Montserrat",
    fontSize: "0.7rem",
    marginBottom: "1rem",
    fontWeight: "bolder",
    fontStyle: "italic",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.55rem",
    },
  },
  nxtBtn: {
    width: "10%",
    textTransform: "none",
    backgroundColor: "black",
    color: "white",
    transition: "0.3s",
    borderRadius: "50px",
    padding: "0.5rem",
    letterSpacing: "1px",
    cursor: "pointer",
    border: "none",
    fontSize: "1.2rem",
    fontFamily: "Montserrat",
    "&:hover": {
      backgroundColor: "white",
      color: "#FF464B",
    },
    [theme.breakpoints.down("xs")]: {
      width: "20%",
      fontSize: "0.8rem",
    },
  },
}));

export default useStyles;
