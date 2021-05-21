import React from "react";
import classes from "./suggestionsList.module.css";
import { Alert } from "@material-ui/lab";
import { Grid, Typography } from "@material-ui/core";

const FindPrice = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11} className={classes.mainTitle}>
        <Typography variant="h4" color="primary">
          درخواست استعلام قیمت
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Alert
          style={{
            width: "70%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="filled"
          color="error"
        >
          amir
        </Alert>
      </Grid>
    </Grid>
  );
};

export default FindPrice;
