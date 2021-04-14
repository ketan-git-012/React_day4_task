import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import ViewProfile from './../Trainee/viewProfile';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const useStyles = makeStyles((theme) => ({
    root: {
        display : 'flex',
        flexDirection : 'row',
        // maxWidth : 5000
        margin : '20px',
        color : "black"
    }
}));

export default function Math(props){
    const classes = useStyles();
    const { first, second, operator } = props;
    function handle(){
        let result = '';
        switch(operator){
            case '+':
                result = parseInt(first) + parseInt(second)
                break;
            case '-':
                result = parseInt(first) - parseInt(second)
                break;
            case '*':
                result = parseInt(first) * parseInt(second)
                break;
            case '/':
                parseInt(second) === 0 ? result = 'Infinity' : result = parseInt(first) / parseInt(second)
                break;
            default :
                result = 'Invalid Operation'
        }
        return result;
    }
    return (
        <>
            {/* <div>
                {first} {operator} {second} = { handle()} 
            </div>
            <SnackBarProvider>
                <SnackbarContext.Consumer>
                    {(snack)=>{
                        return(
                            <Snackbar open={snack.open}>
                                <Alert severity={snack.status}>
                                    {snack.message}
                                </Alert>
                            </Snackbar>
                        )
                    }}
                </SnackbarContext.Consumer>
            </SnackBarProvider> */}
                                <div className={classes.root}>

                    <Query
                        query={gql`
                        {
                            getAllTrainees{
                              _id
                              email
                              firstname
                              lastname
                              image
                            }
                          }
                        `
                        } 
                        >
                            {({loading, error, data})=>{
                                if(loading) return <p>Loading...</p>

                                if(error) return <p>Error...</p>

                                return data.getAllTrainees.map((trainee)=>(

                                    // <p>
                                    //     Name : {trainee.firstname}&nbsp;&nbsp;{trainee.lastname}<br />
                                    //     Email : {trainee.email}<br />
                                    // </p>
                                        <ViewProfile id={trainee._id} img={trainee.image} name={trainee.firstname} title={trainee.firstname} profile={trainee.lastname}/>
                                    )
                                )

                            }}
                            
                            </Query>
                                </div>

        </>
    )
}