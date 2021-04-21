import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react';
import Button from '@material-ui/core/Button';
export default function DeleteDialog(props){

    function handleDelete(){
        props.handleDelete(props.deletedData);
    }
    
return(
    <Dialog
    open={props.delete}
    keepMounted
    onClose={props.handleCancel}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
>
    <DialogContent>
    <DialogContentText id="alert-dialog-slide-description">
        Are you sure you want to delete record ?
    </DialogContentText>
    </DialogContent>
    <DialogActions>
    <Button onClick={props.handleCancel} color="default" variant="contained">
        CANCEL
    </Button>
    <Button onClick={handleDelete} color="primary" variant="contained">
        DELETE
    </Button>
    </DialogActions>
</Dialog>
)
}