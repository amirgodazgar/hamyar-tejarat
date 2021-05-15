import React from "react";
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
  Typography,
} from "@material-ui/core";
import Button from "../../../common/button/Button";

const TariffCodeList = () => {
  const tariffCodeRows = [
    {
      merchandiseFa: "اسب، الاغ، قاطر و استر، زنده",
      merchandiseEng: "Live horses, asses, mules and hinnies",
      tariffCode: "0101",
    },
    {
      merchandiseFa: "اسب، الاغ، قاطر و استر، زنده",
      merchandiseEng: "Live horses, asses, mules and hinnies",
      tariffCode: "0101",
    },
    {
      merchandiseFa: "اسب، الاغ، قاطر و استر، زنده",
      merchandiseEng: "Live horses, asses, mules and hinnies",
      tariffCode: "0101",
    },
    {
      merchandiseFa: "اسب، الاغ، قاطر و استر، زنده",
      merchandiseEng: "Live horses, asses, mules and hinnies",
      tariffCode: "0101",
    },
    {
      merchandiseFa: "اسب، الاغ، قاطر و استر، زنده",
      merchandiseEng: "Live horses, asses, mules and hinnies",
      tariffCode: "0101",
    },
  ];

  return (
    <Grid
      container
      spacing={3}
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11}>
        <Typography variant="h4" color="primary">
          لیست کد تعرفه کالا
        </Typography>
      </Grid>
      <Grid item container spacing={1} xs={11}>
        <Paper className={classes.mainPaper}>
          <Grid item container spacing={3} xs={12}>
            <Grid item xs={12} className={classes.searchContainer}>
              <div className={classes.searchBox}>
                <Typography className={classes.searchTitle} variant="body1">
                  جستجو براساس کد کالا
                </Typography>
                <div className={classes.search}>
                  <input type="text" placeholder="0101" />
                  <Button customizeClass="tariffSearch" type="submit">
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
                    type="text"
                    placeholder="اسب، الاغ، قاطر و استر، زنده"
                  />
                  <Button customizeClass="tariffSearch" type="submit">
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
                          <TableCell>شرح کالا</TableCell>
                          <TableCell>شرح انگلیسی کالا</TableCell>
                          <TableCell>کد تعرفه</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tariffCodeRows.map((row, index) => (
                          <TableRow key={index} className={classes.tableRow}>
                            <TableCell>{row.merchandiseFa}</TableCell>
                            <TableCell>{row.merchandiseEng}</TableCell>
                            <TableCell>{row.tariffCode}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TariffCodeList;
