import React from "react";
import classes from "./forgotPassword.module.css";
import Button from "../../../common/button/Button";
import { useFormik } from "formik";
import Input from "../../../common/input/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFormType,
} from "../.../../../../store/auth/authSlice";
import { Grow } from "@material-ui/core";
import * as Yup from "yup";
import { authData } from "../../../constant/authData";
import { requestResetPassword } from "../../../services/requestResetPassword";


const ForgotPassword = () => {
  const change = useSelector((state) => state.auth.change);
  const dispatch = useDispatch();
  const backwardHandler = () => {
    dispatch(changeFormType("signIn"));
  };
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(authData.signIn.errors.email.wrong)
      .required(authData.signIn.errors.email.required),
  });
  const onSubmit = (values) => {
    requestResetPassword(values.email, dispatch);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
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
              type="email"
              name="email"
              label={authData.signIn.email}
              placeHolder="example@gmail.com"
            />

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
              {authData.forgotPass.title}
            </Button>
          </div>

          <span onClick={backwardHandler} className={classes.backward}>
            {authData.successChangePass.btn}
          </span>
        </form>
      </Grow>
    </React.Fragment>
  );
};

export default ForgotPassword;
