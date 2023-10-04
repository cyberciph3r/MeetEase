import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "10%",
    paddingRight: "10%",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "5%",
      paddingRight: "5%",
    },
  },
  logo: {
    textDecoration: "none",
    fontFamily: "Montserrat",
    color: "white",
    fontSize: "3rem",
    fontFamily: "smooch",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
    },
  },
  profileBtn: {
    border: "2px solid #fff",
    backgroundColor: "white",
    borderRadius: "20px",
    fontFamily: "Roboto",
    color: "black",
    margin: "0.5rem",
    padding: "0.4rem",
    paddingLeft: "0.8rem",
    paddingRight: "0.8rem",
    textDecoration: "none",
    transition: "0.3s",
    "&:hover": {
      border: "2px solid black",
      borderRadius: "20px",
      backgroundColor: "black",
      color: "white",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0.2rem",
      padding: "0.3rem",
      fontSize: "0.6rem",
    },
  },
  logoutBtn: {
    border: "2px solid #fff",
    borderRadius: "20px",
    fontFamily: "Roboto",
    color: "white",
    margin: "0.5rem",
    padding: "0.4rem",
    paddingLeft: "0.8rem",
    paddingRight: "0.8rem",
    textDecoration: "none",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0.2rem",
      padding: "0.3rem",
      fontSize: "0.6rem",
    },
  },
}));

export default useStyles;
