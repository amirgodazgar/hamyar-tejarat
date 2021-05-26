import React from "react";
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
// import { adminPanelData } from "../../../../constant/adminPanel";

const Import = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isPurchase, setIsPurchase] = React.useState(true);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
        return isPurchase ? <LocationPurchase /> : <LocationPrice />;
      case 3:
        return isPurchase ? <UploadPurchase /> : <UploadPrice />;
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
        <div className={classes.main}>
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
                  <Button
                    className={classes.forwardBtn}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    <div>{activeStep == steps.length - 1 ? accept : next}</div>
                  </Button>
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
                    to="/Dashboard/suggestionsList/findPrice"
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
        </div>
      </Paper>
    </React.Fragment>
  );
};

export default Import;
