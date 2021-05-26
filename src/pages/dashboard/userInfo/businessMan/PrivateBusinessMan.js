import React, { useEffect, useState } from "react";
import InputField from "../../../../common/input/InputField";
import { Paper } from "@material-ui/core";
import Button from "../../../../common/button/Button";
import classes from "./businessMan.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminPanelData } from "../../../../constant/adminPanel";
import { Link } from "react-router-dom";
import { postBusinessmanPrivate } from "../../../../services/userInfo/userInfoServices";
import { useDispatch } from "react-redux";
import { getUserInfoData } from "../../../../store/dashboard/dashboardSlice";
import BackDrop from "../../../../common/backDrop/BackDrop";

const PrivateBusinessMan = ({ backToDashboard }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   dispatch(getUserInfoData()).then((res) => {

  //   });
  // }, []);

  const userData = {
    firstName: "نام دریافتی از api",
    lastName: "نام دریافتی از api",
    nationalId: "کدملی دریافتی از api",
    phone: "تلفن دریافتی از api",
    email: "ایمیل دریافتی از api",
  };

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
    console.log("PB",userInfo);
    postBusinessmanPrivate(userInfo);
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
                  placeHolder={userData.firstName}
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
                  placeHolder={userData.lastName}
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
                  placeHolder={userData.nationalId}
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
                placeHolder={userData.phone}
              />
            </div>
            <div className={classes.emailBox_PB}>
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

            <div className={classes.BtnBox_PB} type="submit">
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
    </React.Fragment>
  );
};

export default PrivateBusinessMan;
