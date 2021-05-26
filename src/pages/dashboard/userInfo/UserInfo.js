import React, { useEffect } from "react";
import classes from "./userInfo.module.css";
import { Grid, Typography } from "@material-ui/core";
import { adminPanelData } from "../../../constant/adminPanel";
import PrivateClearanceMan from "./clearanceMan/PrivateClearanceMan";
import { useHistory } from "react-router-dom";
import JuridicalClearanceMan from "./clearanceMan/JuridicalClearanceMan";
import JuridicalBusinessMan from "./businessMan/JuridicalBusinessMan";
import PrivateBusinessMan from "./businessMan/PrivateBusinessMan";
import Cookies from "js-cookie";

const UserInfo = ({ backToTab }) => {
  const history = useHistory();
  useEffect(() => {
    backToTab(4);
    history.push("/Dashboard/userInfo");
  }, []);

  let user = Cookies.getJSON("userInfo");

  const PC = user.role === "Clearanceman" && user.type === "Private";
  const JC = user.role === "Clearanceman" && user.type === "Juridical";
  const PB = user.role === "Businessman" && user.type === "Private";
  const JB = user.role === "Businessman" && user.type === "Juridical";

  switch (true) {
    case PB:
      user = <PrivateBusinessMan backToDashboard={backToTab} />;
      break;
    case JB:
      user = <JuridicalBusinessMan backToDashboard={backToTab} />;
      break;
    case PC:
      user = <PrivateClearanceMan backToDashboard={backToTab} />;
      break;
    case JC:
      user = <JuridicalClearanceMan backToDashboard={backToTab} />;
      break;

    default:
      user = null;
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
        {user}
      </Grid>
    </Grid>
  );
};

export default UserInfo;
