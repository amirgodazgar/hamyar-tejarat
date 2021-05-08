import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from "./resetPassword.module.css";
import Button from "../../../common/button/Button";
import { useFormik } from "formik";
import Input from "../../../common/input/InputField";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../.../../../../store/auth/authSlice";
import { Grow } from "@material-ui/core";
import { authData } from "../../../constant/authData";
import * as Yup from "yup";
import { Alert } from "@material-ui/lab";
import { resetPassword } from "../../../services/resetPassword";

const ResetPassword = () => {
  // QueryString ------------
  const history = useHistory();
  const queryStr = history.location.search;
  const query = new URLSearchParams(queryStr);
  const email = query.get("email");
  const token = query.get("token");
  // QueryString ------------

  const dispatch = useDispatch();
  let message = useSelector((state) => state.auth.message);

  useEffect(() => {
    message = "";
  }, []);

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
    console.log(values);
    const userInfo = {
      email,
      token,
      newPassword: values.newPassword,
      newPasswordConfirmation: values.newPasswordConfirmation,
    };
    resetPassword(userInfo, dispatch);
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
          className={classes.resetPasswordContainer}
          onSubmit={formik.handleSubmit}
        >
          <div className={classes.inputBox}>
            <Input
              formik={formik}
              type="password"
              name="password"
              label={authData.resetPass.pass}
              placeHolder="example@gmail.com"
            />
            <Input
              formik={formik}
              type="password"
              name="password"
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
                  severity="success"
                  onClose={() => dispatch(setMessage(""))}
                  className={classes.alert}
                >
                  {message}
                </Alert>
              </Grow>
            )}
          </div>
        </form>
      </Grow>
    </React.Fragment>
  );
};

export default ResetPassword;
