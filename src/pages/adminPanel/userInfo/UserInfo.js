import React from "react";
import classes from "./userInfo.module.css";
import { Grid, Paper, Typography } from "@material-ui/core";
import { adminPanelData } from "../../../constant/adminPanel";
import { useDispatch, useSelector } from "react-redux";
import PrivateClearanceMan from "./clearanceMan/PrivateClearanceMan";


const UserInfo = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  let rolType;

  switch (true) {
    case role.privateBusinessMan:
      rolType = "privateBusinessMan";
      break;
    case role.juridicalBusinessMan:
      rolType = "juridicalBusinessMan";
      break;
    case role.privateClearanceMan:
      rolType = <PrivateClearanceMan/>;
      break;
    case role.juridicalClearanceMan:
      rolType = "juridicalClearanceMan";
      break;

    default:
      rolType = null;
      break;
  }

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
          {adminPanelData.userInfo.title}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        {rolType}
      </Grid>
    </Grid>
  );
};

export default UserInfo;
