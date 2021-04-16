import React from "react";
import classes from "./forgotPassword.module.css";
import Button from "../../../common/button/Button";
import { useFormik } from "formik";
import Input from "../../../common/input/InputField";
import { useDispatch, useSelector } from "react-redux";
import { changeFormType } from "../.../../../../store/auth/authSlice";
import { Grow } from "@material-ui/core";
const ForgotPassword = () => {
  const change = useSelector((state) => state.auth.change);
  const dispatch = useDispatch();
  const backwardHandler = () => {
    dispatch(changeFormType("signIn"));
  };
  const initialValues = {
    email: "",
  };
  const onSubmit = (values) => {
    console.log(values.email, values.password);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <React.Fragment>
      <Grow in={change}>
        <form
          className={classes.signInContainer}
          onSubmit={formik.handleSubmit}
        >
          <div className={classes.inputBox}>
            <Input
              formik={formik}
              type="text"
              label="ایمیل"
              placeHolder="example@gmail.com"
            />

            <Button customizeClass="auth">بازیابی رمز عبور</Button>
          </div>
          <a onClick={backwardHandler} className={classes.backward}>
            بازگشت
          </a>
        </form>
      </Grow>
    </React.Fragment>
  );
};

export default ForgotPassword;
