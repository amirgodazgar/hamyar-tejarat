import React, { useEffect, useState } from "react";
import classes from "./import.module.css";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@material-ui/core";
import ServiceType from "./ServiceType";
import RequestType from "./RequestType";
import LocationPurchase from "./LocationPurchase";
import LocationPrice from "./LocationPrice";
import UploadPurchase from "./UploadPurchase";
import UploadPrice from "./UploadPrice";
import { Check } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getRequestRegisterFormData, postRequestRegisterFormData } from "../../../../services/dashboard/userInfoServices";
// import { adminPanelData } from "../../../../constant/adminPanel";
import { useFormik } from "formik";
import * as Yup from "yup";

const Import = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isPurchase, setIsPurchase] = React.useState(false);
  const [transportTools, setTransportTools] = useState([]);
  const [placeClearance, setPlaceClearance] = useState([]);
  const [chips, setChips] = useState([]);

  const initialValues = {
    tariffCode: "",
    cargoTitle: "",
    portOfLoading: "",
    originCustomIds: [],
    packagingType: "",
    cargoAmount: "",
    cargoTransportTools: "",
    cargoValue: "",
  };

  const validationSchema = Yup.object({
    tariffCode: Yup.string().required(),
    cargoTitle: Yup.mixed().required(),
    portOfLoading: Yup.string().required(),
    originCustomIds: Yup.mixed().required(),
    packagingType: Yup.string().required(),
    cargoAmount: Yup.string().required(),
    cargoTransportTools: Yup.mixed().required(),
    cargoValue: Yup.mixed().required(),
  });

  useEffect(() => {
    getRequestRegisterFormData().then((res) => {
      const { cargoTransportTools } = res;
      const { customsList } = res;
      setTransportTools(cargoTransportTools);
      setPlaceClearance(customsList);
    });
  }, []);

  const handleNext = () => {
    if (activeStep === 0 || activeStep === 1 || activeStep === 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (formik.isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (values) => {
    console.log(values);
    const ids = chips === undefined ? [] : chips.map((item) => +item.id);
    if (formik.isValid) {
      setActiveStep(4);
      const userInfo = {
        tariffCode: values.tariffCode,
        cargoTitle: values.cargoTitle,
        portOfLoading: values.portOfLoading,
        originCustomIds: ids,
        packagingType: values.packagingType,
        cargoAmount: values.cargoAmount,
        cargoTransportTools: values.cargoTransportTools,
        cargoValue: values.cargoValue,
      };

      postRequestRegisterFormData(userInfo);
    }
    // values.originReleasing.push(...chips);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const steps = [
    { type: "انتخاب نوع خدمت" },
    { type: "انتخاب نوع درخواست" },
    { type: "انتخاب مبدا و مقصد" },
    { type: isPurchase ? "بارگذاری مدارک" : "تکمیل اطلاعات" },
  ];
  const next = "ادامه";
  const accept = "ثبت درخواست";

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <ServiceType />;
      case 1:
        return <RequestType setRequestType={setIsPurchase} />;
      case 2:
        return isPurchase ? (
          <LocationPurchase />
        ) : (
          <LocationPrice
            formik={formik}
            placeClearance={placeClearance}
            chips={chips}
            setChips={setChips}
          />
        );
      case 3:
        return isPurchase ? (
          <UploadPurchase />
        ) : (
          <UploadPrice formik={formik} transportTools={transportTools} />
        );
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className={classes.stepper}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label.type}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={formik.handleSubmit} className={classes.main}>
          {activeStep !== steps.length ? (
            <>
              <div className={classes.container}>
                {getStepContent(activeStep)}

                <div className={classes.stepBtnBox}>
                  <Button
                    disabled={activeStep === 0}
                    variant="outlined"
                    onClick={handleBack}
                    className={classes.backBtn}
                  >
                    بازگشت
                  </Button>
                  {activeStep == steps.length - 1 ? (
                    <Button
                      className={classes.forwardBtn}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      <div>{accept}</div>
                    </Button>
                  ) : (
                    <Button
                      className={classes.forwardBtn}
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      <div>{next}</div>
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className={classes.main}>
              <div className={classes.container}>
                <div className={classes.successfulContainer}>
                  <Check fontSize="large" className={classes.successfulIcon} />
                  <Typography variant="h6" className={classes.successfulTitle}>
                    درخواست شما با موفقیت ثبت شد و در لیست در خواست ها نمایش
                    داده می شود
                  </Typography>
                  <Link
                    to="/Dashboard/suggestionsList/quotationRequestList"
                    className={classes.link}
                  >
                    <Button
                      className={classes.successfulBtn}
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      مشاهده لیست پیشنهادها
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </form>
      </Paper>
    </React.Fragment>
  );
};

export default Import;
