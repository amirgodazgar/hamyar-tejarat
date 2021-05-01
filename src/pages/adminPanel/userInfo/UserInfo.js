import React, { useEffect } from "react";
import classes from "./userInfo.module.css";
import { Grid, Paper, Typography } from "@material-ui/core";
import { adminPanelData } from "../../../constant/adminPanel";
import { useDispatch, useSelector } from "react-redux";
import PrivateClearanceMan from "./clearanceMan/PrivateClearanceMan";
import { useHistory } from "react-router-dom";

const UserInfo = ({ backToTab }) => {
  let history = useHistory();

  useEffect(() => {
    backToTab(4);
    history.push("/adminPanel/userInfo");
  }, []);

  const role = useSelector((state) => state.auth.role);

  let rolType;

  switch (true) {
    case role.privateBusinessMan:
      rolType = "privateBusinessMan";
      break;
    case role.juridicalBusinessMan:
      rolType = "juridicalBusinessMan";
      break;
    case role.privateClearanceMan:
      rolType = <PrivateClearanceMan backToDashboard={backToTab} />;
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
