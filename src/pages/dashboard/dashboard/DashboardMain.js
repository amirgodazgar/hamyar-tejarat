import classes from "./dashboard.module.css";
import {
  Collapse,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import React, { useEffect } from "react";
import { ArrowBackIos } from "@material-ui/icons";
import BusinessMan from "./BusinessMan";
import ClearanceMan from "./ClearanceMan";
import { useHistory } from "react-router";

const DashboardMain = ({ backToTab }) => {
  const [open, setOpen] = React.useState(true);
  const history = useHistory();

  useEffect(() => {
    backToTab(0);
    history.push("/Dashboard/main");
  }, []);

  const ticketRows = [
    {
      ticketId: "31254600012",
      subject: "درخواست بررسی مجدد قرارداد شماره 00032",
      date: "1400/01/20",
      status: { color: "pending", text: "در انتظار بررسی" },
    },
    {
      ticketId: "31254600012",
      subject: "درخواست بررسی مجدد قرارداد شماره 00032",
      date: "1400/01/20",
      status: { color: "closed", text: "بسته شده" },
    },
    {
      ticketId: "31254600012",
      subject: "درخواست بررسی مجدد قرارداد شماره 00032",
      date: "1400/01/20",
      status: { color: "open", text: "باز" },
    },
    {
      ticketId: "31254600012",
      subject: "درخواست بررسی مجدد قرارداد شماره 00032",
      date: "1400/01/20",
      status: { color: "closed", text: "بسته شده" },
    },
    {
      ticketId: "31254600012",
      subject: "درخواست بررسی مجدد قرارداد شماره 00032",
      date: "1400/01/20",
      status: { color: "pending", text: "در انتظار بررسی" },
    },
  ];
  const newsRows = [
    {
      subject: "تعیین نرخ ارز توسط بازار",
      date: "1400/01/20",
    },
    {
      subject: "صدور مجوز ورود برای کالاهای ممنوعه",
      date: "1400/01/20",
    },
    {
      subject: "واردات کالا با رمز ارز",
      date: "1400/01/20",
    },
  ];

  let cardType = null;
  let type = "businessMan";
  switch (type) {
    case "businessMan":
      cardType = <BusinessMan />;
      break;
    case "clearanceMan":
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
  
        <Grid
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
        </Grid>

        <Grid item xs={12} className={classes.dynamicBox}>
          {cardType}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardMain;
