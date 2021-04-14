import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react';
import Button from '@material-ui/core/Button';
export default function DeleteDialog(props){

    // console.log("Check deleting data under delete dialog:",props.deletedData);
    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="up" ref={ref} {...props} />;
    //   });
    function handleDelete(){
        props.handleDelete(props.deletedData);
    }
    
return(
    <Dialog
    open={props.delete}
    // TransitionComponent={Transition}
    keepMounted
    onClose={props.handleCancel}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
>
    {/* <DialogTitle id="alert-dialog-slide-title"><Delete /></DialogTitle> */}
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