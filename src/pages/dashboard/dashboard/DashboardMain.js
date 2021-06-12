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

 {/* <Grid
          item
          xs={12}
          container
          justify="space-between"
          className={classes.staticBox}
        >
          <Grid className={classes.ticketsRows}>
            <Paper className={classes.paper}>
              <div className={classes.header}>
                <Typography className={classes.title} variant="h6">
                  جدیدترین تیکت ها
                </Typography>
                <span className={classes.link}>
                  <Typography variant="body2">مشاهده همه</Typography>
                  <ArrowBackIos fontSize="small" />
                </span>
              </div>
              <div className={classes.body}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          variant="head"
                          className={classes.tableHeader}
                        >
                          شناسه تیکت
                        </TableCell>
                        <TableCell
                          variant="head"
                          className={classes.tableHeader}
                        >
                          موضوع
                        </TableCell>
                        <TableCell
                          variant="head"
                          className={classes.tableHeader}
                        >
                          تاریخ ثبت
                        </TableCell>
                        <TableCell
                          variant="head"
                          className={classes.tableHeader}
                        >
                          وضعیت تیکت
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ticketRows.map((row, index) => (
                        <TableRow
                          key={index}
                          className={classes.tableRow}
                          hover
                        >
                          <TableCell>{row.ticketId}</TableCell>
                          <TableCell>{row.subject}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell className={classes.statusCell}>
                            <div
                              className={`${classes.status} ${
                                classes[row.status.color]
                              }`}
                            ></div>
                            <div className={classes.statusText}>
                              {row.status.text}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Paper>
          </Grid>
          <Grid className={classes.newsRows}>
            <Paper className={classes.paper}>
              <div className={classes.header}>
                <Typography className={classes.title} variant="h6">
                  آخرین اخبار و اطلاعیه ها
                </Typography>
                <span className={classes.link}>
                  <Typography variant="body2">مشاهده همه</Typography>
                  <ArrowBackIos fontSize="small" />
                </span>
              </div>
              <div className={classes.body}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          variant="head"
                          className={classes.tableHeader}
                        >
                          عنوان
                        </TableCell>
                        <TableCell
                          variant="head"
                          className={classes.tableHeader}
                        >
                          تاریخ{" "}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {newsRows.map((row, index) => (
                        <TableRow
                          key={index}
                          className={classes.tableRow}
                          hover
                        >
                          <TableCell>{row.subject}</TableCell>
                          <TableCell>{row.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Paper>
          </Grid>
        </Grid> */}
