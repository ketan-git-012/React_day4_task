import React from 'react';
import trainees from './Trainees';
import traineesRecord from './TraineesRecord';
import { 
    Card,
    makeStyles,
    // withStyles,
    Grid,
    Typography,
    Button,
    Snackbar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
// import TableCell from '@material-ui/core/TableCell';
// import TableRow from '@material-ui/core/TableRow';
import { 
         Edit, 
         Delete 
} from '@material-ui/icons';
import TraineeTable from './TraineeTable';
import DeleteDialog from './../Dialog/DeleteDialog';
import EditDialog from './../Dialog/EditDialog';
import CustomizedSnackBar from './../snackbar/Snackbar';
import { CustomeSnack } from './../../lib/util/context';

// const StyledTableCell = withStyles((theme) => ({
//     head: {
//       backgroundColor: 'rgb(37, 150, 190)',
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }))(TableCell);

//   const StyledTableRow = withStyles((theme) => ({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
//   }))(TableRow);


  function createData( matches, runs, highscore, strikerate, date ) {
    return { matches, runs, highscore, strikerate, date };
  }
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//   ];

  
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

export default function DisplayProfile({match, props}){
    const [open, setOpen] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("");
    const [snackType, setSnackType] = React.useState("");
    const [matches, setMatches] = React.useState('');
    const [runs, setRuns] = React.useState('');
    const [highScore, setHighScore] = React.useState('');
    const [strikeRate, setStrikeRate] = React.useState('');
    const [deletingData , setDeletingData] = React.useState({});
    const classes = useStyles();
    // const [deleteindex, setDeleteIndex] = React.useState(0);
    // const [editindex, setEditIndex] = React.useState(0);
    // const [isUp, setIsUp] = React.useState(false);
    const [orderBy, setOrderBy] = React.useState('');
    const [edit, setEdit] = React.useState(false);
    const [deleting, setDelete] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [order, setOrder] = React.useState('asc');
    const index = trainees.findIndex((trainee) =>{
        if(match.params.id === trainee.id){
            return trainee
        }
    });
    
    var rows = [];

    for(let i=0;i<traineesRecord.length;i++){
        if(traineesRecord[i].playerid === match.params.id){
                // eslint-disable-next-line no-const-assign
                rows[i] = [
                    createData( 
                            traineesRecord[i].matches, 
                            traineesRecord[i].runs,
                            traineesRecord[i].highscore,
                            traineesRecord[i].strikerate,
                            traineesRecord[i].date
                            ),
                ]
        }
    }
    

    const handleSort = () =>{
        order === 'asc' ? setOrder('desc') : setOrder('asc');
        console.log("clicked");
    }
    const handleSelect = () => {
        
    }

    const handlePageChange = (newPage) => {
        if(newPage === 'next'){
            setPage(page+1);
            console.log("next",page);
        }
        else if(newPage === 'previous'){
            setPage(page-1);
            console.log("previous",page);
        }
    }

 
    const handleEditDialogOpen = (row) =>{
        console.log("editing name:", row[0].matches);
        setMatches(row[0].matches);
        setRuns(row[0].runs);
        setHighScore(row[0].highscore);
        setStrikeRate(row[0].strikerate);
     
       setEdit(true);
    }


    const handleDeleteDialogOpen = (row) => {
        setDeletingData(row);
        setDelete(true);
    }

    const handleDeleteCancel = () => {
        setDelete(false);
    }

    const handleEditCancel = () =>{
        setOpen(true);
        setSnackBarMessage("Updated Successfully!");
        setSnackType("success");
        setEdit(false);
    }
    const handleDelete = (rowData) =>{
        setOpen(true);
        setSnackBarMessage("Deleted Successfully!");
        setSnackType("error");
        console.log("deleting data:", rowData[0]);
    }

    // const handleChange = (event) => {
    //     if(event.target.name === 'matches'){
    //         matches = event.target.value;
    //     }
    // }

    const image = trainees[index].image;
    // const playerid = trainees[index].id;
    const name = trainees[index].name;
    const profile = trainees[index].profile;

    return (
        <>
        <div>
       <DeleteDialog 
            delete={deleting}
            deletedData={deletingData}
            handleCancel={handleDeleteCancel}
            handleDelete={handleDelete}
       />
       <EditDialog 
            edit={edit}
            handleClose={handleEditCancel}
            matches={matches}
            runs={runs}
            highScore={highScore}
            strikeRate={strikeRate}
       />
            <Card className={classes.card}>
            <Grid container>
                <Grid item>
                        <img src={image} alt={name} width={300} height={300} />
                        <Typography variant="h4" component="h3" style={{ textAlign : 'center' }}>
                            {name}
                        </Typography>
                        <hr />
                        <Typography variant="body" component="body" style={{textAlign : 'center'}}>
                            {profile}
                        </Typography>
                </Grid>
                <Grid item>
                    <TraineeTable
                    id="id"
                    data={rows}
                    columns={[
                        {
                            field : 'matchtype',
                            label : 'Match Type',
                        },
                        {
                            field : 'runs',
                            label : 'Runs',
                        },
                        {
                            field : 'highscore',
                            label : 'High Score'
                        },
                        {
                            field : 'strikerate',
                            label : 'Strike Rate'
                        },
                        // {
                        //     field : 'createAt',
                        //     label : 'Date',
                        //     align : 'right',
                        //     format : Date
                        // }
                    ]}
                    actions={[
                        {
                            icon : <Edit />,
                            name : 'edit',
                            handler : handleEditDialogOpen
                        },
                        {
                            icon : <Delete />,
                            name : 'delete',
                            handler : handleDeleteDialogOpen
                        }
                    ]}
                    orderBy={orderBy}
                    order={order}
                    onSort={handleSort}
                    onSelect={handleSelect}
                    count={300}
                    page={page}
                    onChangePage={handlePageChange}
                    rowsPerPage={100}
                    />
                </Grid>
            </Grid>
           </Card>
           <div className={classes.button}>
            <Link to={'/home'}>
                <Button variant="contained" color="secondary">
                    HOME
                </Button>
            </Link>
           </div>
        </div>
        <CustomeSnack.Provider
            value={{
                opensnack : open,
                autoHide : 2000,
                snackMessage : snackBarMessage,
                type : snackType
            }}
        >
         <CustomizedSnackBar
            handleClose={()=> setOpen(false)}
         >
        </CustomizedSnackBar>   
        </CustomeSnack.Provider>
        </>
    )
}