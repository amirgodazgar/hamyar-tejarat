import React, { useEffect } from "react";
import classes from "./userInfo.module.css";
import { Grid, Typography } from "@material-ui/core";
import { adminPanelData } from "../../../constant/adminPanel";
import { useSelector } from "react-redux";
import PrivateClearanceMan from "./clearanceMan/PrivateClearanceMan";
import { useHistory } from "react-router-dom";
import JuridicalClearanceMan from "./clearanceMan/JuridicalClearanceMan";
import JuridicalBusinessMan from "./businessMan/JuridicalBusinessMan";
import PrivateBusinessMan from "./businessMan/PrivateBusinessMan";

const UserInfo = ({ backToTab }) => {
  const history = useHistory();

  useEffect(() => {
    backToTab(4);
    history.push("/adminPanel/userInfo");
  });

  const role = useSelector((state) => state.auth.role);

  let rolType;

  switch (true) {
    case role.privateBusinessMan:
      rolType = <PrivateBusinessMan backToDashboard={backToTab} />;
      break;
    case role.juridicalBusinessMan:
      rolType = <JuridicalBusinessMan backToDashboard={backToTab} />;
      break;
    case role.privateClearanceMan:
      rolType = <PrivateClearanceMan backToDashboard={backToTab} />;
      break;
    case role.juridicalClearanceMan:
      rolType = <JuridicalClearanceMan backToDashboard={backToTab} />;
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
