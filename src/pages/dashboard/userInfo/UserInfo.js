import React, { useEffect } from "react";
import classes from "./userInfo.module.css";
import { Grid, Typography } from "@material-ui/core";
import { adminPanelData } from "../../../constant/adminPanel";
import { useDispatch, useSelector } from "react-redux";
import PrivateClearanceMan from "./clearanceMan/PrivateClearanceMan";
import { useHistory } from "react-router-dom";
import JuridicalClearanceMan from "./clearanceMan/JuridicalClearanceMan";
import JuridicalBusinessMan from "./businessMan/JuridicalBusinessMan";
import PrivateBusinessMan from "./businessMan/PrivateBusinessMan";


const UserInfo = ({ backToTab }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    backToTab(4);
    history.push("/Dashboard/userInfo");
  }, []);

  // const role = useSelector((state) => state.dashBoard.role);
  // const type = useSelector((state) => state.dashBoard.type);
  const PC = null;
  const JC = null;
  const PB = null;
  const JB = null;

  // console.log("USER-INFO", role, type);

  // let rolType = {
  //   role,
  //   type,
  // };

  let User = null;

  switch (true) {
    case PB:
      User = <PrivateBusinessMan backToDashboard={backToTab} />;
      break;
    case JB:
      User = <JuridicalBusinessMan backToDashboard={backToTab} />;
      break;
    case PC:
      User = <PrivateClearanceMan backToDashboard={backToTab} />;
      break;
    case JC:
      User = <JuridicalClearanceMan backToDashboard={backToTab} />;
      break;

    default:
      User = null;
      break;
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11} className={classes.mainTitle}>
        <Typography variant="h4" color="primary">
          {adminPanelData.userInfo.title}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        {User}
      </Grid>
    </Grid>
  );
};

export default UserInfo;
