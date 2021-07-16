import React, { useState, useEffect, memo } from "react";
import classes from "./TariffCodeList.module.css";
import {
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";

import { useHistory } from "react-router";
import BackDrop from "../../../common/backDrop/BackDrop";
import { Autocomplete, Pagination } from "@material-ui/lab";
import { debounce } from "lodash";
import { useRef } from "react";
import { searchCargoByTerm } from "../../../services/dashboard/userInfoServices";
import { SearchRounded } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    flexDirection: "row",
    padding: "0",
    "& .MuiAutocomplete-inputRoot": {
      padding: "0 .5rem",
      outline: "none",
      border: "none",
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
    },
  },
});

const TariffCodeList = ({ backToTab }) => {
  let history = useHistory();
  const styles = useStyles();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState([]);
  const [page, setPage] = React.useState(1);
  const [userQuery, setUserQuery] = useState("");
  const [searchCargo, setSearchCargo] = useState([]);

  const delayQuery = useRef(
    debounce(
      (q) =>
        searchCargoByTerm(q).then((res) => {
          setSearchCargo(res);
          setLoading(false);
        }),
      500
    )
  ).current;

  const searchCargoHandler = (e, value) => {
    setUserQuery(e.target.value);
    delayQuery(e.target.value);
    setSearchText(value);
  };

  useEffect(() => {
    backToTab(6);
    history.push("/Dashboard/tariffCodesList");
  }, []);

  const searchCargoList =
    !searchCargo || searchCargo.length === 0
      ? [{ id: "موردی پیدا نشد", persianCargoDescription: "موردی پیدا نشد" }]
      : searchCargo;

  const handleChange = (event, value) => {
    setPage(value);
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
      {!searchCargoList || searchCargoList.length === 0 ? (
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
                    <Autocomplete
                      loading={loading}
                      loadingText="جستجو کنید..."
                      className={styles.root}
                      freeSolo
                      disableClearable
                      onChange={(e, value) => setSearchText(e, value)}
                      endadornment={
                        <InputAdornment position="end">
                          <SearchRounded />
                        </InputAdornment>
                      }
                      options={searchCargoList.map((option) => option.id)}
                      renderInput={(params) => (
                        <TextField
                          className={`${classes.searchInput} ${styles.root}`}
                          {...params}
                          value={userQuery}
                          onChange={(e, value) => searchCargoHandler(e, value)}
                          placeholder="جستجو کنید"
                          name="searchCargo"
                          margin="none"
                          type="search"
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            type: "searchCargo",
                            endAdornment: (
                              <SearchRounded
                                color="primary"
                                className={classes.searchIcon}
                              />
                            ),
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={classes.searchBox}>
                  <Typography className={classes.searchTitle} variant="body1">
                    جستجو براساس نام کالا
                  </Typography>
                  <div className={classes.search}>
                    <Autocomplete
                      loading={loading}
                      loadingText="جستجو کنید..."
                      className={styles.root}
                      freeSolo
                      disableClearable
                      onChange={(e, value) => setSearchText(e, value)}
                      endadornment={
                        <InputAdornment position="end">
                          <SearchRounded />
                        </InputAdornment>
                      }
                      options={searchCargoList.map(
                        (option) => option.persianCargoDescription
                      )}
                      renderInput={(params) => (
                        <TextField
                          className={`${classes.searchInput} ${styles.root}`}
                          {...params}
                          value={userQuery}
                          onChange={(e, value) => searchCargoHandler(e, value)}
                          placeholder="جستجو کنید"
                          name="searchCargo"
                          margin="none"
                          type="search"
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            type: "searchCargo",
                            endAdornment: (
                              <SearchRounded
                                color="primary"
                                className={classes.searchIcon}
                              />
                            ),
                          }}
                        />
                      )}
                    />
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
                          {searchCargoList.length !== 0 ||
                          searchCargoList === null ? (
                            searchCargoList
                              .slice((page - 1) * 5, page * 5)
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
                    <Pagination
                      style={{
                        padding: "2rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      count={
                        searchCargoList.length % 5 === 0
                          ? Number((searchCargoList.length / 5).toFixed())
                          : Number((searchCargoList.length / 5).toFixed())
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

export default memo(TariffCodeList);
