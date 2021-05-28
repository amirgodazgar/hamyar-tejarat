import React, { useEffect, useState } from "react";
import classes from "./suggestionsList.module.css";
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
  CircularProgress,
} from "@material-ui/core";
import { ArrowBackIosRounded } from "@material-ui/icons";
import { getProposalsListData } from "../../../services/dashboard/userInfoServices";
import { dateToPersian } from "../../../helper/general";
import { useHistory, useParams } from "react-router";
import BackDrop from "../../../common/backDrop/BackDrop";

const ProposalsList = ({ backToTab }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageData, setPageData] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let curPage = page === 0 ? 1 : page;
    getProposalsListData(curPage, rowsPerPage, id).then((res) => {
      setPageData(res.results);
    });
    backToTab(1);
    history.push(`/Dashboard/suggestionsList/quotationProposals/${id}`);
  }, []);

  const rows = pageData !== undefined ? pageData : [];
  const checkClearanceManType = (clearanceMan) => {
    if (clearanceMan === "Juridical") {
      return "حقوقی";
    } else if (clearanceMan === "Private") {
      return "حقیقی";
    }
  };
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
      {pageData.length === 0 ? (
        <BackDrop />
      ) : (
        <Grid item container spacing={1} xs={11}>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div className={classes.header}>
                  <Typography className={classes.title} variant="h6">
                    جدیدترین پیشنهاد ها
                  </Typography>
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
                            ترخیص کار
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
                            تعداد روزهای تخمین زده شده
                          </TableCell>
                          <TableCell
                            variant="head"
                            className={classes.tableHeader}
                          >
                            تاریخ ثبت
                          </TableCell>
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
                                key={row.quotationRequestsId}
                                className={classes.tableRow}
                                onClick={() =>
                                  showDetailHandler(row.quotationRequestsId)
                                }
                              >
                                <TableCell>
                                  {checkClearanceManType(row.clearancemanType)}
                                </TableCell>
                                <TableCell>{row.proposalValue}</TableCell>
                                <TableCell>
                                  {row.estimatedNumberOfDays}
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
                          <CircularProgress color="primary" />
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
    </Grid>
  );
};

export default ProposalsList;
