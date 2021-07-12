import React, { memo, useEffect, useState } from "react";
import InputField from "../../../../common/input/InputField";
import { Paper } from "@material-ui/core";
import Button from "../../../../common/button/Button";
import classes from "./businessMan.module.css";
import inputClass from "../../../../common/input/inputField.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminPanelData } from "../../../../constant/adminPanel";
import { Link } from "react-router-dom";
import { postBusinessmanJuridical } from "../../../../services/dashboard/userInfoServices";
import { useDispatch } from "react-redux";
import BackDrop from "../../../../common/backDrop/BackDrop";
import { getUserInfoData } from "../../../../store/dashboard/dashboardSlice";
import UserCheckBackDrop from "../../../../common/backDrop/UserCheckBackDrop";

const JuridicalBusinessMan = ({ backToDashboard }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [alert, setAlert] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getUserInfoData()).then((res) => {
      console.log(res.payload);
      setUserData(res.payload);
    });
  }, []);

  const placeHolder = {
    companyName:
      userData.companyName === null || userData.companyName === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.companyName
        : userData.companyName,

    companyNationalId:
      userData.nationalCompanyId === null ||
      userData.nationalCompanyId === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.companyNationalId
        : userData.nationalCompanyId,

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
    companyName: "",
    companyNationalId: "",
    mobileNum: "",
    email: "",
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required(
      adminPanelData.userInfo.clearanceMan.error.companyName
    ),
    companyNationalId: Yup.string().required(
      adminPanelData.userInfo.clearanceMan.error.companyNationalId
    ),
    mobileNum: Yup.string()
      .min(11, adminPanelData.userInfo.clearanceMan.error.mobileWrong)
      .required(adminPanelData.userInfo.clearanceMan.error.mobile),
  });

  const onSubmit = (values) => {
    const userInfo = {
      companyName: values.companyName,
      nationalCompanyId: values.companyNationalId,
      phoneNumber: values.mobileNum,
    };

    setIsLoading(true);
    postBusinessmanJuridical(
      userInfo,
      setAlert,
      setIsConfirm,
      setOpen,
      setIsLoading
    );
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
                  placeHolder={placeHolder.companyName}
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
                  placeHolder={placeHolder.companyNationalId}
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
                  placeHolder={placeHolder.phone}
                />
              </div>
            </div>

            <div className={classes.emailBox}>
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

            <div className={classes.BtnBox} type="submit">
              <Button type="submit" customizeClass="authActive">
                ثبت
              </Button>

              {isLoading ? <BackDrop /> : null}

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
export default memo(JuridicalBusinessMan);
