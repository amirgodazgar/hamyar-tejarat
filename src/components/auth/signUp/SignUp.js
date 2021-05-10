import React from "react";
import classes from "./signUp.module.css";
import Button from "../../../common/button/Button";
import { useFormik } from "formik";
import Input from "../../../common/input/InputField";
import {
  FormControlLabel,
  FormLabel,
  Grow,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { authData } from "../../../constant/authData";
import { Fade } from "@material-ui/core";
import * as Yup from "yup";
import { register } from "../../../services/register";
import { setMessage } from "../../../store/auth/authSlice";
import { useHistory } from "react-router";

const SignUp = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const change = useSelector((state) => state.auth.change);
  let message = useSelector((state) => state.auth.message);
  let isVerifySuccess = useSelector((state) => state.auth.isVerify);

  

  const initialValues = {
    email: "",
    password: "",
    personType: "",
    activityType: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(authData.signUp.errors.email.wrong)
      .required(authData.signUp.errors.email.required),
    password: Yup.string()
      .min(8, authData.signUp.errors.pass.min)
      .required(authData.signUp.errors.pass.required),
    personType: Yup.string().required(authData.signUp.errors.personType),
    activityType: Yup.string().required(authData.signUp.errors.activityType),
  });
  const onSubmit = (values) => {
    const userInfo = {
      email: values.email,
      password: values.password,
      userType: values.personType,
      userRole: values.activityType,
    };
    register(userInfo, dispatch , history);
    console.log(userInfo);
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
              label={authData.signUp.email}
              placeHolder="example@gmail.com"
            />
            <Input
              formik={formik}
              type="password"
              name="password"
              label={authData.signUp.pass}
              placeHolder="********"
            />
            <div className={classes.checkBoxContainer}>
              <FormLabel className={classes.label}>
                {" "}
                {authData.signUp.personType}
              </FormLabel>
              <RadioGroup
                className={classes.radioGroup}
                name="personType"
                value={formik.values.personType}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="Private"
                  control={<Radio color="primary" />}
                  label={authData.signUp.real}
                />
                <FormControlLabel
                  value="Juridical"
                  control={<Radio color="primary" />}
                  label={authData.signUp.legal}
                />
              </RadioGroup>
              {formik.touched.personType && formik.errors.personType ? (
                <Fade
                  in={
                    formik.touched.personType && formik.errors.personType
                      ? true
                      : false
                  }
                  timeout={400}
                >
                  <Alert severity="error" className={classes.alert}></Alert>
                </Fade>
              ) : null}
            </div>

            <div className={classes.checkBoxContainer}>
              <FormLabel className={classes.label}>
                {" "}
                {authData.signUp.activityType}{" "}
              </FormLabel>
              <RadioGroup
                className={classes.radioGroup}
                name="activityType"
                value={formik.values.activityType}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="Businessman"
                  control={<Radio color="primary" />}
                  label={authData.signUp.businessMan}
                />
                <FormControlLabel
                  value="Clearanceman"
                  control={<Radio color="primary" />}
                  label={authData.signUp.clearanceMan}
                />
              </RadioGroup>
              {formik.touched.activityType && formik.errors.activityType ? (
                <Fade
                  in={
                    formik.touched.activityType && formik.errors.activityType
                      ? true
                      : false
                  }
                  timeout={400}
                >
                  <Alert severity="error" className={classes.alert}></Alert>
                </Fade>
              ) : null}
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
              {authData.signUp.btn}
            </Button>
            ) : (
              <Grow in={message !== "" ? true : false}>
                <Alert
                  severity={isVerifySuccess ? "success" : "warning"}
                  onClose={() => dispatch(setMessage(""))}
                  className={classes.alertResponse}
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

export default SignUp;
