import React, { useContext } from 'react';
import { Snackbar } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { CustomeSnack } from './../../lib/util/context';

import MuiAlert from '@material-ui/lab/Alert';

export default function CustomizedSnackBar(props){
    return (
        <SnackbarProvider maxSnack={0}>
            <SnackBar {...props}/>
        </SnackbarProvider>
    )
}

function Alert(props){
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackBar(props){
    const { opensnack, autoHide, snackMessage, type } = useContext(CustomeSnack);

    let { handleClose } = props;

    const snackBarClose = () =>{
        handleClose();
    };

    return (
        <Snackbar
        open={opensnack}
        autoHideDuration={autoHide}
        onClose={snackBarClose}
        anchorOrigin={{
            vertical : "bottom",
            horizontal : "center"
        }}
        >
            <Alert onClose={handleClose} severity={type}>
                    {snackMessage}
            </Alert>
        </Snackbar>
    )
}