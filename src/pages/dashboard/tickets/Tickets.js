import React, { memo } from "react";
import classes from "./tickets.module.css";
import { Alert } from "@material-ui/lab";
import { Grid, Typography } from "@material-ui/core";

const Tickets = () => {
  return (
    <Grid
      container
      justify="center"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11} className={classes.mainTitle}>
        <Typography variant="h4" color="primary">
          تیکت ها
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

export default memo(Tickets);
