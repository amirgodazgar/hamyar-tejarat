import React from "react";
import classes from "./signIn.module.css";
import Button from "../../../common/button/Button";
import { useFormik } from "formik";
import Input from "../../../common/input/InputField";
import { useDispatch } from "react-redux";
import { changeFormType } from "../.../../../../store/auth/authSlice";
import { Checkbox, Grow } from "@material-ui/core";
import { authData } from "../../../constant/authData";
import * as Yup from "yup";

const SignIn = () => {
  const dispatch = useDispatch();
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
