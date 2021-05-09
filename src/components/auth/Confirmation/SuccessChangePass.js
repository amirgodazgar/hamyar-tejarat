import classes from "./confirmation.module.css";
import React from "react";
import Button from "../../../common/button/Button";
import { authData } from "../../../constant/authData";
import { useDispatch, useSelector } from "react-redux";
import {
  changeData,
  changeFormType,
  setMessage,
} from "../../../store/auth/authSlice";
import { Grow } from "@material-ui/core";

const SuccessChangePass = () => {
  let message = useSelector((state) => state.auth.message);
  const change = useSelector((state) => state.auth.change);
  let currentEmail = useSelector((state) => state.auth.anyData);
  const dispatch = useDispatch();
  const signInHandler = () => {
    dispatch(setMessage(""));
    dispatch(changeFormType("signIn"));
    dispatch(changeData(""));
  };


  return (
    <React.Fragment>
      <Grow in={change}>
        <div className={classes.container}>
          <span className={classes.text}>{message}</span>
          <span className={classes.email}>{currentEmail}</span>
          <Button click={signInHandler} customizeClass="confirmation">
            {authData.successChangePass.btn}
          </Button>
        </div>
      </Grow>
    </React.Fragment>
  );
};

export default SuccessChangePass;
