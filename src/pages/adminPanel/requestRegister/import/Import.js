import React from "react";
import classes from "./import.module.css";
import { Paper, Stepper, Step, StepLabel, Button } from "@material-ui/core";
// import { adminPanelData } from "../../../../constant/adminPanel";

const Import = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ["انتخاب نوع خدمت", "انتخاب مبدا و مقصد", "بارگذاری مدارک"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  console.log(activeStep, activeStep === steps.length - 1);

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "مرحله اول";
      case 1:
        return "مرحله دوم";
      case 2:
        return "مرحله سوم";
      default:
        return "Unknown stepIndex";
    }
  }



  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep !== steps.length ? (
            <div>
              <div>{getStepContent(activeStep)}</div>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  بازگشت
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "ثبت درخواست" : "ادامه"}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div>All steps completed</div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                بازگشت
              </Button>
            </div>
          )}
        </div>
      </Paper>
    </React.Fragment>
  );
};

export default Import;
