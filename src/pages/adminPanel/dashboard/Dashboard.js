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
import { Alert } from "@material-ui/lab";
import React from "react";
import { ArrowBackIos } from "@material-ui/icons";

const Dashboard = () => {
  const [open, setOpen] = React.useState(true);
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
      cardType = "";
      break;
    case "clearanceMan":
      cardType = "";
      break;

    default:
      cardType = null;
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
          داشبورد
        </Typography>
      </Grid>

      <Grid item xs={11}>
        <Collapse in={open}>
          <Alert
            onClose={() => setOpen(false)}
            severity="warning"
            className={classes.alert}
          >
            کاربر گرامی برای استفاده کامل از خدمات سایت همیار تجارت باید پروفایل
            و مدارک خود را کامل کنید
          </Alert>
        </Collapse>
      </Grid>
      <Grid
        item
        xs={11}
        container
        justify="space-between"
        className={classes.staticBox}
      >
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <div className={classes.header}>
              <Typography className={classes.title} variant="h6">
                جدیدترین تیکت ها
              </Typography>
              <a className={classes.link} href="">
                <Typography variant="body2">مشاهده همه</Typography>
                <ArrowBackIos fontSize="small" />
              </a>
            </div>
            <div className={classes.body}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>شناسه تیکت</TableCell>
                      <TableCell>موضوع</TableCell>
                      <TableCell>تاریخ ثبت</TableCell>
                      <TableCell>وضعیت تیکت</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ticketRows.map((row) => (
                      <TableRow
                        key={`ticket-${row.ticketId}`}
                        className={classes.tableRow}
                        hover={true}
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
                          <span className={classes.statusText}>
                            {row.status.text}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <div className={classes.header}>
              <Typography className={classes.title} variant="h6">
                آخرین اخبار و اطلاعیه ها
              </Typography>
              <a className={classes.link} href="">
                <Typography variant="body2">مشاهده همه</Typography>
                <ArrowBackIos fontSize="small" />
              </a>
            </div>
            <div className={classes.body}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>عنوان</TableCell>
                      <TableCell>تاریخ </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newsRows.map((row, index) => (
                      <TableRow
                        key={`news-${index + 1}`}
                        className={classes.tableRow}
                        hover={true}
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

      <Grid item xs={11} className={classes.dynamicBox}>
        dynamic card
        {/* {cardType} */}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
