import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import { AccountCircle, Email } from "@material-ui/icons";

const styles = {
  actions: {
    float: "right",
    marginTop: "20px",
  },
  input: {
    marginTop: "20px",
    marginLeft: "5px",
    marginRight: "5px",
  },
  button: {
    margin: "10px",
    marginRight: "220px",
    float: "center",
  },
};

export default function EditTraineeDialog(props) {
  const { editData, edit } = props;
  const [firstname, setFirstname] = useState(editData.firstname);
  const [lastname, setLastname] = useState(editData.lastname);
  const [email, setEmail] = useState(editData.email);

  const handleClose = () => {
    props.handleClose();
  };

  const handleUpdate = () => {
    props.handleUpdate({
      id: editData.id,
      firstname,
      lastname,
      email,
      image: editData.image,
    });
  };

  return (
    <Dialog
      open={edit}
      keepMounted
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        style={{ marginLeft: "220px" }}
      >
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
            onChange={(e) => setFirstname(e.target.value)}
          />

          <TextField
            id="lastname"
            value={lastname}
            style={styles.input}
            type="text"
            label="Lastname"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            fullWidth
            onChange={(e) => setLastname(e.target.value)}
          />

          <TextField
            style={styles.input}
            value={email}
            id="email"
            type="email"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={styles.actions}>
            <Button
              style={styles.button}
              variant="contained"
              type="reset"
              onClick={handleClose}
              color="primary"
            >
              Close
            </Button>
            <Button
              style={styles.button}
              variant="contained"
              onClick={handleUpdate}
              type="button"
              color="primary"
            >
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
