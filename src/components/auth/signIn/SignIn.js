import React from "react";
import classes from "./signIn.module.css";
import Button from "../../../common/button/Button";
import { useFormik } from "formik";
import Input from "../../../common/input/InputField";
import { useDispatch } from "react-redux";
import { changeFormType } from "../.../../../../store/auth/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const forgotPasswordHandler = () => {
    dispatch(changeFormType("forgotPassword"));
  };
  const initialValues = {
    email: "",
    password: "",
    checkbox: "",
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
          <Input
            formik={formik}
            type="password"
            label="رمز عبور"
            placeHolder="********"
          />
          <div className={classes.checkBoxContainer}>
            <label>
              <input
                name="checkbox"
                type="checkbox"
                className={classes.checkbox}
                value={formik.values.checkbox}
              />
              <i>ذخیره اطلاعات</i>
            </label>
          </div>
          <Button customizeClass="auth">ورود</Button>
        </div>
        <a onClick={forgotPasswordHandler} className={classes.forgotPass}>
          رمز عبور را فراموش کرده ام
        </a>
      </form>
    </React.Fragment>
  );
};

export default SignIn;
