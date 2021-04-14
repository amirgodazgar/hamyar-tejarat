import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import classes from "./AuthLayout.module.css";

const AuthLayout = ({ children, title }) => {
  const [signInActive, setSignInActive] = useState(true);
  const [signUpActive, setSignUpActive] = useState(false);
  const signInSwitcher = () => {
    setSignInActive(true);
    setSignUpActive(false);
  };
  const signUpSwitcher = () => {
    setSignUpActive(true);
    setSignInActive(false);
  };
  return (
    <div className={classes.authLayout}>
      <div className={classes.container}>
        <div className={classes.image}>
          <span className={classes.up}>به سامانه</span>
          <h6 className={classes.center}>همیار تجارت</h6>
          <span className={classes.down}>خوش آمدید</span>
        </div>
        <div className={classes.registerContainer}>
          <div className={classes.title}>
            {title !== "register" ? (
              <Typography variant="h4" component="h4">
                {title}
              </Typography>
            ) : (
              <div className={classes.switchBox}>
                <span
                  onClick={signInSwitcher}
                  className={`${classes.switchBtn} ${classes.signIn} ${
                    signInActive ? classes.active : null
                  }`}
                >
                  ورود
                </span>

                <span
                  onClick={signUpSwitcher}
                  className={`${classes.switchBtn} ${classes.signUp} ${
                    signUpActive ? classes.active : null
                  }`}
                >
                  ثبت نام
                </span>
                <span
                  className={`${classes.selectorBorder} ${
                    signUpActive ? classes.active : null
                  } `}
                ></span>
              </div>
            )}
          </div>
          <div className={classes.registerField}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
