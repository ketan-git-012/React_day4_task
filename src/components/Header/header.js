import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const history = useHistory();
  const classes = useStyles();

  const navigate = (path) => {
    history.push(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    console.log("user logged out");
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            React Training
          </Typography>
          <Button color="inherit" onClick={() => navigate("/home")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/trainees")}>
            Trainees
          </Button>
          <Button color="inherit" onClick={() => navigate("/controlledinputs")}>
            Controlledinputs
          </Button>
          <Button color="inherit" onClick={() => navigate("/slider")}>
            Slider
          </Button>
          <Button color="inherit" onClick={() => navigate("/form")}>
            Form
          </Button>
          <Button color="inherit" onClick={() => handleLogout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
