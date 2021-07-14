import React, { memo, useEffect, useState } from "react";
import classes from "./suggestionsList.module.css";
import { Alert, Pagination } from "@material-ui/lab";
import {
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
import { ArrowBackIosRounded } from "@material-ui/icons";
import { getClearanceList } from "../../../services/dashboard/userInfoServices";
import { dateToPersian } from "../../../helper/general";
import { useHistory } from "react-router";
import BackDrop from "../../../common/backDrop/BackDrop";
import UserCheckBackDrop from "../../../common/backDrop/UserCheckBackDrop";

const ClearanceProposalsListAsync = ({ backToTab }) => {
  const [pageData, setPageData] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    let curPage = page === 0 ? 1 : page;
    getClearanceList(curPage, 10).then((res) => {
      setPageData(res.results);
      setIsLoading(false);
    });
    backToTab(1);
    history.push(
      `/Dashboard/quotationProposalsListAsync/ClearanceProposalsListAsync`
    );
  }, []);

  const rows = pageData !== undefined ? pageData : [];

  const showDetailHandler = (clearanceRequestId) => {
    history.push(
      `/Dashboard/quotationProposalsListAsync/ClearanceProposalRequestDetail/${clearanceRequestId}`
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
          لیست پیشنهاد های ترخیص کالا
        </Typography>
      </Grid>
      {isLoading ? (
        <BackDrop />
      ) : (
        <>
          {pageData.length === 0 ? (
            <UserCheckBackDrop
              setRoute="/Dashboard/RequestList/SearchAllQuotationRequests"
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
                        پیشنهادهای ثبت شده توسط شما
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
                                .slice((page - 1) * 6, page * 6)
                                .map((row) => (
                                  <TableRow
                                    key={row.clearanceRequestId}
                                    className={classes.tableRow}
                                    onClick={() =>
                                      showDetailHandler(row.clearanceRequestId)
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
                      <Pagination
                        style={{
                          padding: "2rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        count={
                          rows.length % 5 === 0
                            ? Number((rows.length / 5).toFixed())
                            : Number((rows.length / 5).toFixed())
                        }
                        page={page}
                        onChange={handleChange}
                        color="primary"
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

export default memo(ClearanceProposalsListAsync);
