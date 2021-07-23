import React, { useState, useEffect, memo } from "react";
import classes from "./submitProposal/submitProposal.module.css";
import styles from "./suggestionsList.module.css";
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
  Button,
  IconButton,
} from "@material-ui/core";
import { ArrowBackIosRounded } from "@material-ui/icons";
import { useHistory } from "react-router";
import BackDrop from "../../../common/backDrop/BackDrop";
import { searchAllClearanceRequests } from "../../../services/dashboard/userInfoServices";
import { ClearRounded } from "@material-ui/icons";
import { dateToPersian } from "../../../helper/general";
import { Alert, Pagination } from "@material-ui/lab";

const SearchAllClearanceRequests = ({ backToTab }) => {
  const [tariffCode, setTariffCode] = useState("");
  const [cargoTitle, setCargoTitle] = useState("");
  const [portOfLoading, setPortOfLoading] = useState("");
  const [transportTools, setTransportTools] = useState(0);
  const [result, setResult] = useState([]);
  const history = useHistory();
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const clearInputs = () => {
    setTariffCode("");
    setCargoTitle("");
    setPortOfLoading("");
    setTransportTools(0);
    filterList("", "", "", "");
  };

  const filterList = async (
    tariffCode,
    cargoTitle,
    portOfLoading,
    transportTools
  ) => {
    const transportToolsDefault = transportTools === 0 ? "" : transportTools;
    await searchAllClearanceRequests(
      page,
      10,
      tariffCode,
      cargoTitle,
      portOfLoading,
      transportToolsDefault
    ).then((res) => {
      setResult(res);
    });
  };

  const rows = result !== undefined ? result : [];

  const showDetailHandler = (proposalId) => {
    history.push(
      `/Dashboard/RequestList/GetClearanceRequestDetail/${proposalId}`
    );
  };

  useEffect(() => {
    backToTab(3);
    history.push("/Dashboard/RequestList/SearchAllClearanceRequests");
    filterList("", "", "", "");
  }, []);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11} className={classes.mainTitle}>
        <Typography variant="h4" color="primary">
          جستجوی درخواست های ترخیص کالا
        </Typography>
      </Grid>
      {!result ? (
        <BackDrop />
      ) : (
        <Grid item container spacing={1} xs={11}>
          <Paper className={classes.mainPaper}>
            <Grid item container spacing={3} xs={12}>
              <Grid item xs={12} className={classes.searchContainer}>
                <div className={classes.searchBox}>
                  <Typography className={classes.boxTitle} variant="body1">
                    جستجو براساس کد کالا
                  </Typography>
                  <div className={classes.inputBox}>
                    <input
                      className={classes.input}
                      value={tariffCode}
                      onChange={(e) => setTariffCode(e.target.value)}
                      type="text"
                      placeholder="0202"
                    />
                  </div>
                </div>
                <div className={classes.searchBox}>
                  <Typography className={classes.boxTitle} variant="body1">
                    جستجو براساس نام کالا
                  </Typography>
                  <div className={classes.inputBox}>
                    <input
                      className={classes.input}
                      value={cargoTitle}
                      onChange={(e) => setCargoTitle(e.target.value)}
                      type="text"
                      placeholder="گوشت حیوانات از نوع گاو، منجمد"
                    />
                  </div>
                </div>
                <div className={classes.searchBox}>
                  <Typography className={classes.boxTitle} variant="body1">
                    مبدا بارگیری
                  </Typography>
                  <div className={classes.inputBox}>
                    <input
                      className={classes.input}
                      value={portOfLoading}
                      onChange={(e) => setPortOfLoading(e.target.value)}
                      type="text"
                      placeholder="بندر انزلی"
                    />
                  </div>
                </div>
                <div className={classes.searchBox}>
                  <Typography className={classes.boxTitle} variant="body1">
                    وسیله حمل کالا
                  </Typography>
                  <div className={classes.inputBox}>
                    <select
                      className={classes.input}
                      value={transportTools}
                      onChange={(e) => setTransportTools(e.target.value)}
                    >
                      <option value={""}>انتخاب همه</option>
                      <option value={1}>حمل و نقل هوایی</option>
                      <option value={2}>حمل و نقل دریایی</option>
                      <option value={3}>حمل و نقل ریلی</option>
                      <option value={4}>حمل و نقل جاده ای</option>
                    </select>
                  </div>
                </div>
                <div className={classes.searchBox}>
                  <div className={classes.searchBtnBox}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.searchBtn}
                      onClick={() =>
                        filterList(
                          tariffCode,
                          cargoTitle,
                          portOfLoading,
                          transportTools
                        )
                      }
                    >
                      اعمال فیلتر
                    </Button>
                    <IconButton
                      className={classes.clearBtn}
                      onClick={clearInputs}
                    >
                      <ClearRounded fontSize="large" />
                    </IconButton>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12}>
                <Paper className={styles.paper}>
                  <div className={styles.header}>
                    <Typography className={styles.title} variant="h6">
                      لیست درخواست ها
                    </Typography>
                    <div
                      className={styles.link}
                      // onClick={() => history.goBack()}
                    >
                      {/* <ArrowForwardIosRounded fontSize="small" /> */}
                      <Typography
                        style={{ marginRight: ".5rem" }}
                        variant="body2"
                      >
                        {/* بازگشت به صفحه قبل */}
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.body}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {rows.length !== 0 ? (
                              <>
                                <TableCell
                                  variant="head"
                                  className={styles.tableHeader}
                                >
                                  نوع کالا
                                </TableCell>
                                <TableCell
                                  variant="head"
                                  className={styles.tableHeader}
                                >
                                  شرح درخواست
                                </TableCell>
                                <TableCell
                                  variant="head"
                                  className={styles.tableHeader}
                                >
                                  تاریخ ثبت
                                </TableCell>
                              </>
                            ) : (
                              <TableCell
                                variant="head"
                                className={styles.tableHeader}
                              ></TableCell>
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody
                          style={
                            rows.length === 0 ? { display: "block" } : null
                          }
                        >
                          {rows.length !== 0 ? (
                            rows.slice((page - 1) * 5, page * 5).map((row) => (
                              <TableRow
                                key={row.clearanceRequestsId}
                                className={styles.tableRow}
                                onClick={() =>
                                  showDetailHandler(row.clearanceRequestsId)
                                }
                              >
                                <TableCell>{row.cargoTitle}</TableCell>
                                <TableCell>{row.requestDescription}</TableCell>

                                <TableCell>
                                  <div className={styles.fixCell}>
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
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default memo(SearchAllClearanceRequests);
