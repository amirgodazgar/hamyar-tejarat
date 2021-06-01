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
import { getSuggestionIdData } from "../../../services/dashboard/userInfoServices";
import { dateToPersian } from "../../../helper/general";
import { useHistory, useParams } from "react-router";
import BackDrop from "../../../common/backDrop/BackDrop";
import { Alert } from "@material-ui/lab";

const RequestDetail = ({ userName }) => {
  const [pageData, setPageData] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSuggestionIdData(id).then((res) => {
      setPageData(res);
      setIsLoading(false);
    });
  }, []);

  const infoData = [
    {
      title: "عنوان کالا :",
      text: pageData.cargoTitle,
    },
    {
      title: "تاریخ ثبت :",
      text: dateToPersian(pageData.submitDate),
    },
    {
      title: "کد تعرفه :",
      text: pageData.customCargosId,
    },
    {
      title: "جنس و نوع کالا :",
      text: pageData.customsCargosName,
    },
    {
      title: "مبدا بارگیری :",
      text: pageData.portOfLoading,
    },
    {
      title: " گمرک های مقصد:",
      text: pageData.originCustomNames,
    },
    {
      title: " تعداد پیشنهادات :",
      text: pageData.proposalsCount,
    },
  ];

  const suggestData = [
    {
      title: "نوع بسته بندی",
      text: pageData.packagingType,
    },
    {
      title: "میزان / حجم کالا",
      text: pageData.cargoAmount,
    },
    {
      title: "وسیله حمل کالا",
      text: pageData.cargoTransportToolsName,
    },
    {
      title: " ارزش کالا ( تومان)",
      text: Number(pageData.cargoValue).toLocaleString(),
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
          درخواست استعلام قیمت
        </Typography>
      </Grid>
      {isLoading ? (
        <BackDrop />
      ) : (
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
                    {pageData.proposalsCount === 0 ? (
                      <Alert severity="warning" className={classes.alert}>
                        پیشنهادی ثبت نشده
                      </Alert>
                    ) : (
                      <Button
                        className={classes.suggestBtn}
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          history.replace(
                            `/Dashboard/suggestionsList/quotationProposals/${id}`
                          )
                        }
                      >
                        لیست پیشنهادهای ثبت شده
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default RequestDetail;
