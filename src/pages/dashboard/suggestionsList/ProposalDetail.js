import React, { useEffect, useState } from "react";
import classes from "./suggestionsList.module.css";
import {
  Grid,
  Fade,
  Avatar,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { ArrowForwardIosRounded } from "@material-ui/icons";
import avatarImg from "../../../styles/image/profile-image.svg";
import { getProposalData } from "../../../services/dashboard/userInfoServices";
import { dateToPersian } from "../../../helper/general";
import { useHistory, useParams } from "react-router";
import BackDrop from "../../../common/backDrop/BackDrop";

const ProposalDetail = ({ userName }) => {
  const [pageData, setPageData] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getProposalData(id).then((res) => {
      setPageData(res);
    });
  }, []);

  const checkClearanceManType = (clearanceMan) => {
    if (clearanceMan === "Juridical") {
      return "حقوقی";
    } else if (clearanceMan === "Private") {
      return "حقیقی";
    }
  };

  const infoData = [
    {
      title: "ترخیص کار :",
      text: pageData.clearancemanName,
    },
    {
      title: " نوع شخص :",
      text: checkClearanceManType(pageData.clearancemanType),
    },
    {
      title: "تاریخ ثبت :",
      text: dateToPersian(pageData.submitDate),
    },
  ];

  const suggestData = [
    {
      title: "تعداد روز",
      text: pageData.estimatedNumberOfDays,
    },
    {
      title: "مبلغ",
      text: Number(pageData.price).toLocaleString(),
    },
  ];

  const showInfoData = (infoData) => {
    return infoData.map((item, index) => (
      <div className={classes.requestBox} key={index}>
        <div className={classes.circle}></div>
        <div className={classes.infoDataTitle}>{item.title}</div>
        <div className={classes.infoDataText}>{item.text}</div>
      </div>
    ));
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
          پیشنهاد استعلام قیمت
        </Typography>
      </Grid>
      <Grid item container spacing={1} xs={11}>
        <Paper className={classes.mainPaper}>
          <Grid item container xs={12}>
            <Grid item xs={10} className={classes.requestDetailTitle}>
              <div className={classes.businessMan}>
                <Avatar src={avatarImg} />
                <h6 className={classes.businessManName}>{userName()}</h6>
              </div>
              <div
                className={classes.requestDetailLink}
                onClick={() => history.goBack()}
              >
                <ArrowForwardIosRounded fontSize="small" />
                <p>بازگشت به لیست درخواست ها</p>
              </div>
            </Grid>

            <Grid item xs={10} className={classes.requestDetailMain}>
              {pageData.length === 0 || pageData === undefined ? (
                <BackDrop />
              ) : (
                <React.Fragment>
                  <div className={classes.infoDataContainer}>
                    {showInfoData(infoData)}
                  </div>
                  <div className={classes.suggestDataContainer}>
                    {suggestData.map((item, index) => (
                      <div className={classes.suggestBox} key={index}>
                        <div className={classes.suggestTitle}>{item.title}</div>
                        <div className={classes.suggestText}>{item.text}</div>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProposalDetail;
