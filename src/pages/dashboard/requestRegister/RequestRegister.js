import React, { useEffect, memo } from "react";
import classes from "./requestRegister.module.css";
import { Grid, Typography } from "@material-ui/core";
import { adminPanelData } from "../../../constant/adminPanel";
import { useHistory } from "react-router-dom";
import Import from "./import/Import";

const RequestRegister = ({ backToTab }) => {
  let history = useHistory();

  useEffect(() => {
    backToTab(3);
    history.push("/Dashboard/requestRegister");
  }, []);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11} className={classes.mainTitle}>
        <Typography variant="h4" color="primary">
          {adminPanelData.requestRegister.title}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Import />
      </Grid>
    </Grid>
  );
};

export default memo(RequestRegister);
