import React from "react";
import classes from "./signIn.module.css";
import Button from "../../../common/button/Button";
import { useFormik } from "formik";
import Input from "../../../common/input/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFormType,
  setMessage,
} from "../.../../../../store/auth/authSlice";
import { Checkbox, Grow } from "@material-ui/core";
import { authData } from "../../../constant/authData";
import * as Yup from "yup";
import { signIn } from "../../../services/login";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router";

const SignIn = () => {
  const dispatch = useDispatch();
  let message = useSelector((state) => state.auth.message);
  let isVerifySuccess = useSelector((state) => state.auth.isVerify);
  console.log(isVerifySuccess);
  const history = useHistory();
  const forgotPasswordHandler = () => {
    dispatch(changeFormType("forgotPassword"));
  };


  const initialValues = {
    email: "",
    password: "",
    checkbox: true,
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(authData.signIn.errors.email.wrong)
      .required(authData.signIn.errors.email.required),
    password: Yup.string()
      .min(8, authData.signIn.errors.pass.min)
      .required(authData.signIn.errors.pass.required),
  });
  const onSubmit = (values) => {
    console.log(values);
    const userInfo = {
      email: values.email,
      password: values.password,
    };
    signIn(userInfo, dispatch, history);

  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <React.Fragment>
      <Grow in={true}>
        <form
          className={classes.signInContainer}
          onSubmit={formik.handleSubmit}
        >
          <div className={classes.inputBox}>
            <Input
              formik={formik}
              type="email"
              name="email"
              label={authData.signIn.email}
              placeHolder="example@gmail.com"
            />
            <Input
              formik={formik}
              type="password"
              name="password"
              label={authData.signIn.pass}
              placeHolder="********"
            />
            <div className={classes.checkBoxContainer}>
              <label>
                <Checkbox
                  defaultChecked
                  name="checkbox"
                  className={classes.checkbox}
                  onChange={formik.handleChange}
                  value={formik.values.checkbox}
                  color="primary"
                />
                <i>{authData.signIn.saveInfo}</i>
              </label>
            </div>
            {message === "" ? (
              <Button
                type="submit"
                customizeClass={
                  formik.isValid &&
                  formik.values.email !== "" &&
                  formik.values.password !== ""
                    ? "authActive"
                    : "auth"
                }
              >
                {authData.signIn.btn}
              </Button>
            ) : (
              <Grow in={message !== "" ? true : false}>
                <Alert
                  severity={isVerifySuccess ? "success" : "warning"}
                  onClose={() => dispatch(setMessage(""))}
                  className={classes.alert}
                >
                  {message}
                </Alert>
              </Grow>
            )}
          </div>

          <a onClick={forgotPasswordHandler} className={classes.forgotPass}>
            {authData.signIn.forgotPass}
          </a>
        </form>
      </Grow>
    </React.Fragment>
  );
};

export default SignIn;
