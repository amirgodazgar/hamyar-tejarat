import React, { useEffect, useState } from "react";
import InputField from "../../../../common/input/InputField";
import { Paper } from "@material-ui/core";
import Button from "../../../../common/button/Button";
import classes from "./businessMan.module.css";
import inputClass from "../../../../common/input/inputField.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminPanelData } from "../../../../constant/adminPanel";
import { Link } from "react-router-dom";
import { postBusinessmanPrivate } from "../../../../services/dashboard/userInfoServices";
import { useDispatch } from "react-redux";
import { getUserInfoData } from "../../../../store/dashboard/dashboardSlice";
import BackDrop from "../../../../common/backDrop/BackDrop";
import UserCheckBackDrop from "../../../../common/backDrop/UserCheckBackDrop";

const PrivateBusinessMan = ({ backToDashboard }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [alert, setAlert] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [open, setOpen] = useState(false);

  const confirmFailed = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getUserInfoData()).then((res) => {
      setUserData(res.payload);
    });
  }, []);

  const placeHolder = {
    firstName:
      userData.firstName === null || userData.firstName === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.firstName
        : userData.firstName,

    lastName:
      userData.lastName === null || userData.lastName === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.lastName
        : userData.lastName,

    nationalId:
      userData.nationalId === null || userData.nationalId === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.nationalId
        : userData.nationalId,

    phone:
      userData.phoneNumber === null || userData.phoneNumber === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.mobile
        : userData.phoneNumber,

    email:
      userData.email === null || userData.email === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.email
        : userData.email,
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
      .max(10, adminPanelData.userInfo.clearanceMan.error.nationalIdWrong)
      .min(10, adminPanelData.userInfo.clearanceMan.error.nationalIdWrong)
      .required(adminPanelData.userInfo.clearanceMan.error.nationalId),
    mobileNum: Yup.string()
      .max(11, adminPanelData.userInfo.clearanceMan.error.mobileWrong)
      .min(11, adminPanelData.userInfo.clearanceMan.error.mobileWrong)
      .required(adminPanelData.userInfo.clearanceMan.error.mobile),
  });

  const onSubmit = (values) => {
    const userInfo = {
      firstName: values.firstName,
      lastName: values.lastName,
      nationalId: values.nationalId,
      phoneNumber: values.mobileNum,
    };

    postBusinessmanPrivate(userInfo, setAlert, setIsConfirm, setOpen);
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
                  placeHolder={placeHolder.firstName}
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
                  placeHolder={placeHolder.lastName}
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
                  placeHolder={placeHolder.nationalId}
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
                placeHolder={placeHolder.phone}
              />
            </div>
            <div className={classes.emailBox_PB}>
              <div
                className={`${inputClass.labelBox} ${inputClass.userInfo_label}`}
              >
                <label className={inputClass.label} htmlFor="email">
                  {adminPanelData.userInfo.clearanceMan.forms.email}
                </label>
              </div>
              <input
                className={`${inputClass.textField} ${inputClass.userInfo_email_input}`}
                name="email"
                type="email"
                placeholder={placeHolder.email}
                disabled={true}
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
          
          {open ? (
            <UserCheckBackDrop
              setRoute={isConfirm ? "/Dashboard/main" : "/Dashboard/userInfo"}
              severity={isConfirm ? "success" : "error"}
              message={alert}
              reload={true}
            />
          ) : null}
        </Paper>
      ) : (
        <BackDrop />
      )}
    </React.Fragment>
  );
};

export default PrivateBusinessMan;
