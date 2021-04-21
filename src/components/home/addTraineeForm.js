import React, { useState } from 'react';
import { TextField, Button, InputAdornment, Snackbar} from '@material-ui/core';
import traineeValidation from './addTraineeValidation';
import { Email, AccountCircle, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomizedSnackBar from './../snackbar/Snackbar';
import { CustomeSnack } from './../../lib/util/context';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Buttons from '../Button/Button';
const baseURL = "http://localhost:8080";

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
        margin : '10px'
    }
};

export default function FormWithMUI(){

    const [open, setOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackType, setSnackType] = useState("");
    const [loader, setLoader] = useState(true);

    const history = useHistory();

    const formik = useFormik({
        initialValues : {
            firstname : "",
            lastname : "",
            email : "",
            image : ""
        },
        validationSchema : Yup.object().shape(traineeValidation),
        onSubmit : (values) =>{
            setLoader(false);
            axios.post(`${baseURL}/trainee/add`, values)
            .then((response)=>{
                setOpen(true);
                setSnackBarMessage(`Trainee Added Successfully with firstname ${values.firstname}!!`);
                setSnackType("success");
                console.log("response : ", response);
                setLoader(true);
                history.push('/home');
            // console.log("values:", values);
            // alert(JSON.stringify(values, null, 2))
            })
            .catch((error)=>{
                console.error(error);
                setOpen(true);
                setSnackBarMessage("unable to store trainee");
                setSnackType("error");
            })
        },
        onReset : () => {
            setLoader(true);
        }
    })


    return (
        <>
        <form fullWidth onSubmit={formik.handleSubmit} class={styles.container}>
            <TextField 
                id="firstname"
                firstname="firstname"
                value={formik.values.firstname}
                style={styles.input}
                type="text"
                variant="outlined"
                fullWidth
                label="firstname"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={ formik.touched.firstname ? formik.errors.firstname : ""}
                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            />


            <TextField 
                style={styles.input}
                value={formik.values.lastname}
                id="lastname"
                firstname="lastname"
                type="lastname"
                label="lastname"
                InputProps={{ 
                    startAdornment: (
                        <InputAdornment position="start">
                           <AccountCircle />
                        </InputAdornment>
                      ),}} 
                variant="outlined"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={ formik.touched.lastname ? formik.errors.lastname : ""}
                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            />

            <TextField 
                id="email"
                value={formik.values.email}
                style={styles.input}
                firstname="email"
                type="email"
                label="email"
                variant="outlined"
                InputProps={{ 
                    startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),}} 
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={ formik.touched.email ? formik.errors.email : ""}
                error={formik.touched.email && Boolean(formik.errors.email)}
            />


            <TextField 
                id="image"
                value={formik.values.image}
                style={styles.input}
                firstname="image"
                label="Image"
                type="text"
                InputProps={{ 
                    startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),}} 
                variant="outlined"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={ formik.touched.image ? formik.errors.image : ""}
                error={formik.touched.image && Boolean(formik.errors.image)}
            />


            <div style={styles.actions}>
                <Button style={styles.button} variant="contained" type="reset" onClick={formik.handleReset} color="secondary">
                    Clear
                </Button>
                {/* <Button style={styles.button} variant="contained" type="submit" disabled={!formik.isValid} color="primary">
                    Submit
                </Button> */}
                <Buttons styles={styles.button} loader={loader} disabled={!formik.isValid}/>
            </div>
        </form>

            <CustomeSnack.Provider
                value={{
                    opensnack : open,
                    autoHide : 4000,
                    snackMessage : snackBarMessage,
                    type : snackType
                }}
            >
                <CustomizedSnackBar
                    handleClose={()=> setOpen(false)}
                >
                </CustomizedSnackBar>
            </CustomeSnack.Provider>
        </>
    )
}