import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CustomSpinner from "../Spinner/Spinner";
import CustomizedSnackBar from "../snackbar/Snackbar";
import { CustomeSnack } from "../../lib/util/context";
import { withLoaderAndMessage } from "../../HOC/withLoaderAndMessage";
import client from "./../../lib/apollo-client";
import { TablePagination } from "@material-ui/core";
import { QUERY_GETALLTRAINEE } from "../../pages/Trainee/Query";
import DeleteDialog from "../Dialog/DeleteDialog";
import axios from "axios";
import { baseURL } from "./../../configs/configuration";
import EditTraineeDialog from "../Dialog/EditTraineeDialog";
import { TraineeRow } from "./../Trainee/components/TraineeRow";
import { UPDATE_TRAINEE } from "../../pages/Trainee/Mutation";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    marginLeft: "25%",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    margin: "20px",
    color: "black",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgb(37, 150, 190)",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  // hover: {},
}))(TableCell);

function TableTrainee(props) {
  const { limit, skip } = props;
  const classes = useStyles();
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [snackType, setSnackType] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [trainees, setTrainees] = React.useState([]);
  const [loader, setLoader] = React.useState(true);
  const [error, setError] = React.useState(Boolean);
  const [deletingData, setDeletingData] = React.useState("");
  const [editData, setEditData] = React.useState({});
  const [deleteLoader, setDeleteLoader] = React.useState(false);

  const getAllTrainees = () => {
    client
      .query({
        query: QUERY_GETALLTRAINEE,
        variables: { limit: limit, skip: skip },
      })
      .then((response) => {
        setLoader(false);
        setTrainees(response.data.getAllTrainees);
      })
      .catch((error) => {
        setOpenSnack(true);
        setSnackBarMessage("Failed to fetch Trainees");
        setSnackType("error");
        setError(true);
        console.error("error:", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteDialogOpen = (_id) => {
    setDeletingData(_id);
    setOpenDelete(true);
  };

  getAllTrainees();

  //for delete operation

  const handleDeleteCancel = () => {
    setDeleteLoader(false);
    setOpenDelete(false);
  };

  const handleDelete = (_id) => {
    setDeleteLoader(false);
    console.log("deleting data:", _id);

    axios
      .delete(`${baseURL}/trainee/deleteTrainee/${_id}`)
      .then((response) => {
        setOpenSnack(true);
        setSnackBarMessage("Deleted Successfully!");
        setSnackType("success");
        setOpenDelete(false);
        getAllTrainees();
        window.location.reload(false);
      })
      .catch((error) => {
        setOpenSnack(true);
        setSnackBarMessage("Unable to delete row!");
        setSnackType("error");
        setOpenDelete(false);
      });
  };

  const editHandler = (data) => {
    setEditData(data);
    setOpenEdit(true);
    console.log("selected id for editing : ", data);
  };

  const handleEditCancel = () => {
    setOpenEdit(false);
  };

  const handleUpdate = (data) => {
    console.log("updating data: ", data);
    const { id: _id, firstname, lastname, email, image } = data;
    client
      .mutate({
        mutation: UPDATE_TRAINEE,
        variables: {
          id: _id,
          firstname: firstname,
          lastname: lastname,
          email: email,
          image: image,
        },
      })
      .then((response) => {
        setOpenSnack(true);
        setSnackBarMessage("Updated Successfully!");
        setSnackType("success");
        setOpenEdit(false);
        window.location.reload(false);
      })
      .catch((error) => {
        setOpenSnack(true);
        setSnackBarMessage("Updation Failed!");
        setSnackType("error");
        setOpenEdit(false);
      });
  };

  return (
    <>
      <CustomeSnack.Provider
        value={{
          opensnack: openSnack,
          autoHide: 4000,
          snackMessage: snackBarMessage,
          type: snackType,
        }}
      >
        <CustomizedSnackBar
          handleClose={() => setOpenSnack(false)}
        ></CustomizedSnackBar>
      </CustomeSnack.Provider>

      <div className={classes.root}>
        <EditTraineeDialog
          edit={openEdit}
          handleClose={handleEditCancel}
          editData={editData}
          handleUpdate={handleUpdate}
        />

        <DeleteDialog
          delete={openDelete}
          deletedData={deletingData}
          handleCancel={handleDeleteCancel}
          handleDelete={handleDelete}
        />
        {loader ? <CustomSpinner></CustomSpinner> : null}

        {trainees.length === 0 ? <p>OOPS!, No More Trainees</p> : null}

        {trainees ? (
          <Paper className={classes.paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Firstname</StyledTableCell>
                  <StyledTableCell align="center">Lastname</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell colSpan={2} align="center">
                    Action
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TraineeRow
                      {...row}
                      editHandler={editHandler}
                      handleDeleteDialogOpen={handleDeleteDialogOpen}
                    />
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={trainees.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        ) : null}
      </div>
    </>
  );
}

export default withLoaderAndMessage(TableTrainee);
