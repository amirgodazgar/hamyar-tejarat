import classes from "./confirmation.module.css";
import React from "react";
import { authData } from "../../../constant/authData";
import { useSelector } from "react-redux";
import { Grow } from "@material-ui/core";

const SuccessSignUp = ({ email }) => {
  const change = useSelector((state) => state.auth.change);
  return (
    <React.Fragment>
      <Grow in={change}>
        <div className={classes.container}>
          <span className={classes.text}>{authData.successSignUp.text}</span>
          <span className={classes.email}>{email}</span>
        </div>
      </Grow>
    </React.Fragment>
  );
};

export default SuccessSignUp;
