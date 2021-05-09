import { Button, CircularProgress, Fab } from "@material-ui/core";
import {
  Check,
  HourglassEmpty,
  ReportProblemOutlined,
} from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { verifyEmail } from "../../../services/verifyEmail";
import { changeFormType, setMessage } from "../../../store/auth/authSlice";
import AuthLayout from "../autLayout/AuthLayout";
import classes from "./verifyEmail.module.css";

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
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);

  if (email && token) {
    verifyEmail(config, dispatch, setIsSuccess);
    // if token ACCEPT go to page >>>
    if (isVerifySuccess) {
      setTimeout(() => {
        dispatch(setMessage(""));
        dispatch(changeFormType("activeAccount"));
      }, 3000);
    } else {
      setTimeout(() => {
        history.replace("/Register");
        dispatch(setMessage(""));
      }, 5000);
    }
  } else {
    // if token REJECT go to page >>>
    setTimeout(() => {
      history.replace("/Register");
      dispatch(setMessage(""));
    }, 5000);
  }

  return (
    <AuthLayout>
      <div className={classes.paper}>
        {isSuccess ? (
          <div className={classes.loadingBox}>
            {isVerifySuccess ? (
              <>
                <Fab className={classes.fabSuccess}>
                  <Check fontSize="large" className={classes.checkSuccess} />
                </Fab>
                <Button
                  variant="outlined"
                  className={`${classes.btn} ${classes.btnSuccess}`}
                >
                  {message}
                </Button>
              </>
            ) : (
              <>
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
    </AuthLayout>
  );
};

export default VerifyEmail;
