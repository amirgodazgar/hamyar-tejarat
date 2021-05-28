import React, { useEffect, useState } from "react";
import classes from "./suggestionsList.module.css";
import {
  Grid,
  Fade,
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
import { ClearRounded, ArrowBackIos } from "@material-ui/icons";
import InputField from "../../../common/input/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import avatarImg from "../../../styles/image/profile-image.svg";
import { getSuggestionsListData } from "../../../services/dashboard/userInfoServices";

const FindPrice = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pageData , setPageData] = useState(null)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getSuggestionsListData(1 , 10)
    .then(res => {
      setPageData(res)
      console.log(res)
    })
  }, []);

  // currentPage: 1
  // pageSize: 10
  // results: (2)
  // cargoTitle: "اسب"
  // proposalsCount: 0
  // quotationRequestsId: "8dbf4602-541f-4882-9a82-be624baf968b"
  // requestDescription: "درخواست استعلام قیمت برای 20 اسب از مسیر حمل‌ و نقل دریایی"
  // submitDate: "2021-05-27T17:17:21.575063"

  const rows = [
    {


  // cargoTitle: "اسب"
  // proposalsCount: 0
  // quotationRequestsId: "8dbf4602-541f-4882-9a82-be624baf968b"
  // requestDescription: "درخواست استعلام قیمت برای 20 اسب از مسیر حمل‌ و نقل دریایی"
  // submitDate: "2021-05-27T17:17:21.575063"


      businessMan: "شرکت لوازم پزشکی ایرانیان",
      title: "لوازم پزشکی",
      type: "برای تحقیقات (پزشکی، آزمایشگاهی ‌و سرم سازی) ",
      loadingOrigin: "فرودگاه امام خمینی",
      conveyance: "هواپیما",
      date: "1400/01/20",
    },
    {
      businessMan: "شرکت لوازم پزشکی ایرانیان",
      title: "لوازم پزشکی",
      type: "برای تحقیقات (پزشکی، آزمایشگاهی ‌و سرم سازی) ",
      loadingOrigin: "فرودگاه امام خمینی",
      conveyance: "هواپیما",
      date: "1400/01/20",
    },
    {
      businessMan: "شرکت لوازم پزشکی ایرانیان",
      title: "لوازم پزشکی",
      type: "برای تحقیقات (پزشکی، آزمایشگاهی ‌و سرم سازی) ",
      loadingOrigin: "فرودگاه امام خمینی",
      conveyance: "هواپیما",
      date: "1400/01/20",
    },
    {
      businessMan: "شرکت لوازم پزشکی ایرانیان",
      title: "لوازم پزشکی",
      type: "برای تحقیقات (پزشکی، آزمایشگاهی ‌و سرم سازی) ",
      loadingOrigin: "فرودگاه امام خمینی",
      conveyance: "هواپیما",
      date: "1400/01/20",
    },
    {
      businessMan: "شرکت لوازم پزشکی ایرانیان",
      title: "لوازم پزشکی",
      type: "برای تحقیقات (پزشکی، آزمایشگاهی ‌و سرم سازی) ",
      loadingOrigin: "فرودگاه امام خمینی",
      conveyance: "هواپیما",
      date: "1400/01/20",
    },
    {
      businessMan: "شرکت لوازم پزشکی ایرانیان",
      title: "لوازم پزشکی",
      type: "برای تحقیقات (پزشکی، آزمایشگاهی ‌و سرم سازی) ",
      loadingOrigin: "فرودگاه امام خمینی",
      conveyance: "هواپیما",
      date: "1400/01/20",
    },
    {
      businessMan: "شرکت لوازم پزشکی ایرانیان",
      title: "لوازم پزشکی",
      type: "برای تحقیقات (پزشکی، آزمایشگاهی ‌و سرم سازی) ",
      loadingOrigin: "فرودگاه امام خمینی",
      conveyance: "هواپیما",
      date: "1400/01/20",
    },
    {
      businessMan: "شرکت لوازم پزشکی ایرانیان",
      title: "لوازم پزشکی",
      type: "برای تحقیقات (پزشکی، آزمایشگاهی ‌و سرم سازی) ",
      loadingOrigin: "فرودگاه امام خمینی",
      conveyance: "هواپیما",
      date: "1400/01/20",
    },
  ];

  const initialValues = {
    first: "",
    second: "",
    third: "",
  };

  const validationSchema = Yup.object({
    first: Yup.string().required("فیلد را پر کنید"),
    second: Yup.string().required("فیلد را پر کنید"),
    third: Yup.mixed().required("انتخاب کنید"),
  });

  const onSubmit = (values) => {
    const userInfo = {
      first: values.first,
      second: values.second,
      third: values.third,
    };
    console.log(userInfo);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const clearHandler = () => {
    formik.values.first = "";
    formik.values.second = "";
    formik.values.third = "";
  };

  const errorBox = (name, label) => (
    <div className={classes.errorBox}>
      <label htmlFor={name}>{label}</label>
      {formik.touched[name] && formik.errors[name] ? (
        <Fade
          in={formik.touched[name] && formik.errors[name] ? true : false}
          timeout={400}
        >
          <div className={classes.error}>{formik.errors[name]}</div>
        </Fade>
      ) : null}
    </div>
  );

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11} className={classes.mainTitle}>
        <Typography variant="h4" color="primary">
          درخواست استعلام قیمت
        </Typography>
      </Grid>
      <Grid item container spacing={1} xs={11}>
        <Paper className={classes.mainPaper}>
          <Grid item container spacing={3} xs={12}>
            <Grid item xs={12}>
              <form
                onSubmit={formik.handleSubmit}
                className={classes.inputContainer}
              >
                <div className={classes.inputBox}>
                  <InputField
                    customizeLabel="userInfo_label"
                    customizeInput="userInfo_input"
                    formik={formik}
                    name="first"
                    type="text"
                    label="فیلتر اول"
                    placeHolder="فیلتر اول"
                  />
                </div>
                <div className={classes.inputBox}>
                  <InputField
                    customizeLabel="userInfo_label"
                    customizeInput="userInfo_input"
                    formik={formik}
                    name="second"
                    type="text"
                    label="فیلتر دوم"
                    placeHolder="فیلتر دوم"
                  />
                </div>
                <div className={classes.inputBox}>
                  {errorBox("third", "فیلتر سوم")}
                  <select
                    name="third"
                    value={formik.values.third}
                    onChange={formik.handleChange}
                    className={`${classes.selectedInput}  ${
                      formik.touched.third &&
                      formik.errors.third &&
                      formik.values.third === "0"
                        ? classes.inputError
                        : null
                    } `}
                  >
                    {[
                      { label: "انتخاب کنید", value: "0" },
                      { label: " بازارچه پرویزخان", value: "بازارچه پرویزخان" },
                      { label: " بازارچه پرویزخان", value: "بازارچه پرویزخان" },
                      { label: " بازارچه پرویزخان", value: "بازارچه پرویزخان" },
                    ].map((option, index) => (
                      <option
                        style={
                          option.value === "0"
                            ? { color: "rgba(0,0,0,0.4)" }
                            : null
                        }
                        value={option.value}
                        label={option.label}
                        key={index}
                      />
                    ))}
                  </select>
                </div>
                <div className={classes.btnBox}>
                  <button className={classes.filterBtn} type="submit">
                    اعمال فیلتر
                  </button>
                  <button className={classes.clearBtn} onClick={clearHandler}>
                    <ClearRounded fontSize="large" />
                  </button>
                </div>
              </form>
            </Grid>

            <Grid item xs={12}>
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
                          <TableCell
                            variant="head"
                            className={classes.tableHeader}
                          >
                            تاجر
                          </TableCell>
                          <TableCell
                            variant="head"
                            className={classes.tableHeader}
                          >
                            عنوان کالا
                          </TableCell>
                          <TableCell
                            variant="head"
                            className={classes.tableHeader}
                          >
                            {" "}
                            جنس و نوع کالا{" "}
                          </TableCell>
                          <TableCell
                            variant="head"
                            className={classes.tableHeader}
                          >
                            مبدا بارگیری
                          </TableCell>
                          <TableCell
                            variant="head"
                            className={classes.tableHeader}
                          >
                            {" "}
                            وسیله حمل{" "}
                          </TableCell>
                          <TableCell
                            variant="head"
                            className={classes.tableHeader}
                          >
                            {" "}
                            تاریخ ثبت{" "}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => (
                            <TableRow key={index} className={classes.tableRow}>
                              <TableCell>
                                <div className={classes.businessMan}>
                                  <Avatar src={avatarImg} />
                                  <p>{row.businessMan}</p>
                                </div>
                              </TableCell>
                              <TableCell>{row.title}</TableCell>
                              <TableCell>{row.type}</TableCell>
                              <TableCell>{row.loadingOrigin}</TableCell>
                              <TableCell>{row.conveyance}</TableCell>
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
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FindPrice;
