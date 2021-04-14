import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import React from 'react';
import { TextField, Button, InputAdornment} from '@material-ui/core';
import recordValidation from './../home/recordValidation';
import { SportsCricket } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const styles = {
    actions : {
        float : 'right',
        marginTop : '20px'
    },
    input : {
        marginTop : '20px',
        marginLeft : '5px',
        marginRight : '5px'
    },
    button : {
        margin : '10px',
        marginRight : '220px',
        float : 'center'
    }
};


export default function EditDialog(props){
    const formik = useFormik({
        initialValues : {
            matches : "",
            runs : "",
            highScore : "",
            strikeRate : ""
        },
        validationSchema : Yup.object().shape(recordValidation),
        onSubmit : (values) =>{
            console.log("values:", values);
            alert(JSON.stringify(values, null, 2))
        }
    });

    const handleClose = () => {
        props.handleClose();
    }


    return (

        <Dialog
        open={props.edit}
        // TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby = "alert-dialog-slide-title"
        aria-describedby = "alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title" style={{ marginLeft : '220px'}}>
            {"Edit Trainee"}
        </DialogTitle>

        <DialogContent>
        <form fullWidth onSubmit={formik.handleSubmit} class={styles.container}>
            <TextField 
                id="matches"
                // matches="matches"
                value={props.matches}
                style={styles.input}
                type="text"
                variant="outlined"
                fullWidth
                label="Matches"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SportsCricket />
                      </InputAdornment>
                    ),
                  }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={ formik.touched.matches ? formik.errors.matches : ""}
                // error={formik.touched.matches && Boolean(formik.errors.matches)}
            />

            <TextField 
                id="runs"
                value={props.runs}
                style={styles.input}
                // matches="runs"
                type="number"
                label="Runs"
                variant="outlined"
                InputProps={{ 
                    startAdornment: (
                        <InputAdornment position="start">
                          <SportsCricket />
                        </InputAdornment>
                      ),}} 
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={ formik.touched.runs ? formik.errors.runs : ""}
                // error={formik.touched.runs && Boolean(formik.errors.runs)}
            />

            <TextField 
                style={styles.input}
                value={props.highScore}
                id="highScore"
                // matches="highScore"
                type="number"
                label="High Score"
                InputProps={{ 
                    startAdornment: (
                        <InputAdornment position="start">
                          <SportsCricket />
                        </InputAdornment>
                      ),}} 
                variant="outlined"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={ formik.touched.highScore ? formik.errors.highScore : ""}
                // error={formik.touched.highScore && Boolean(formik.errors.highScore)}
            />

            <TextField 
                id="strikeRate"
                value={props.strikeRate}
                style={styles.input}
                // matches="strikeRate"
                label="Strike Rate"
                type="number"
                InputProps={{ 
                    startAdornment: (
                        <InputAdornment position="start">
                          <SportsCricket />
                        </InputAdornment>
                      ),}} 
                variant="outlined"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={ formik.touched.strikeRate ? formik.errors.strikeRate : ""}
                // error={formik.touched.strikeRate && Boolean(formik.errors.strikeRate)}
            />


            <div style={styles.actions}>
                <Button style={styles.button} variant="contained" type="reset" onClick={handleClose} color="primary">
                    Close
                </Button>
                {/* <Button style={styles.button} variant="contained" type="submit" disabled={formik.isSubmitting} color="primary">
                    Submit
                </Button> */}
            </div>
        </form>
        </DialogContent>

</Dialog>
    )
}