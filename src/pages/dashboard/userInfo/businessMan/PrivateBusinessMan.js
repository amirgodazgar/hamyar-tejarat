import React from "react";
import InputField from "../../../../common/input/InputField";
import { Paper } from "@material-ui/core";
import Button from "../../../../common/button/Button";
import classes from "./businessMan.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminPanelData } from "../../../../constant/adminPanel";

import { Link } from "react-router-dom";
import { sendBusinessmanPrivate } from "../../../../services/userInfo/userInfoServices";
import { useDispatch } from "react-redux";

const PrivateBusinessMan = ({ backToDashboard }) => {
  const dispatch = useDispatch();
  const initialValues = {
    firstName: "",
    lastName: "",
    nationalId: "",
    mobileNum: "",
    email: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(
      adminPanelData.userInfo.clearanceMan.error.firstName
    ),
    lastName: Yup.string().required(
      adminPanelData.userInfo.clearanceMan.error.lastName
    ),
    nationalId: Yup.string()
      .min(10, adminPanelData.userInfo.clearanceMan.error.nationalIdWrong)
      .required(adminPanelData.userInfo.clearanceMan.error.nationalId),
    mobileNum: Yup.string()
      .min(11, adminPanelData.userInfo.clearanceMan.error.mobileWrong)
      .required(adminPanelData.userInfo.clearanceMan.error.mobile),
    email: Yup.string()
      .email(adminPanelData.userInfo.clearanceMan.error.emailWrong)
      .required(adminPanelData.userInfo.clearanceMan.error.email),
  });

  const onSubmit = (values) => {
    const userInfo = {
      firstName: values.firstName,
      lastName: values.lastName,
      nationalId: values.nationalId,
      phoneNumber: values.mobileNum,
    };
    console.log(userInfo);
    sendBusinessmanPrivate(userInfo, dispatch);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.privateBusinessMan}
        >
          <div className={classes.firstRow_PB}>
            <div className={`${classes.firstRow} ${classes.firstName} `}>
              <InputField
                customizeLabel="userInfo_label"
                customizeInput="userInfo_input"
                formik={formik}
                name="firstName"
                type="text"
                label={adminPanelData.userInfo.clearanceMan.forms.firstName}
                placeHolder={
                  adminPanelData.userInfo.clearanceMan.placeHolder.firstName
                }
              />
            </div>
            <div className={`${classes.firstRow} ${classes.lastName} `}>
              <InputField
                customizeLabel="userInfo_label"
                customizeInput="userInfo_input"
                formik={formik}
                name="lastName"
                type="text"
                label={adminPanelData.userInfo.clearanceMan.forms.lastName}
                placeHolder={
                  adminPanelData.userInfo.clearanceMan.placeHolder.lastName
                }
              />
            </div>
            <div className={`${classes.firstRow} ${classes.nationalId} `}>
              <InputField
                customizeLabel="userInfo_label"
                customizeInput="userInfo_input"
                formik={formik}
                name="nationalId"
                type="text"
                label={adminPanelData.userInfo.clearanceMan.forms.nationalId}
                placeHolder={
                  adminPanelData.userInfo.clearanceMan.placeHolder.nationalId
                }
              />
            </div>
          </div>
          <div className={`${classes.firstRow} ${classes.mobileBox} `}>
            <InputField
              customizeLabel="userInfo_label"
              customizeInput="userInfo_input"
              formik={formik}
              name="mobileNum"
              type="text"
              label={adminPanelData.userInfo.clearanceMan.forms.mobile}
              placeHolder={
                adminPanelData.userInfo.clearanceMan.placeHolder.mobile
              }
            />
          </div>
          <div className={classes.emailBox_PB}>
            <InputField
              customizeLabel="userInfo_label"
              customizeInput="userInfo_email_input"
              formik={formik}
              name="email"
              type="text"
              label={adminPanelData.userInfo.clearanceMan.forms.email}
              placeHolder={
                adminPanelData.userInfo.clearanceMan.placeHolder.email
              }
            />
          </div>

          <div className={classes.BtnBox_PB} type="submit">
            <Button type="submit" customizeClass="authActive">
              ثبت
            </Button>

            <Link to="/Dashboard/dashboard" replace>
              <Button click={() => backToDashboard(0)} customizeClass="auth">
                انصراف
              </Button>
            </Link>
          </div>
        </form>
      </Paper>
    </React.Fragment>
  );
};

export default PrivateBusinessMan;
