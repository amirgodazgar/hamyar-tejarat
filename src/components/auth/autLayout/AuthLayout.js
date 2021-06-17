import { Fade, Hidden, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./AuthLayout.module.css";
import { changeFormType } from "../../../store/auth/authSlice";
import { authData } from "../../../constant/authData";

const AuthLayout = ({ children, title, titleType }) => {
  const dispatch = useDispatch();
  const [signInActive, setSignInActive] = useState(true);
  const [signUpActive, setSignUpActive] = useState(false);

  const signInSwitcher = () => {
    setSignInActive(true);
    setSignUpActive(false);
    dispatch(changeFormType("signIn"));
  };
  const signUpSwitcher = () => {
    setSignUpActive(true);
    setSignInActive(false);
    dispatch(changeFormType("signUp"));
  };
  return (
    <div className={classes.authLayout}>
      <div className={classes.container}>
      <Hidden smDown>
        <div className={classes.image}>
          <span className={classes.up}>{authData.authLayout.upText}</span>
          <h6 className={classes.center}>{authData.authLayout.title}</h6>
          <span className={classes.down}>{authData.authLayout.downText}</span>
        </div>
      </Hidden>
        
        <div className={classes.registerContainer}>
          <div className={classes.title}>
            {titleType !== "register" ? (
              <Typography
                className={classes.formTitle}
                variant="h4"
                component="h4"
              >
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
                  {authData.signIn.title}
                </span>

                <span
                  onClick={signUpSwitcher}
                  className={`${classes.switchBtn} ${classes.signUp} ${
                    signUpActive ? classes.active : null
                  }`}
                >
                  {authData.signUp.title}
                </span>
                <Fade
                  in={signInActive}
                  timeout={{ appear: 700, enter: 500, exit: 300 }}
                >
                  <span
                    className={`${classes.signInSelect} ${
                      signUpActive ? classes.active : null
                    } `}
                  ></span>
                </Fade>
                <Fade
                  in={signUpActive}
                  timeout={{ appear: 700, enter: 500, exit: 300 }}
                >
                  <span
                    className={`${classes.signUpSelect} ${
                      signUpActive ? classes.active : null
                    } `}
                  ></span>
                </Fade>
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
