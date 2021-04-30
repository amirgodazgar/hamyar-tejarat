import React from "react";
import InputField from "../../../../common/input/InputField";
import { Paper } from "@material-ui/core";
import Button from "../../../../common/button/Button";
import classes from "./clearanceMan.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminPanelData } from "../../../../constant/adminPanel";

const PrivateClearanceMan = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    clearanceId: "",
    mobile: "",
    address: "",
    email: "",
  };
  const onSubmit = (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    //  validationSchema,
  });
  //  const validationSchema = Yup.object({
  //    email: Yup.string()
  //      .email(authData.signIn.errors.email.wrong)
  //      .required(authData.signIn.errors.email.required),
  //    password: Yup.string()
  //      .min(8, authData.signIn.errors.pass.min)
  //      .required(authData.signIn.errors.pass.required),
  //  });
  return (
    <React.Fragment>
      <Paper className={classes.PrivateClearanceMan}>
        <InputField
          formik={formik}
          name="firstName"
          type="text"
          label={adminPanelData.userInfo.privateClearanceMan.forms.firstName}
          placeHolder="example@gmail.com"
        />
        <InputField
          formik={formik}
          name="lastName"
          type="text"
          label={adminPanelData.userInfo.privateClearanceMan.forms.lastName}
          placeHolder="example@gmail.com"
        />
        <InputField
          formik={formik}
          name="clearanceId"
          type="text"
          label={adminPanelData.userInfo.privateClearanceMan.forms.clearanceId}
          placeHolder="example@gmail.com"
        />
        <InputField
          formik={formik}
          name="mobile"
          type="text"
          label={adminPanelData.userInfo.privateClearanceMan.forms.mobile}
          placeHolder="example@gmail.com"
        />

        <InputField
          formik={formik}
          name="address"
          type="text"
          label={adminPanelData.userInfo.privateClearanceMan.forms.address}
          placeHolder="example@gmail.com"
        />
        <InputField
          formik={formik}
          name="email"
          type="text"
          label={adminPanelData.userInfo.privateClearanceMan.forms.email}
          placeHolder="example@gmail.com"
        />

        <div>1</div>
        <div>2</div>
        <div>3</div>

        <div>4</div>
        <div>4</div>
        <div>6</div>

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
          ثبت
        </Button>
      </Paper>
    </React.Fragment>
  );
};

export default PrivateClearanceMan;
