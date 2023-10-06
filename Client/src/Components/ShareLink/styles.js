import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    height: "100vh",
    width: "100%",
    background: "linear-gradient(90deg,#0F2027,#203A43)",
    color: "white",
    justifyContent: "center",
    flexDirection: "column",
    padding: "2rem",
    boxSizing: "border-box",
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
    },
  },
  title: {
    fontSize: "4rem",
    fontFamily: "Montserrat",
    fontWeight: "bolder",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  subtitle: {
    fontSize: "1rem",
    fontFamily: "Montserrat",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6rem",
    },
  },
  linkDiv: {
    display: "flex",
    gap: "1rem",
  },
  txtFld: {
    width: "50%",
    outline: "none",
    border: "none",
    borderRadius: "5px",
    marginTop: "0.5rem",
    padding: "0.5rem",
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
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
    marginTop: "0.5rem",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  bth: {
    width: "fit-content",
    textDecoration: "none",
    backgroundColor: "black",
    color: "white",
    transition: "0.3s",
    borderRadius: "50px",
    marginTop: "1rem",
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
