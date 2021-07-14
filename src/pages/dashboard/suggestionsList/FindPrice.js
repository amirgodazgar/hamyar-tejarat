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
  const [pageData, setPageData] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    let curPage = page === 0 ? 1 : page;
    getSuggestionsListData(curPage, 10).then((res) => {
  
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
              <Grid item container xs={12}>
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
                                .slice((page - 1) * 6, page * 6)
                                .map((row) => (
                                  <TableRow
                                    key={row.id}
                                    className={classes.tableRow}
                                    onClick={() => showDetailHandler(row.id)}
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

export default memo(FindPrice);
