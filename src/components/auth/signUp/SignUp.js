import React from "react";
import classes from "./signUp.module.css";
import Button from "../../../common/button/Button";
import { useFormik } from "formik";
import Input from "../../../common/input/InputField";

const SignUp = () => {
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
            <span> نوع شخص</span>

            <label>
              <input
                type="radio"
                name="personType"
                value={formik.values.personType}
              />
              <i>حقیقی</i>
            </label>

            <label>
              <input
                type="radio"
                name="personType"
                value={formik.values.personType}
              />
              <i> حقوقی</i>
            </label>
          </div>

          <div className={classes.checkBoxContainer}>
            <span>نوع فعالیت</span>

            <label>
              <input
                type="radio"
                name="activityType"
                value={formik.values.activityType}
              />
              <i>تاجر یا صاحب کالا</i>
            </label>

            <label>
              <input
                type="radio"
                name="activityType"
                value={formik.values.activityType}
              />
              <i> ترخیص کالا</i>
            </label>
          </div>
          <Button customizeClass="auth">ثبت نام</Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SignUp;
