import React from 'react';
import { Slide, DialogTitle, DialogContent, Dialog, Button, makeStyles } from '@material-ui/core';
import FormWithMUI from './addTraineeForm';
import { red } from '@material-ui/core/colors';
import TraineeList from './../Trainee/TraineeList';

const Transition = React.forwardRef(function Transition(props, ref){
    return <Slide direction="up" ref={ref} {...props} />
});

const useStyles = makeStyles((theme) => ({
    root: {
        margin:'10px'
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
      float: {
        float: 'right'
      },
      cursor: {
        cursor:'pointer'
      }
}));

export default function Home(){
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }


    return (
        <div className={classes.root}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Trainee
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby = "alert-dialog-slide-title"
                aria-describedby = "alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"Add Trainee"}
                </DialogTitle>

                <DialogContent>
                    <FormWithMUI></FormWithMUI>
                </DialogContent>

            </Dialog>

            <TraineeList></TraineeList>
        </div>
    )
}