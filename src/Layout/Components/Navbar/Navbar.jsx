import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    makeStyles,
    Button
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme)=>({
    root : {
        flexGrow : 1,
    },
    menuButton : {
        marginLeft : theme.spacing(2),
    },
    title : {
        flexGrow : 1
    },
}));

export default function Navbar(){
    const history = useHistory();
    const classes = useStyles();
    

    const navigate =  (path) => {
        history.push(path);
    }


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        React Training
                    </Typography>

                    <Button color="inherit" onClick={() =>  navigate('/home')}>Home</Button>
                    <Button color="inherit" onClick={() =>  navigate('/math')}>Math</Button>
                    <Button color="inherit" onClick={() =>  navigate('/controlledinputs')}>Forms</Button>
                    <Button color="inherit" onClick={() =>  navigate('/slider')}>Slider</Button>
                    <Button color="inherit" onClick={() =>  navigate('/welcome')}>Basics of Form</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}