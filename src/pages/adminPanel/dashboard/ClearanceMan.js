import React from "react";
import classes from "./dashboard.module.css";
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";

const ClearanceMan = () => {
  const rows = [
    {
      transmitter: "شرکت فروش لوازم ساختمانی ایرانیان",
      subject: "درخواست ترخیص 7 تن میلگرد از مسیر زمینی",
      service: "صادرات",
      clearanceLocation: "بازارچه پرويزخان",
      date: "1400/01/20",
    },
  ];
  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h6">
          جدیدترین درخواست ها
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
                <TableCell>موضوع</TableCell>
                <TableCell>نوع خدمت </TableCell>
                <TableCell> گمرک محل ترخیص</TableCell>
                <TableCell> تاریخ</TableCell>
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
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>{row.service}</TableCell>
                  <TableCell>{row.clearanceLocation}</TableCell>
                  <TableCell>
                    <div className={classes.fixCell}>
                      <p>{row.date}</p>
                      <ArrowBackIos fontSize="small" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
               <TableRow>
                  <TablePagination/>
               </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

export default ClearanceMan;
