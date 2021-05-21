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
  TablePagination,
  Typography,
} from "@material-ui/core";
import avatarImg from "../../../styles/image/profile-image.svg";
import { ArrowBackIos } from "@material-ui/icons";

const BusinessMan = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
        <span className={classes.link}>
          <Typography variant="body2">مشاهده همه</Typography>
          <ArrowBackIos fontSize="small" />
        </span>
      </div>
      <div className={classes.body}>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head" className={classes.tableHeader}>
                  فرستنده
                </TableCell>
                <TableCell variant="head" className={classes.tableHeader}>
                  شناسه درخواست
                </TableCell>
                <TableCell variant="head" className={classes.tableHeader}>
                  مبلغ پیشنهادی (تومان){" "}
                </TableCell>
                <TableCell variant="head" className={classes.tableHeader}>
                  {" "}
                  تاریخ
                </TableCell>
                <TableCell variant="head" className={classes.tableHeader}>
                  {" "}
                  توضیحات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index} className={classes.tableRow}>
                    <TableCell>
                      <div className={classes.transmitter}>
                        <Avatar src={avatarImg} />
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
        <TablePagination
          className={classes.tablePagination}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage="ردیف در هر صفحه"
          labelDisplayedRows={({ from, to }) => `${from}-${to}`}
        />
      </div>
    </Paper>
  );
};

export default BusinessMan;
