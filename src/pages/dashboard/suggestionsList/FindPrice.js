import React, { useEffect, useState } from "react";
import classes from "./suggestionsList.module.css";
import { Alert } from "@material-ui/lab";
import {
  Grid,
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
import { ArrowBackIosRounded } from "@material-ui/icons";
import { getSuggestionsListData } from "../../../services/dashboard/userInfoServices";
import { dateToPersian } from "../../../helper/general";
import { useHistory } from "react-router";
import BackDrop from "../../../common/backDrop/BackDrop";
import UserCheckBackDrop from "../../../common/backDrop/UserCheckBackDrop";

const FindPrice = ({ backToTab }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageData, setPageData] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

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
      setPageData(res.data.results);
      setIsLoading(false);
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
      {isLoading ? (
        <BackDrop />
      ) : (
        <>
          {pageData.length === 0 ? (
            <UserCheckBackDrop
              setRoute="/Dashboard/requestRegister"
              severity="warning"
              message="هیچ درخواستی ثبت نشده است (برای ثبت درخواست کلیک کنید)"
              reload={false}
            />
          ) : (
            <Grid item container spacing={1} xs={11}>
              {/* <Paper className={classes.mainPaper}> */}
              <Grid
                item
                container
                // spacing={3}
                xs={12}
              >
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.priceHeader}>
                      <Typography className={classes.priceTitle} variant="h6">
                        درخواست های ثبت شده توسط شما
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
                                    <TableCell></TableCell>
                                    <TableCell>{row.cargoTitle}</TableCell>
                                    <TableCell>{row.proposalsCount}</TableCell>
                                    <TableCell>
                                      {row.requestDescription}
                                    </TableCell>

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
        </>
      )}
    </Grid>
  );
};

export default FindPrice;
