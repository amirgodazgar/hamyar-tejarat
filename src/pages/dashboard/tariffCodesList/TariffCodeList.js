import React, { useState, useEffect } from "react";
import classes from "./TariffCodeList.module.css";
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
import Button from "../../../common/button/Button";
import http from "../../../services/httpServices";
import { useHistory } from "react-router";
import BackDrop from "../../../common/backDrop/BackDrop";

const TariffCodeList = ({ backToTab }) => {
  let history = useHistory();

  useEffect(() => {
    backToTab(6);
    history.push("/Dashboard/tariffCodesList");
  }, []);

  const [textSearch, setTextSearch] = useState("");
  const [codeSearch, setCodeSearch] = useState([]);
  const [result, setResult] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDataByText = async (text) => {
    await http
      .get(
        `CustomsCargos/SearchCustomsCargos?persianDescription=${text}&page=1&pageSize=10`
      )
      .then((res) => {
        setResult(res.data.data.results);
      });
  };

  const getDataByCode = async (code) => {
    await http
      .get(
        `https://lunacyst.ir/api/v1/CustomsCargos/SearchCustomsCargos?tariffCode=${code}&page=1&pageSize=10`
      )
      .then((res) => {
        setResult(res.data.data.results);
      });
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
          لیست کد تعرفه کالا
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
                  <Typography className={classes.searchTitle} variant="body1">
                    جستجو براساس کد کالا
                  </Typography>
                  <div className={classes.search}>
                    <input
                      value={codeSearch}
                      onChange={(e) => setCodeSearch(e.target.value)}
                      id="code-search"
                      type="text"
                      placeholder="0202"
                    />
                    <Button
                      click={() => getDataByCode(codeSearch)}
                      customizeClass="tariffSearch"
                      type="submit"
                    >
                      جستجو
                    </Button>
                  </div>
                </div>
                <div className={classes.searchBox}>
                  <Typography className={classes.searchTitle} variant="body1">
                    جستجو براساس نام کالا
                  </Typography>
                  <div className={classes.search}>
                    <input
                      value={textSearch}
                      onChange={(e) => setTextSearch(e.target.value)}
                      id="text-search"
                      type="text"
                      placeholder="گوشت حیوانات از نوع گاو، منجمد."
                    />
                    <Button
                      click={() => getDataByText(textSearch)}
                      customizeClass="tariffSearch"
                      type="submit"
                    >
                      جستجو
                    </Button>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div className={classes.header}>
                    <Typography className={classes.title} variant="h6">
                      لیست کد تعرفه و اولویت های کالاهای گمرکی
                    </Typography>
                  </div>
                  <div className={classes.body}>
                    <TableContainer>
                      <Table>
                        <TableHead className={classes.tableHead}>
                          <TableRow>
                            <TableCell
                              variant="head"
                              className={classes.tableHeader}
                            >
                              شرح کالا
                            </TableCell>
                            <TableCell
                              variant="head"
                              className={classes.tableHeader}
                            >
                              شرح انگلیسی کالا
                            </TableCell>
                            <TableCell
                              variant="head"
                              className={classes.tableHeader}
                            >
                              کد تعرفه
                            </TableCell>
                            <TableCell
                              variant="head"
                              className={classes.tableHeader}
                            ></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {result.length !== 0 || result === null ? (
                            result
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((row, index) => (
                                <TableRow
                                  key={index}
                                  className={classes.tableRow}
                                >
                                  <TableCell className={classes.FaDescription}>
                                    {row.persianCargoDescription}
                                  </TableCell>
                                  <TableCell className={classes.EngDescription}>
                                    {row.englishCargoDescription}
                                  </TableCell>
                                  <TableCell className={classes.tariff}>
                                    {row.id}
                                  </TableCell>
                                  <TableCell className={classes.copyCode}>
                                    <button
                                      className={classes.tariffButton}
                                      onClick={() => {
                                        navigator.clipboard.writeText(row.id);
                                      }}
                                    >
                                      کپی
                                    </button>
                                  </TableCell>
                                </TableRow>
                              ))
                          ) : (
                            <TableRow className={classes.tableRow}>
                              <TableCell className={classes.FaDescription}>
                                اطلاعاتی در دسترس نیست
                              </TableCell>
                              <TableCell className={classes.EngDescription}>
                                اطلاعاتی در دسترس نیست
                              </TableCell>
                              <TableCell className={classes.tariff}>
                                اطلاعاتی در دسترس نیست
                              </TableCell>
                              <TableCell
                                className={classes.copyCode}
                              ></TableCell>
                            </TableRow>
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
                      count={result.length}
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
      )}
    </Grid>
  );
};

export default TariffCodeList;
