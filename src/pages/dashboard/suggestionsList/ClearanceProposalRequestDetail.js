import React, { memo, useEffect, useState } from "react";
import classes from "./suggestionsList.module.css";
import { Grid, Avatar, Paper, Typography } from "@material-ui/core";
import { ArrowForwardIosRounded } from "@material-ui/icons";
import avatarImg from "../../../styles/image/profile-image.svg";
import { getClearanceRequestDetail } from "../../../services/dashboard/userInfoServices";
import { apiRootDomain, dateToPersian } from "../../../helper/general";
import { useHistory, useParams } from "react-router";
import BackDrop from "../../../common/backDrop/BackDrop";

const ClearanceProposalRequestDetail = () => {
  const [pageData, setPageData] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const downloadHandler = (path) => {
    setTimeout(() => {
      const response = {
        file: `${apiRootDomain}${path}`,
      };
      window.open(response.file);
    }, 100);
  };

  useEffect(() => {
    getClearanceRequestDetail(id).then((res) => {
      console.log(res);
      setPageData(res);
    });
  }, []);

  const infoData = [
    {
      title: "تاریخ ثبت :",
      text: dateToPersian(pageData.submitDate),
    },
    {
      title: "عنوان کالا :",
      text: pageData.cargoTitle,
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
      title: " گمرک مقصد:",
      text: pageData.customName,
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

  const filesData = [
    {
      title: "دریافت بارنامه",
      path: pageData.billOfLoadingPath,
    },
    {
      title: " دریافت فهرست عدل بندی",
      path: pageData.packingListPath,
    },
    {
      title: "دریافت پرفرما",
      path: pageData.performaPath,
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

  const showInfoFiles = (infoData) => {
    return infoData.map((item, index) => (
      <div className={classes.requestBox} key={index}>
        <div className={classes.circle}></div>
        <div className={classes.infoDataTitle}>{item.title}</div>
        <div
          className={classes.infoDataText}
          style={{ cursor: "pointer", color: "#2780e5" }}
          onClick={() => downloadHandler(item.path)}
        >
          برای دریافت فایل کلیک کنید
        </div>
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
          جزئیات پیشنهاد ترخیص کالا
        </Typography>
      </Grid>
      <Grid item container spacing={1} xs={11}>
        <Paper className={classes.mainPaper}>
          <Grid item container xs={12}>
            <Grid item xs={10} className={classes.requestDetailTitle}>
              <div className={classes.businessMan}>
                <Avatar src={avatarImg} />
                <h6 className={classes.businessManName}>
                  {pageData.businessmanName}
                </h6>
              </div>
              <div
                className={classes.requestDetailLink}
                onClick={() => history.goBack()}
              >
                <ArrowForwardIosRounded fontSize="small" />
                <p>بازگشت به لیست پیشنهادها</p>
              </div>
            </Grid>

            <Grid item xs={10} className={classes.requestDetailMain}>
              {pageData.length === 0 || pageData === undefined ? (
                <BackDrop />
              ) : (
                <React.Fragment>
                  <div className={classes.infoDataContainer}>
                    <>
                      {showInfoData(infoData)}
                      {showInfoFiles(filesData)}
                    </>
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

export default memo(ClearanceProposalRequestDetail);
