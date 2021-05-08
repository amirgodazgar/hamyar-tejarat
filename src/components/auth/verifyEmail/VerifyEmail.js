import {
  Backdrop,
  Button,
  ButtonBase,
  CircularProgress,
  Fab,
  Paper,
} from "@material-ui/core";
import {
  Check,
  HourglassEmpty,
  ReportProblemOutlined,
} from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { verifyEmail } from "../../../services/verifyEmail";
import { changeFormType } from "../../../store/auth/authSlice";
import classes from "./verifyEmail.module.css";

const VerifyEmail = () => {
  // QueryString ------------
  const history = useHistory();
  const queryStr = history.location.search;
  const query = new URLSearchParams(queryStr);
  const email = query.get("email");
  const token = query.get("token");
  const config = {
    email,
    token,
  };
  // QueryString ------------

  const message = useSelector((state) => state.auth.message);
  const isVerifySuccess = useSelector((state) => state.auth.isVerify);
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  
  
  if (email && token) {
    dispatch(changeFormType("verifyEmail"));
    verifyEmail(config, dispatch, setIsSuccess);
    // if token ACCEPT go to page >>>
    if (isVerifySuccess) {
      setTimeout(() => {
        history.replace("/Account");
      }, 5000);
    }
  } else {
    // if token REJECT go to page >>>
    // history.replace("/");
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default VerifyEmail;
