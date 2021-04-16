import classes from "./confirmation.module.css";
import React from "react";
import Button from "../../../common/button/Button";
import { authData } from "../../../constant/authData";
import { useDispatch, useSelector } from "react-redux";
import { changeFormType } from "../../../store/auth/authSlice";
import { Grow } from "@material-ui/core";

const SuccessChangePass = ({ email }) => {
  const change = useSelector((state) => state.auth.change);
  const dispatch = useDispatch();
  const signInHandler = () => {
    dispatch(changeFormType("signIn"));
  };
  return (
    <React.Fragment>
      <Grow in={change}>
        <div className={classes.container}>
          <span className={classes.text}>
            {authData.successChangePass.text}
          </span>
          <span className={classes.email}>{email}</span>
          <Button click={signInHandler} customizeClass="confirmation">
            {authData.successChangePass.btn}
          </Button>
        </div>
      </Grow>
    </React.Fragment>
  );
};

export default SuccessChangePass;
