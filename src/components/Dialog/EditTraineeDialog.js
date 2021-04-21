import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import React from 'react';
import { TextField, Button, InputAdornment} from '@material-ui/core';
import { traineeValidation } from './../home/recordValidation';
import { AccountCircle, Email, SportsCricket } from '@material-ui/icons';
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


export default function EditTraineeDialog(props){
    // console.log("form data:", props.values);
    const formik = useFormik({
        initialValues : {
            firstname : "",
            lastname : "",
            email : "",
        },
        validateOnChange : (values) =>{
            console.log("values onCHange:", values)
        },
        enableReinitialize: true,
        validationSchema : Yup.object().shape(traineeValidation),
        onSubmit : (values) =>{
            console.log("values:", values);
            // alert(JSON.stringify(values, null, 2))
            props.handleUpdate(values);
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
                id="firstname"
                // firstname="firstname"
                value={props.values.firstname}
                style={styles.input}
                type="text"
                variant="outlined"
                fullWidth
                label="Firstname"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={ formik.touched.firstname ? formik.errors.firstname : ""}
                // error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            />

            <TextField 
                id="lastname"
                value={props.values.lastname}
                style={styles.input}
                // firstname="lastname"
                type="text"
                label="Lastname"
                variant="outlined"
                InputProps={{ 
                    startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),}} 
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={ formik.touched.lastname ? formik.errors.lastname : ""}
                // error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            />

            <TextField 
                style={styles.input}
                value={props.values.email}
                id="email"
                // firstname="email"
                type="email"
                label="Email"
                InputProps={{ 
                    startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),}} 
                variant="outlined"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={ formik.touched.email ? formik.errors.email : ""}
                // error={formik.touched.email && Boolean(formik.errors.email)}
            />


            <div style={styles.actions}>
                <Button style={styles.button} variant="contained" type="reset" onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button style={styles.button} variant="contained" type="submit" color="primary">
                    Update
                </Button>
            </div>
        </form>
        </DialogContent>

</Dialog>
    )
}