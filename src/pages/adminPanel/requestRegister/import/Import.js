import React from "react";
import classes from "./import.module.css";
import { Paper, Stepper, Step, StepLabel, Button } from "@material-ui/core";
import ServiceType from "./ServiceType";
import RequestType from "./RequestType";
import LocationPurchase from "./LocationPurchase";
import LocationPrice from "./LocationPrice";
import UploadPurchase from "./UploadPurchase";
import UploadPrice from "./UploadPrice";
// import { adminPanelData } from "../../../../constant/adminPanel";

const Import = () => {
  const steps = [
    "انتخاب نوع خدمت",
    "انتخاب نوع درخواست",
    "انتخاب مبدا و مقصد",
    "بارگذاری مدارک",
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [isPurchase, setIsPurchase] = React.useState(true);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
              <StepLabel>{label}</StepLabel>
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
                    {activeStep === steps.length - 1 ? "ثبت درخواست" : "ادامه"}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className={classes.main}>
              <div className={classes.container}>
                <div>All steps completed</div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  بازگشت
                </Button>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </React.Fragment>
  );
};

export default Import;
