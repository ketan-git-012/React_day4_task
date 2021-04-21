import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { TextField, Button, InputAdornment} from '@material-ui/core';
import { AccountCircle, Email } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { traineeValidation } from './../home/recordValidation';


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
    // console.log("props: ", props.editData)
    // console.log("form data:", props.values);
    const [values, setValues] = useState(props.editData);
    const [firstname, setFirstname] = useState(props.editData.firstname);
    const [lastname, setLastname] = useState(props.editData.lastname);
    const [email, setEmail] = useState(props.editData.email);

    const handleClose = () => {
        props.handleClose();
    }

    const handleUpdate = () => {
        props.handleUpdate({ id: props.editData.id, firstname, lastname, email, image: props.editData.image });
    }

    return (

        <Dialog
        open={props.edit}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby = "alert-dialog-slide-title"
        aria-describedby = "alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title" style={{ marginLeft : '220px'}}>
            {"Edit Trainee"}
        </DialogTitle>

        <DialogContent>
        <form fullWidth class={styles.container}>
            <TextField 
                id="firstname"
                value={firstname}
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
                // onBlur={formik.handleBlur}
                onChange={(e) => setFirstname(e.target.value)}
                // helperText={ formik.touched.firstname ? formik.errors.firstname : ""}
                // error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            />

            <TextField 
                id="lastname"
                value={lastname}
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
                // onBlur={formik.handleBlur}
                onChange={(e) => setLastname(e.target.value)}
                // helperText={ formik.touched.lastname ? formik.errors.lastname : ""}
                // error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            />

            <TextField 
                style={styles.input}
                value={email}
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
                // onBlur={formik.handleBlur}
                onChange={(e)=> setEmail(e.target.value)}
                // helperText={ formik.touched.email ? formik.errors.email : ""}
                // error={formik.touched.email && Boolean(formik.errors.email)}
            />


            <div style={styles.actions}>
                <Button style={styles.button} variant="contained" type="reset" onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button style={styles.button} variant="contained" onClick={handleUpdate} type="button" color="primary">
                    Update
                </Button>
            </div>
        </form>
        </DialogContent>

</Dialog>
    )
}