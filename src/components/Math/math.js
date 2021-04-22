import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { makeStyles } from "@material-ui/core/styles";

import ViewProfile from "./../Trainee/viewProfile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    margin: "20px",
    color: "black",
  },
}));

export default function Math(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Query
          query={gql`
            {
              getAllTrainees {
                _id
                email
                firstname
                lastname
                image
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;

            if (error) return <p>Error...</p>;

            return data.getAllTrainees.map((trainee) => (
              <ViewProfile
                id={trainee._id}
                img={trainee.image}
                name={trainee.firstname}
                title={trainee.firstname}
                profile={trainee.lastname}
              />
            ));
          }}
        </Query>
      </div>
    </>
  );
}
