import React from "react";
import classes from "./dashboard.module.css";
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";

const BusinessMan = () => {
  const rows = [
    {
      transmitter: "شرکت ترخیص همراه سپاهان ایرانیان",
      requestId: "125278000532",
      cost: 70000000,
      date: "1400/01/20",
      description:
        "انجام روند ترخیص در 10 روز کاری و به همراه بیمه کامل کانتیرها",
    },
    {
      transmitter: "شرکت ترخیص همراه سپاهان ایرانیان",
      requestId: "125278000532",
      cost: 70000000,
      date: "1400/01/20",
      description:
        "انجام روند ترخیص در 10 روز کاری و به همراه بیمه کامل کانتیرها",
    },
    {
      transmitter: "شرکت ترخیص همراه سپاهان ایرانیان",
      requestId: "125278000532",
      cost: 70000000,
      date: "1400/01/20",
      description:
        "انجام روند ترخیص در 10 روز کاری و به همراه بیمه کامل کانتیرها",
    },
    {
      transmitter: "شرکت ترخیص همراه سپاهان ایرانیان",
      requestId: "125278000532",
      cost: 70000000,
      date: "1400/01/20",
      description:
        "انجام روند ترخیص در 10 روز کاری و به همراه بیمه کامل کانتیرها",
    },
    {
      transmitter: "شرکت ترخیص همراه سپاهان ایرانیان",
      requestId: "125278000532",
      cost: 70000000,
      date: "1400/01/20",
      description:
        "انجام روند ترخیص در 10 روز کاری و به همراه بیمه کامل کانتیرها",
    },
    {
      transmitter: "شرکت ترخیص همراه سپاهان ایرانیان",
      requestId: "125278000532",
      cost: 70000000,
      date: "1400/01/20",
      description:
        "انجام روند ترخیص در 10 روز کاری و به همراه بیمه کامل کانتیرها",
    },
    {
      transmitter: "شرکت ترخیص همراه سپاهان ایرانیان",
      requestId: "125278000532",
      cost: 70000000,
      date: "1400/01/20",
      description:
        "انجام روند ترخیص در 10 روز کاری و به همراه بیمه کامل کانتیرها",
    },
    {
      transmitter: "شرکت ترخیص همراه سپاهان ایرانیان",
      requestId: "125278000532",
      cost: 70000000,
      date: "1400/01/20",
      description:
        "انجام روند ترخیص در 10 روز کاری و به همراه بیمه کامل کانتیرها",
    },
  ];

  return (
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
                <TableCell>فرستنده</TableCell>
                <TableCell>شناسه درخواست</TableCell>
                <TableCell>مبلغ پیشنهادی (تومان) </TableCell>
                <TableCell> تاریخ</TableCell>
                <TableCell> توضیحات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={`ticket-${row.ticketId}`}
                  className={classes.tableRow}
                >
                  <TableCell>
                    <div className={classes.transmitter}>
                      <Avatar />
                      <p>{row.transmitter}</p>
                    </div>
                  </TableCell>
                  <TableCell>{row.requestId}</TableCell>
                  <TableCell>{row.cost.toLocaleString()}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <div className={classes.fixCell}>
                      <p>{row.description}</p>
                      <ArrowBackIos fontSize="small" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

export default BusinessMan;
