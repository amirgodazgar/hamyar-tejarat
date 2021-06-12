import React, { useEffect, useState } from "react";
import classes from "../suggestionsList.module.css";
import styles from "./submitProposal.module.css";
import {
  Grid,
  Fade,
  Avatar,
  Paper,
  Typography,
  Button,
  Modal,
  Backdrop,
} from "@material-ui/core";
import { ArrowForwardIosRounded } from "@material-ui/icons";
import avatarImg from "../../../../styles/image/profile-image.svg";
import {
  getProposalDetail,
  submitQuotationProposal,
} from "../../../../services/dashboard/userInfoServices";
import { dateToPersian } from "../../../../helper/general";
import { useHistory, useParams } from "react-router";
import BackDrop from "../../../../common/backDrop/BackDrop";
import { Alert } from "@material-ui/lab";

const SubmitProposalDetail = ({ userName }) => {
  const [pageData, setPageData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [proposalValue, setProposalValue] = useState("");
  const [proposalDays, setProposalDays] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { id } = useParams();
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProposalDetail(id).then((res) => {
      setPageData(res);
      
    });
  }, []);

  const submitProposalHandler = (id, value, days, type) => {
    submitQuotationProposal(id, value, days, type, setAlertMessage);
    setProposalValue("");
    setProposalDays("");
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setOpen(false);
      window.location.reload();
    }, 3000);
  };

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
      title: " گمرک های مقصد :",
      text: pageData.customOrigins,
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
          جزئیات درخواست
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
                <p>بازگشت به لیست درخواست ها</p>
              </div>
            </Grid>

            <Grid item xs={10} className={classes.requestDetailMain}>
              {pageData.length === 0 ? (
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
                    {pageData.clearancemanCanSubmitProposal ? (
                      <Button
                        className={classes.suggestBtn}
                        color="primary"
                        variant="contained"
                        onClick={handleOpen}
                      >
                        ثبت پیشنهاد
                      </Button>
                    ) : (
                      <Alert severity="warning" className={styles.alert}>
                        شما قبلا برای این پیشنهاد یک درخواست ثبت کرده اید
                      </Alert>
                    )}

                    {pageData.clearancemanCanSubmitProposal ? (
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={open}>
                          <Paper className={classes.modalPaper}>
                            <Typography
                              variant="h6"
                              align="center"
                              color="primary"
                              className={classes.modalTitle}
                            >
                              ثبت پیشنهاد استعلام قیمت
                            </Typography>
                            <input
                              className={classes.modalInput}
                              type="text"
                              value={proposalValue}
                              placeholder="مبلغ پیشنهادی"
                              onChange={(e) => setProposalValue(e.target.value)}
                            />
                            <input
                              className={classes.modalInput}
                              type="text"
                              value={proposalDays}
                              placeholder="تعداد روز پیشنهادی برای ترخیص"
                              onChange={(e) => setProposalDays(e.target.value)}
                            />

                            <Button
                              className={classes.modalBtn}
                              color="primary"
                              variant="contained"
                              onClick={() =>
                                submitProposalHandler(
                                  pageData.id,
                                  proposalValue,
                                  proposalDays,
                                  pageData.businessmanType
                                )
                              }
                            >
                              ثبت
                            </Button>
                            <Fade in={isSuccess}>
                              {isSuccess ? (
                                <Alert
                                  variant="standard"
                                  color="success"
                                  onClick={() => setOpen(false)}
                                  style={
                                    alertMessage === ""
                                      ? { display: "none" }
                                      : null
                                  }
                                >
                                  {alertMessage}
                                </Alert>
                              ) : (
                                <Alert
                                  variant="standard"
                                  color="success"
                                  onClick={() => setOpen(false)}
                                  style={
                                    alertMessage === ""
                                      ? { display: "none" }
                                      : null
                                  }
                                >
                                  {alertMessage}
                                </Alert>
                              )}
                            </Fade>
                          </Paper>
                        </Fade>
                      </Modal>
                    ) : null}
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

export default SubmitProposalDetail;
