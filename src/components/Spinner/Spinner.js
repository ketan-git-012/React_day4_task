import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "42px",
    height: "42px",
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
  },
  button: {
    margin: theme.spacing(2),
  },
  placeholder: {
    height: 40,
  },
}));

export default function CustomSpinner() {
  const loading = true;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.placeholder}>
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? "0ms" : "0ms",
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </div>
    </div>
  );
}
