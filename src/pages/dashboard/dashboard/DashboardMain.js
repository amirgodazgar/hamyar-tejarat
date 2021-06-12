import classes from "./dashboard.module.css";
import { Grid, Typography } from "@material-ui/core";

import React, { useEffect } from "react";
import BusinessMan from "./BusinessMan";
import ClearanceMan from "./ClearanceMan";
import { useHistory } from "react-router";
import Cookies from "js-cookie";

const DashboardMain = ({ backToTab }) => {
  const history = useHistory();

  useEffect(() => {
    backToTab(0);
    history.push("/Dashboard/main");
  }, []);

  let navbarRole = () => {
    return Cookies.getJSON("userInfo") === undefined
      ? history.replace("/register")
      : Cookies.getJSON("userInfo");
  };

  let cardType = null;
  let type = navbarRole().role;
  switch (type) {
    case "Businessman":
      cardType = <BusinessMan />;
      break;
    case "Clearanceman":
      cardType = <ClearanceMan />;
      break;

    default:
      cardType = null;
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
          داشبورد
        </Typography>
      </Grid>

      <Grid item xs={11} className={classes.mainContent}>
        <Grid item xs={12} className={classes.dynamicBox}>
          {cardType}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardMain;
