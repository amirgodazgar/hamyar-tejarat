import React from "react";
import InputField from "../../../../common/input/InputField";
import { Paper } from "@material-ui/core";
import Button from "../../../../common/button/Button";
import classes from "./businessMan.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminPanelData } from "../../../../constant/adminPanel";
import { Link } from "react-router-dom";
import { postBusinessmanJuridical } from "../../../../services/userInfo/userInfoServices";
import { useDispatch } from "react-redux";
import BackDrop from "../../../../common/backDrop/BackDrop";

const JuridicalBusinessMan = ({ backToDashboard }) => {
  const dispatch = useDispatch();

  const userData = {
    companyName: "نام دریافتی از api",
    companyNationalId: "نام دریافتی از api",
    phone: "تلفن دریافتی از api",
    email: "ایمیل دریافتی از api",
  };

  const initialValues = {
    companyName: "",
    companyNationalId: "",
    mobileNum: "",
    email: "",
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required(
      adminPanelData.userInfo.clearanceMan.error.companyName
    ),
    companyNationalId: Yup.string()
      .min(11, adminPanelData.userInfo.clearanceMan.error.wrongNumber)
      .required(adminPanelData.userInfo.clearanceMan.error.companyNationalId),
    mobileNum: Yup.string()
      .min(11, adminPanelData.userInfo.clearanceMan.error.mobileWrong)
      .required(adminPanelData.userInfo.clearanceMan.error.mobile),
    email: Yup.string()
      .email(adminPanelData.userInfo.clearanceMan.error.emailWrong)
      .required(adminPanelData.userInfo.clearanceMan.error.email),
  });

  const onSubmit = (values) => {
    const userInfo = {
      companyName: values.companyName,
      nationalCompanyId: values.companyNationalId,
      phoneNumber: values.mobileNum,
    };
    console.log("JB",userInfo);
    postBusinessmanJuridical(userInfo);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <React.Fragment>
      {userData ? (
        <Paper className={classes.paper}>
          <form
            onSubmit={formik.handleSubmit}
            className={classes.juridicalBusinessMan}
          >
            <div className={classes.firstRow_JB}>
              <div className={`${classes.firstRow} ${classes.companyName} `}>
                <InputField
                  customizeLabel="userInfo_label"
                  customizeInput="userInfo_input"
                  formik={formik}
                  name="companyName"
                  type="text"
                  label={adminPanelData.userInfo.clearanceMan.forms.companyName}
                  placeHolder={userData.companyName}
                />
              </div>
              <div
                className={`${classes.firstRow} ${classes.companyNationalId} `}
              >
                <InputField
                  customizeLabel="userInfo_label"
                  customizeInput="userInfo_input"
                  formik={formik}
                  name="companyNationalId"
                  type="text"
                  label={
                    adminPanelData.userInfo.clearanceMan.forms.companyNationalId
                  }
                  placeHolder={userData.companyNationalId}
                />
              </div>
              <div className={`${classes.firstRow} ${classes.mobileNum} `}>
                <InputField
                  customizeLabel="userInfo_label"
                  customizeInput="userInfo_input"
                  formik={formik}
                  name="mobileNum"
                  type="text"
                  label={adminPanelData.userInfo.clearanceMan.forms.mobile}
                  placeHolder={userData.phone}
                />
              </div>
            </div>

            <div className={classes.emailBox}>
              <InputField
                disable={true}
                customizeLabel="userInfo_label"
                customizeInput="userInfo_email_input"
                formik={formik}
                name="email"
                type="text"
                label={adminPanelData.userInfo.clearanceMan.forms.email}
                placeHolder={userData.email}
              />
            </div>

            <div className={classes.BtnBox} type="submit">
              <Button type="submit" customizeClass="authActive">
                ثبت
              </Button>

              <Link to="/Dashboard/main" replace>
                <Button click={() => backToDashboard(0)} customizeClass="auth">
                  انصراف
                </Button>
              </Link>
            </div>
          </form>
        </Paper>
      ) : (
        <BackDrop />
      )}
      ;
    </React.Fragment>
  );
};
export default JuridicalBusinessMan;
