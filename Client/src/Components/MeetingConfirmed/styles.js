import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    height: "100vh",
    width: "100%",
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
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  subtitle: {
    fontSize: "1rem",
    fontFamily: "Montserrat",
    fontWeight: "bolder",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6rem",
    },
  },
}));

export default useStyles;
