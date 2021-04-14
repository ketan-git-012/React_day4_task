import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import trainees from './Trainees';
import ViewProfile from './viewProfile';
// import constants from './../../configs/configuration';

const useStyles = makeStyles((theme) => ({
    root: {
        display : 'flex',
        flexDirection : 'row',
        // maxWidth : 5000
        margin : '20px'
    }
}));



export default function TraineeList(){
    const classes = useStyles();
    // const [checked, setChecked] = React.useState([1]);
    // const history = useHistory();

    return (
        <div className={classes.root}>
            {trainees.map((trainee) =>{
                return(
                    <ViewProfile id={trainee.id} img={trainee.image} name={trainee.name} title={trainee.name} profile={trainee.profile}/>
                )
            })}
        </div>
    )
}