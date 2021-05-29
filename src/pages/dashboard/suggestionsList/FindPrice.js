import React, { useEffect, useState } from "react";
import classes from "./suggestionsList.module.css";
import { Alert } from "@material-ui/lab";
import {
  Grid,
  // Fade,
  // Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { ArrowBackIosRounded } from "@material-ui/icons";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import { getSuggestionsListData } from "../../../services/dashboard/userInfoServices";
import { dateToPersian } from "../../../helper/general";
import { useHistory } from "react-router";
import BackDrop from "../../../common/backDrop/BackDrop";

const FindPrice = ({ backToTab }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageData, setPageData] = useState([]);
  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let curPage = page === 0 ? 1 : page;
    getSuggestionsListData(curPage, rowsPerPage).then((res) => {
      setPageData(res.results);
    });
    backToTab(1);
    history.push("/Dashboard/suggestionsList/quotationRequestList");
  }, []);

  const rows = pageData !== undefined ? pageData : [];

  const showDetailHandler = (requestId) => {
    history.push(
      `/Dashboard/suggestionsList/singleQuotationRequest/${requestId}`
    );
  };

  // const initialValues = {
  //   first: "",
  //   second: "",
  //   third: "",
  // };

  // const validationSchema = Yup.object({
  //   first: Yup.string().required("فیلد را پر کنید"),
  //   second: Yup.string().required("فیلد را پر کنید"),
  //   third: Yup.mixed().required("انتخاب کنید"),
  // });

  // const onSubmit = (values) => {
  //   const userInfo = {
  //     first: values.first,
  //     second: values.second,
  //     third: values.third,
  //   };
  //   console.log(userInfo);
  // };
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //   validationSchema,
  // });

  // const clearHandler = () => {
  //   formik.values.first = "";
  //   formik.values.second = "";
  //   formik.values.third = "";
  // };

  // const errorBox = (name, label) => (
  //   <div className={classes.errorBox}>
  //     <label htmlFor={name}>{label}</label>
  //     {formik.touched[name] && formik.errors[name] ? (
  //       <Fade
  //         in={formik.touched[name] && formik.errors[name] ? true : false}
  //         timeout={400}
  //       >
  //         <div className={classes.error}>{formik.errors[name]}</div>
  //       </Fade>
  //     ) : null}
  //   </div>
  // );

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
      {pageData.length === 0 || pageData === undefined ? (
        <BackDrop />
      ) : (
        <Grid item container spacing={1} xs={11}>
          {/* <Paper className={classes.mainPaper}> */}
          <Grid
            item
            container
            // spacing={3}
            xs={12}
          >
            {/* <Grid item xs={12}>
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
            </Grid> */}

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div className={classes.priceHeader}>
                  <Typography className={classes.priceTitle} variant="h6">
                    جدیدترین درخواست ها
                  </Typography>
                </div>
                <div className={classes.body}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {rows.length !== 0 ? (
                            <>
                              <TableCell
                                variant="head"
                                className={classes.tableHeader}
                              >
                                {""}
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
                                تعداد پیشنهاد
                              </TableCell>
                              <TableCell
                                variant="head"
                                className={classes.tableHeader}
                              >
                                شرح در خواست
                              </TableCell>
                              <TableCell
                                variant="head"
                                className={classes.tableHeader}
                              >
                                تاریخ ثبت
                              </TableCell>
                            </>
                          ) : (
                            <TableCell
                              variant="head"
                              className={classes.tableHeader}
                            ></TableCell>
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.length !== 0 ? (
                          rows
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
                              <TableRow
                                key={row.quotationRequestsId}
                                className={classes.tableRow}
                                onClick={() =>
                                  showDetailHandler(row.quotationRequestsId)
                                }
                              >
                                <TableCell>
                                  {/* <div className={classes.businessMan}>
                                    <Avatar src={avatarImg} />
                                  </div> */}
                                </TableCell>
                                <TableCell>{row.cargoTitle}</TableCell>
                                <TableCell>{row.proposalsCount}</TableCell>
                                <TableCell>{row.requestDescription}</TableCell>

                                <TableCell>
                                  <div className={classes.fixCell}>
                                    <p>{dateToPersian(row.submitDate)}</p>
                                    <ArrowBackIosRounded fontSize="small" />
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                        ) : (
                          <Alert variant="standard" severity="info">
                            موردی یافت نشد دوباره جستجو کنید
                          </Alert>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    className={classes.tablePagination}
                    rowsPerPageOptions={[
                      10,
                      25,
                      50,
                      { value: 999999999, label: "همه" },
                    ]}
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
          {/* </Paper> */}
        </Grid>
      )}
    </Grid>
  );
};

export default FindPrice;
