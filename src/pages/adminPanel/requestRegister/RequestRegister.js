import React, { useEffect } from "react";
import classes from "./requestRegister.module.css";
import { Grid, Typography } from "@material-ui/core";
import { adminPanelData } from "../../../constant/adminPanel";
import { useHistory } from "react-router-dom";
import Import from "./import/Import";

const RequestRegister = ({ backToTab }) => {
  let history = useHistory();

  useEffect(() => {
    backToTab(3);
    history.push("/adminPanel/requestRegister");
  },[]);

  return (
    <Grid
      container
      spacing={3}
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11}>
        <Typography variant="h4" color="primary">
          {adminPanelData.requestRegister.title}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Import/>
      </Grid>
    </Grid>
  );
};

export default RequestRegister;
