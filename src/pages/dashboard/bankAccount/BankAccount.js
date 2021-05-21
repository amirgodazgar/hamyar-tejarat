import React from "react";
import classes from "./bankAccount.module.css";
import { Alert } from "@material-ui/lab";
import { Grid, Typography } from "@material-ui/core";

const BankAccount = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11} className={classes.mainTitle}>
        <Typography variant="h4" color="primary">
          حساب بانکی
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
          ماژول در حال پیاده سازی می باشد
        </Alert>
      </Grid>
    </Grid>
  );
};

export default BankAccount;
