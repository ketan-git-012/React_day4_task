import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import trainees from "./Trainees";
import ViewProfile from "./viewProfile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    margin: "20px",
  },
}));

export default function TraineeList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {trainees.map((trainee) => {
        return (
          <ViewProfile
            id={trainee.id}
            img={trainee.image}
            name={trainee.name}
            title={trainee.name}
            profile={trainee.profile}
          />
        );
      })}
    </div>
  );
}
