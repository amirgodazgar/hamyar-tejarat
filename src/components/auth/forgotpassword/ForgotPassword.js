import React from "react";
import classes from "./forgotPassword.module.css";
import Button from "../../../common/button/Button";
import { useFormik } from "formik";
import Input from "../../../common/input/InputField";
import { useDispatch } from "react-redux";
import { changeFormType } from "../.../../../../store/auth/authSlice";

const ForgotPassword = () => {
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
      <form className={classes.signInContainer} onSubmit={formik.handleSubmit}>
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
    </React.Fragment>
  );
};

export default ForgotPassword;
