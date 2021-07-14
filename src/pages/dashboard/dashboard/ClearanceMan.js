import React, { useState, useEffect, memo } from "react";
import classes from "./dashboard.module.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { ArrowBackIos } from "@material-ui/icons";
import { dateToPersian } from "../../../helper/general";
import { useHistory } from "react-router-dom";
import { getClearancemanDashboardData } from "../../../services/dashboard/userInfoServices";
import BackDrop from "../../../common/backDrop/BackDrop";
import { Pagination } from "@material-ui/lab";

const ClearanceMan = () => {
  const [getData, setGetData] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getClearancemanDashboardData().then((res) => {
      setGetData(res);
      setIsLoading(false);
    });
  }, []);

  const showDetailHandler = (proposalId) => {
    history.push(
      `/Dashboard/quotationProposalsListAsync/quotationRequestDetail/${proposalId}`
    );
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h6">
          آخرین درخواست ها
        </Typography>
        <span
          onClick={() =>
            history.push(
              "/Dashboard/quotationProposalsListAsync/quotationRequestList"
            )
          }
          className={classes.link}
        >
          <Typography variant="body2">مشاهده همه</Typography>
          <ArrowBackIos fontSize="small" />
        </span>
      </div>
      <div className={classes.body}>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head" className={classes.tableHeader}>
                  عنوان کالا
                </TableCell>
                <TableCell variant="head" className={classes.tableHeader}>
                  شرح در خواست
                </TableCell>
                <TableCell variant="head" className={classes.tableHeader}>
                  تاریخ ثبت
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <BackDrop />
            ) : (
              <TableBody>
                {getData.map((row) => (
                  <TableRow
                    key={row.quotationRequestsId}
                    className={classes.tableRow}
                    onClick={() => showDetailHandler(row.quotationRequestsId)}
                  >
                    <TableCell>{row.cargoTitle}</TableCell>
                    <TableCell>{row.requestDescription}</TableCell>
                    <TableCell>
                      <div className={classes.fixCell}>
                        <p>{dateToPersian(row.submitDate)}</p>
                        <ArrowBackIos fontSize="small" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Pagination
          style={{
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          count={1}
          color="primary"
        />
      </div>
    </Paper>
  );
};

export default memo(ClearanceMan);
