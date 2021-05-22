import classes from "./confirmation.module.css";
import React from "react";
import Button from "../../../common/button/Button";
import { authData } from "../../../constant/authData";
import { useDispatch, useSelector } from "react-redux";
import { changeFormType, setMessage } from "../../../store/auth/authSlice";
import { Grow } from "@material-ui/core";
import { useHistory } from "react-router";

const ActiveAccount = () => {
  const change = useSelector((state) => state.auth.change);
  const history = useHistory();

  const dispatch = useDispatch();
  const signInHandler = () => {
    dispatch(changeFormType("signIn"));
    dispatch(setMessage(""));
  };

  return (
    <React.Fragment>
      <Grow in={change}>
        <div className={classes.container}>
          <span className={classes.text}>{authData.activeAccount.text}</span>
          <Button
            click={() => history.replace("/register")}
            click={signInHandler}
            customizeClass="confirmation"
          >
            {authData.activeAccount.btn}
          </Button>
        </div>
      </Grow>
    </React.Fragment>
  );
};

export default ActiveAccount;
