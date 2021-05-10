import classes from "./confirmation.module.css";
import React from "react";
import Button from "../../../common/button/Button";
import { authData } from "../../../constant/authData";
import { useDispatch, useSelector } from "react-redux";
import { changeFormType, setMessage } from "../../../store/auth/authSlice";
import { Grow } from "@material-ui/core";

const ActiveAccount = () => {
  const change = useSelector((state) => state.auth.change);
  const message = useSelector((state) => state.auth.message);
  
  const dispatch = useDispatch();
  const signInHandler = () => {
    dispatch(changeFormType("signIn"));
    dispatch(setMessage(""))
  };

  return (
    <React.Fragment>
      <Grow in={change}>
        <div className={classes.container}>
          <span className={classes.text}>{authData.activeAccount.text}</span>
          <Button click={signInHandler} customizeClass="confirmation">
            {message}
          </Button>
        </div>
      </Grow>
    </React.Fragment>
  );
};

export default ActiveAccount;
