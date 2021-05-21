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
  TablePagination,
} from "@material-ui/core";
import avatarImg from "../../../styles/image/profile-image.svg";
import { ArrowBackIos } from "@material-ui/icons";

const ClearanceMan = () => {
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
                <TableCell variant="head" className={classes.tableHeader} >فرستنده</TableCell>
                <TableCell variant="head" className={classes.tableHeader} >موضوع</TableCell>
                <TableCell variant="head" className={classes.tableHeader} >نوع خدمت </TableCell>
                <TableCell variant="head" className={classes.tableHeader} > گمرک محل ترخیص</TableCell>
                <TableCell variant="head" className={classes.tableHeader} > تاریخ</TableCell>
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

export default ClearanceMan;
