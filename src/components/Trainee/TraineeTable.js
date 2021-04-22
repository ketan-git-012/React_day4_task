import React from "react";
import { makeStyles, withStyles, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgb(37, 150, 190)",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  hover: {},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: "pointer",
  },
  hover: {},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "20px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  media: {
    height: "400px",
    widows: "300px",
  },
  button: {
    textAlign: "center",
  },
  table: {
    minWidth: 700,
  },
  tableContainer: {
    margin: "0px 30px",
  },
}));

export default function TraineeTable(props) {
  const classes = useStyles();
  const handleSort = () => {
    props.onSort();
  };

  const loadPreviousPage = (event) => {
    console.log("previous page value:", event.target.value);
    props.onChangePage(event.target.value);
  };
  const loadNextPage = (event) => {
    console.log("next page value:", event.target.value);
    props.onChangePage(event.target.value);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.columns.map((column) => (
              <StyledTableCell
                aria-sort={props.order}
                align="center"
                style={{ cursor: "pointer" }}
                id={column.field}
              >
                <TableSortLabel
                  active={props.orderBy === column.field}
                  direction={props.order}
                  onClick={handleSort}
                  style={{
                    hover: {
                      color: "black",
                    },
                  }}
                >
                  {column.label}
                </TableSortLabel>
              </StyledTableCell>
            ))}
            <StyledTableCell colSpan={2}>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <StyledTableRow key={row[0].matches} hover>
              <StyledTableCell component="th" scope="row" align="center">
                {row[0].matches}
              </StyledTableCell>
              <StyledTableCell align="center">{row[0].runs}</StyledTableCell>
              <StyledTableCell align="center">
                {row[0].highscore}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row[0].strikerate}
              </StyledTableCell>
              {props.actions.map((action) => (
                <StyledTableCell align="center">
                  <Button
                    type="button"
                    onClick={() => action.handler(row)}
                    style={{ height: "20px", margin: "auto" }}
                  >
                    {action.icon}
                  </Button>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        count={props.count}
        page={props.page}
        style={{ float: "right" }}
        rowsPerPage={props.rowsPerPage}
        rowsPerPageOptions=""
        backIconButtonProps={{
          "aria-label": "Previous Page",
          value: "previous",
          onClick: loadPreviousPage,
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
          value: "next",
          onClick: loadNextPage,
        }}
      />
    </TableContainer>
  );
}
