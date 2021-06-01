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
import { getProposalsList } from "../../../services/dashboard/userInfoServices";
import { dateToPersian } from "../../../helper/general";
import { useHistory, useParams } from "react-router";
import BackDrop from "../../../common/backDrop/BackDrop";
import UserCheckBackDrop from "../../../common/backDrop/UserCheckBackDrop";

const ClearanceProposalList = ({ backToTab }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageData, setPageData] = useState([]);
  const history = useHistory();
  const { id } = useParams();
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
    getProposalsList(curPage, rowsPerPage).then((res) => {
      setPageData(res.results);
      setIsLoading(false);
    });
    backToTab(1);
    history.push(`/Dashboard/quotationProposalsListAsync/quotationRequestList`);
  }, []);

  const rows = pageData !== undefined ? pageData : [];

  const showDetailHandler = (proposalId) => {
    history.push(
      `/Dashboard/quotationProposalsListAsync/quotationRequestDetail/${proposalId}`
    );
  };

  console.log(isLoading);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11} className={classes.mainTitle}>
        <Typography variant="h4" color="primary">
          لیست پیشنهاد ها
        </Typography>
      </Grid>
      {isLoading ? (
        <BackDrop />
      ) : (
        <>
          {pageData.length === 0 ? (
            <UserCheckBackDrop
              setRoute="/Dashboard/getQuotationRequestList/SearchAllQuotationRequests"
              severity="warning"
              message="هیچ پیشنهادی ثبت نشده است (برای ثبت پیشنهاد کلیک کنید)"
              reload={false}
            />
          ) : (
            <Grid item container spacing={1} xs={11}>
              <Grid item container xs={12}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div className={classes.header}>
                      <Typography className={classes.title} variant="h6">
                        جدیدترین پیشنهاد ها
                      </Typography>
                      <div className={classes.link}></div>
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
                                    تعداد روزهای تخمین زده شده
                                  </TableCell>

                                  <TableCell
                                    variant="head"
                                    className={classes.tableHeader}
                                  >
                                    مبلغ پیشنهادی
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
                                .map((row) => (
                                  <TableRow
                                    key={row.id}
                                    className={classes.tableRow}
                                    onClick={() =>
                                      showDetailHandler(row.quotationRequestId)
                                    }
                                  >
                                    <TableCell>
                                      {Number(
                                        row.estimatedNumberOfDays
                                      ).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                      {Number(row.price).toLocaleString()}
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
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default ClearanceProposalList;
