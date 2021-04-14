import React from 'react';
import { TextField, Button, InputAdornment} from '@material-ui/core';
import traineeValidation from './addTraineeValidation';
import { Email, AccountCircle, VisibilityOff } from '@material-ui/icons';
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
        margin : '10px'
    }
};

export default function FormWithMUI(){
    const formik = useFormik({
        initialValues : {
            name : "",
            email : "",
            password : "",
            confirmpassword : ""
        },
        validationSchema : Yup.object().shape(traineeValidation),
        onSubmit : (values) =>{
            console.log("values:", values);
            alert(JSON.stringify(values, null, 2))
        }
    })


    return (
        <form fullWidth onSubmit={formik.handleSubmit} class={styles.container}>
            <TextField 
                id="name"
                name="name"
                value={formik.values.name}
                style={styles.input}
                type="text"
                variant="outlined"
                fullWidth
                label="name"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={ formik.touched.name ? formik.errors.name : ""}
                error={formik.touched.name && Boolean(formik.errors.name)}
            />

            <TextField 
                id="email"
                value={formik.values.email}
                style={styles.input}
                name="email"
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
                style={styles.input}
                value={formik.values.password}
                id="password"
                name="password"
                type="password"
                label="password"
                InputProps={{ 
                    startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOff />
                        </InputAdornment>
                      ),}} 
                variant="outlined"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={ formik.touched.password ? formik.errors.password : ""}
                error={formik.touched.password && Boolean(formik.errors.password)}
            />

            <TextField 
                id="confirmpassword"
                value={formik.values.confirmpassword}
                style={styles.input}
                name="confirmpassword"
                label="confirm-password"
                type="password"
                InputProps={{ 
                    startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOff />
                        </InputAdornment>
                      ),}} 
                variant="outlined"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={ formik.touched.confirmpassword ? formik.errors.confirmpassword : ""}
                error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
            />


            <div style={styles.actions}>
                <Button style={styles.button} variant="contained" type="reset" onClick={formik.handleReset} color="secondary">
                    Clear
                </Button>
                <Button style={styles.button} variant="contained" type="submit" disabled={!formik.isValid} color="primary">
                    Submit
                </Button>
            </div>
        </form>
    )
}