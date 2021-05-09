import React from "react";
import { useLocation, Link } from "react-router-dom";
import classes from "./resetPassword.module.css";
import Button from "../../../common/button/Button";
import { useFormik } from "formik";
import Input from "../../../common/input/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFormType,
  setMessage,
} from "../.../../../../store/auth/authSlice";
import { Grow } from "@material-ui/core";
import { authData } from "../../../constant/authData";
import * as Yup from "yup";
import { Alert } from "@material-ui/lab";
import { resetPassword } from "../../../services/resetPassword";
import AuthLayout from "../autLayout/AuthLayout";

const ResetPassword = () => {
  // QueryString ------------
  const location = useLocation();
  const queryStr = location.search;
  const filterQS = queryStr.split("&token=");
  const token = filterQS[1];
  const email = filterQS[0].toString().split("?email=")[1];
  // QueryString ------------

  const dispatch = useDispatch();
  let message = useSelector((state) => state.auth.message);
  let isChangeSuccess = useSelector((state) => state.auth.isVerify);

  const initialValues = {
    newPassword: "",
    newPasswordConfirmation: "",
  };
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, authData.resetPass.errors.pass.min)
      .required(authData.resetPass.errors.pass.required),
    newPasswordConfirmation: Yup.string()
      .min(8, authData.resetPass.errors.passConfirm.min)
      .required(authData.resetPass.errors.pass.required),
  });
  const onSubmit = (values) => {
    const userInfo = {
      email,
      token,
      newPassword: values.newPassword,
      newPasswordConfirmation: values.newPasswordConfirmation,
    };
    resetPassword(userInfo, dispatch);
    console.log(userInfo);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <AuthLayout title={authData.resetPass.title}>
      <Grow in={true}>
        <form
          className={classes.resetPasswordContainer}
          onSubmit={formik.handleSubmit}
        >
          <div className={classes.inputBox}>
            <Input
              formik={formik}
              type="password"
              name="newPassword"
              label={authData.resetPass.pass}
              placeHolder="********"
            />
            <Input
              formik={formik}
              type="password"
              name="newPasswordConfirmation"
              label={authData.resetPass.passConfirm}
              placeHolder="********"
            />
            {message === "" ? (
              <Button
                type="submit"
                customizeClass={
                  formik.isValid &&
                  formik.values.newPassword !== "" &&
                  formik.values.newPasswordConfirmation !== ""
                    ? "authActive"
                    : "auth"
                }
              >
                {authData.resetPass.btn}
              </Button>
            ) : (
              <Grow in={message !== "" ? true : false}>
                <Alert
                  severity={isChangeSuccess ? "success" : "warning"}
                  onClose={() => dispatch(setMessage(""))}
                  className={classes.alert}
                >
                  {message}
                </Alert>
              </Grow>
            )}
          </div>
          <Link
            className={classes.backward}
            to="/Register"
            onClick={() => dispatch(setMessage(""))}
          >
            {authData.successChangePass.btn}
          </Link>
        </form>
      </Grow>
    </AuthLayout>
  );
};

export default ResetPassword;
