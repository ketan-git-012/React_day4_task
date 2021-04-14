import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Link, Grid, Box, Typography, makeStyles, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from '../Copyright/copyright';
import loginValidation from './loginValidation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import { CheckBox } from '@material-ui/icons';
import axios from 'axios';
import { baseURL } from './../../configs/configuration';
import { ApolloConsumer, useMutation } from '@apollo/client';
// import styles from '../textField/style';
import LOGIN_USER from './../../pages/login/mutation';
import client from './../../lib/apollo-client';


const styles = {
    input : {
        marginTop : '20px',
        marginLeft : '5px',
        marginRight : '5px'
    },
    checkbox : {
        marginLeft : '5px',
        marginTop : '10px'
    },
    button : {
        marginTop : '20px',
        marginLeft : '5px',
        marginRight : '5px',
        marginBottom : '10px'
    }
}
const useStyles = makeStyles((theme) => ({
    paper : {
        marginTop : theme.spacing(8),
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center'
    },
    avatar : {
        margin : theme.spacing(1),
        backgroundColor : theme.palette.secondary.main
    },
    form : {
        width : '100%',
        marginTop : theme.spacing(1)
    }
}));

export default function SignIn(props){

    const classes = useStyles();
    const history  = useHistory();

    const formik = useFormik({
        initialValues : {
            email : '',
            password : ''
        },
        validationSchema : yup.object().shape(loginValidation),
        onSubmit : (values) => {
            client.mutate({
                mutation : LOGIN_USER,
                variables : { email : values.email, password : values.password}
            })
            .then((response) => {
                sessionStorage.setItem('mutation', true);
                console.log("response of mutation:", response)
            })
            .catch((error)=> console.error(error));
            // console.log("return data of mutation:", data);
            console.log(values);
            axios.post(`${baseURL}/user/login`, values)
          .then(res => {
            console.log(res.data);
            console.log(res.data.status);
            if(res.data.status === 'success'){
                sessionStorage.setItem('token',res.data.token);
                document.cookie = "token=" + res.data.token;
                history.push('/home');
            }
            else{
                alert("Error:", res.error);
                history.push('/');
            }
          })
          .catch((error)=>{
            if (error.response){

                console.log(error.response.data.error);
                alert(error.response.data.error);
                
                }else if(error.request){
                    console.log(error.request)
                }else if(error.message){
                    console.log(error.message)
                }
          })
        }
    })

 


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <form className={classes.form} onSubmit={formik.handleSubmit} method="POST">
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={styles.input}
                        variant="outlined"
                        autoFocus
                        fullWidth
                        helperText={formik.touched.email ? formik.errors.email : ''}
                        error={formik.touched.email && Boolean(formik.errors.email)} 
                    />
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        style={styles.input}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        fullWidth
                        autoFocus
                        helperText={formik.touched.password ? formik.errors.password : ''}
                        error={formik.touched.password && Boolean(formik.errors.password)} 
                    />

                    <FormControlLabel 
                        control = {<CheckBox value="remember" color="primary" />}
                        style={styles.checkbox}
                        label = "Remember me"
                    />

                    <Button 
                        type="submit"
                        fullWidth
                        style={styles.button}
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot Password
                            </Link>
                        </Grid>
                        <Grid item>
                            Already have an account?
                            <Link href="#" variant="body">
                                { 'signUp' }
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}