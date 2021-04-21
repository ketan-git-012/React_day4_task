import { Button, TableCell, TableRow, withStyles } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import CustomSpinner from "../../Spinner/Spinner";

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

export const TraineeRow = ({
  _id: id,
  firstname,
  lastname,
  email,
  image,
  editHandler,
  handleDeleteDialogOpen,
}) => {
  const [loader, setLoader] = useState(false);

  const hanldeDeleteLoader = () => {
    setLoader(true);
    handleDeleteDialogOpen(id);
  };
  return (
    <TableRow key={id}>
      <TableCell align="center">{firstname}</TableCell>
      <TableCell align="center">{lastname}</TableCell>
      <TableCell align="center">{email}</TableCell>
      <StyledTableCell align="center">
        <Button
          type="button"
          onClick={() => editHandler({id, firstname, lastname, email, image }) }>
          <Edit />
        </Button>
      </StyledTableCell>

      <StyledTableCell align="center">
        {loader ? (
          <Button disabled={true}>
            <CustomSpinner></CustomSpinner>
          </Button>
        ) : (
          <Button type="button" onClick={() => hanldeDeleteLoader()}>
            <Delete />
          </Button>
        )}
      </StyledTableCell>
    </TableRow>
  );
};
