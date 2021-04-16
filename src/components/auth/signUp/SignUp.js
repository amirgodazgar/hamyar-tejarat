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
import { useSelector } from "react-redux";

const SignUp = () => {
  const change = useSelector((state) => state.auth.change);

  const initialValues = {
    email: "",
    password: "",
    personType: "",
    activityType: "",
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
            <Input
              formik={formik}
              type="password"
              label="رمز عبور"
              placeHolder="********"
            />
            <div className={classes.checkBoxContainer}>
              <FormLabel className={classes.label}> نوع شخص</FormLabel>
              <RadioGroup
                className={classes.radioGroup}
                name="personType"
                value={formik.values.personType}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="real"
                  control={<Radio color="primary" />}
                  label="حقیقی"
                />
                <FormControlLabel
                  value="legal"
                  control={<Radio color="primary" />}
                  label="حقوقی"
                />
              </RadioGroup>
            </div>

            <div className={classes.checkBoxContainer}>
              <FormLabel className={classes.label}> نوع فعالیت </FormLabel>
              <RadioGroup
                className={classes.radioGroup}
                name="activityType"
                value={formik.values.activityType}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="businessMan"
                  control={<Radio color="primary" />}
                  label="تاجر یا صاحب کالا"
                />
                <FormControlLabel
                  value="clearanceMan"
                  control={<Radio color="primary" />}
                  label=" ترخیص کالا"
                />
              </RadioGroup>
            </div>
            <Button type='submit' customizeClass="auth">ثبت نام</Button>
          </div>
        </form>
      </Grow>
    </React.Fragment>
  );
};

export default SignUp;
