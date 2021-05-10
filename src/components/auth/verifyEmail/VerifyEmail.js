import {
  Button,
  CircularProgress,
  Collapse,
  Fab,
  Grow,
  Input,
} from "@material-ui/core";
import {
  Check,
  HourglassEmpty,
  ReportProblemOutlined,
} from "@material-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import InputField from "../../../common/input/InputField";
import { authData } from "../../../constant/authData";
import { resendVerificationEmail } from "../../../services/resendVerificationEmail";
import { verifyEmail } from "../../../services/verifyEmail";
import { changeFormType, setMessage } from "../../../store/auth/authSlice";
import AuthLayout from "../autLayout/AuthLayout";
import classes from "./verifyEmail.module.css";
import { Alert } from "@material-ui/lab";

const VerifyEmail = () => {
  // QueryString ------------
  const location = useLocation();
  const queryStr = location.search;
  const filterQS = queryStr.split("&token=");
  const token = filterQS[1];
  const email = filterQS[0].toString().split("?email=")[1];
  const config = {
    email,
    token,
  };
  // QueryString ------------

  const history = useHistory();
  const message = useSelector((state) => state.auth.message);
  const isVerifySuccess = useSelector((state) => state.auth.isVerify);
  const checkVerifyEmail = useSelector(
    (state) => state.auth.isResendVerification
  );
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendEmail, setResendEmail] = useState(false);
  const successHandler = () => {
    history.replace("/Register");
    dispatch(setMessage(""));
  };

  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(authData.signIn.errors.email.wrong)
      .required(authData.signIn.errors.email.required),
  });
  const onSubmit = (values) => {
    resendVerificationEmail(values.email, dispatch);
    setTimeout(() => {
      history.replace("/Register");
      dispatch(setMessage(""));
    }, 7000);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (email && token) {
      verifyEmail(config, dispatch, setIsSuccess);
      // if token ACCEPT go to page >>>
      if (isVerifySuccess) {
        setTimeout(() => {
          dispatch(setMessage(""));
          dispatch(changeFormType("activeAccount"));
          console.log("01");
        }, 2000);
      } else {
        setTimeout(() => {
          setResendEmail(true);
        }, 1000);
      }
    } else {
      // if token REJECT go to page >>>
      setTimeout(() => {
        history.replace("/Register");
        dispatch(setMessage(""));
        console.log("03");
        return;
      }, 5000);
    }
  }, []);

  return (
    <AuthLayout title=" فعال سازی ایمیل">
      <Grow in={true}>
        <div className={classes.paper}>
          {isSuccess ? (
            <div className={classes.loadingSuccess}>
              {isVerifySuccess ? (
                <div className={classes.SuccessBox}>
                  <Fab className={classes.fabSuccess}>
                    <Check fontSize="large" className={classes.checkSuccess} />
                  </Fab>
                  <Button
                    variant="outlined"
                    className={`${classes.btn} ${classes.btnSuccess}`}
                  >
                    {message}
                  </Button>
                </div>
              ) : (
                <>
                  <Collapse in={!checkVerifyEmail} className={classes.collapse}>
                    <div className={classes.failedBox}>
                      <Fab className={classes.fabFailed}>
                        <ReportProblemOutlined
                          fontSize="large"
                          className={classes.checkFailed}
                        />
                      </Fab>
                      <Button
                        variant="outlined"
                        className={`${classes.btn} ${classes.btnFailed}`}
                      >
                        {message}
                      </Button>
                    </div>
                  </Collapse>

                  {resendEmail ? (
                    <>
                      <Collapse
                        in={resendEmail}
                        className={classes.formCollapse}
                      >
                        <form
                          onSubmit={formik.handleSubmit}
                          className={classes.resendEmailForm}
                        >
                          <InputField
                            formik={formik}
                            type="email"
                            name="email"
                            placeHolder="example@gmail.com"
                          />

                          <Button
                            disabled={checkVerifyEmail}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={`${classes.btn} ${classes.btnResendEmail}`}
                          >
                            ارسال مجدد ایمیل فعال سازی
                          </Button>
                        </form>
                      </Collapse>

                      <Collapse
                        in={checkVerifyEmail}
                        className={classes.collapse}
                      >
                        <Alert
                          onClick={successHandler}
                          className={classes.alert}
                          color="success"
                        >
                          {message}
                        </Alert>
                      </Collapse>
                    </>
                  ) : null}
                </>
              )}
            </div>
          ) : (
            <div className={classes.loadingBox}>
              <Fab color="primary" className={classes.fabBox}>
                <HourglassEmpty fontSize="large" />
                <CircularProgress size={80} className={classes.loading} />
              </Fab>
              <Button variant="outlined" color="primary">
                لطفا صبر کنید ...
              </Button>
            </div>
          )}
        </div>
      </Grow>
    </AuthLayout>
  );
};

export default VerifyEmail;
