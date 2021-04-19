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
import { useSelector } from "react-redux";
import { authData } from "../../../constant/authData";
import { Fade } from "@material-ui/core";
import * as Yup from "yup";

const SignUp = () => {
  const change = useSelector((state) => state.auth.change);

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
    console.log(values);
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
              label={authData.signUp.email}
              placeHolder="example@gmail.com"
            />
            <Input
              formik={formik}
              type="password"
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
                  value="real"
                  control={<Radio color="primary" />}
                  label={authData.signUp.real}
                />
                <FormControlLabel
                  value="legal"
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
                  value="businessMan"
                  control={<Radio color="primary" />}
                  label={authData.signUp.businessMan}
                />
                <FormControlLabel
                  value="clearanceMan"
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
          </div>
        </form>
      </Grow>
    </React.Fragment>
  );
};

export default SignUp;
