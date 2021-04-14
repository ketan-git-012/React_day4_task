import React from 'react';
import { 
    makeStyles,
    withStyles,
    Button,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: 'rgb(37, 150, 190)',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
    hover: {}
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      cursor : 'pointer',
    },
    hover: {}
  }))(TableRow);


  
const useStyles = makeStyles((theme) => ({
    card : {
        margin : '20px',
        padding : '10px',
        display : 'flex',
        flexDirection : 'column',
        backgroundColor : 'rgba(0, 0, 0, 0.1)'
    },
    media : {
        height : '400px',
        widows : '300px'
    },
    // text : {
    //     marginTop : '15px',
    //     marginLeft : '350px'
    // },
    button : {
        textAlign : 'center'
    },
    table: {
        minWidth: 700,
      },
    tableContainer :{
        margin : '0px 30px'
      }
}))

export default function TraineeTable (props){
    const classes = useStyles();
    // const [isUp, setIsUp] = React.useState(false);


    // const handleSorting = () => {
    //     isUp ? setIsUp(false) : setIsUp(true);
         
    //     // const newRows = rows.sort((a,b) => a[fat]>b[name]?1:-1)
    // }

    const handleSort = () =>{
        props.onSort();
    }

    // const onChangePage = () =>{
    //     props.onChangePage();
    // }
    const loadPreviousPage = (event) =>{
        console.log("previous page value:",event.target.value);
        props.onChangePage(event.target.value);
    }
    const loadNextPage = (event) =>{
        console.log("next page value:",event.target.value);
        props.onChangePage(event.target.value);
    }

    return (

        <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                           <TableRow>
                              {/*    <StyledTableCell onClick={handleSorting} style={{ display : 'flex' , flexDirection : 'row' , cursor : 'pointer'}}>
                                    Matches 
                                       
                                </StyledTableCell> */}
                                {/* <StyledTableCell align="right">{props.columns[0].label}</StyledTableCell>
                                <StyledTableCell align="right">High Score</StyledTableCell>
                                <StyledTableCell align="right">Strike Rate</StyledTableCell>
                                <StyledTableCell align="right">Economy</StyledTableCell>
                                <StyledTableCell align="right">Best Figure</StyledTableCell> */}
                                {props.columns.map((column) => (
                                    <StyledTableCell aria-sort={props.order} align="center" style={{ cursor : 'pointer' }} id={column.field}>
                                                                    
                                        <TableSortLabel
                                            active={props.orderBy === column.field}
                                            direction={props.order}
                                            onClick={handleSort}
                                            style={{ hover : {
                                                color : 'black'
                                            } }}
                                            >
                                        {column.label}
                                        </TableSortLabel>
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell colSpan={2}>
                                        Actions
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {props.data.map((row) => (
                                <StyledTableRow 
                                    key={row[0].matches} 
                                    // classes={{ hover: classes.hover }}
                                    hover>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {row[0].matches} 
                                </StyledTableCell>
                                <StyledTableCell align="center">{row[0].runs}</StyledTableCell>
                                <StyledTableCell align="center">{row[0].highscore}</StyledTableCell>
                                <StyledTableCell align="center">{row[0].strikerate}</StyledTableCell>
                                {/* <StyledTableCell align="center">{row[0].date}</StyledTableCell> */}
                                {/* <StyledTableCell align="center">{row.economy}</StyledTableCell> */}
                                {props.actions.map((action) => (
                                    <StyledTableCell align="center">
                                        <Button type="button" onClick={() => action.handler(row)}
                                            style={{ height : '20px' , margin : 'auto'}}
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
                            style={{ float : 'right' }}
                            // onChangePage={onChangePage}
                            rowsPerPage={props.rowsPerPage}
                            rowsPerPageOptions=''
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                                 'value' : 'previous',
                                 'onClick': loadPreviousPage,
                              }}
                              nextIconButtonProps={{
                                 'aria-label': 'Next Page',
                                 'value' : 'next',
                                 'onClick': loadNextPage,
                             }}
                    />
                    </TableContainer>
                    

    )
}
