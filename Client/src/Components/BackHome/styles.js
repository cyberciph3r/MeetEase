import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  oops: {
    backgroundColor: "black",
    height: "100vh",
    paddingLeft: "4rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1rem",
    },
  },
  title: {
    fontSize: "4rem",
    fontWeight: "bolder",
    fontFamily: "Poppins",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  subTitle: {
    paddingBottom: "1rem",
    fontFamily: "Montserrat",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  btn: {
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
      border: "2px solid #fff",
      borderRadius: "20px",
      backgroundColor: "black",
      color: "white",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem",
      padding: "0.2rem",
    },
  },
}));

export default useStyles;
