import React, { useState } from "react";
import InputField from "../../../../common/input/InputField";
import { Chip, Paper, Fade } from "@material-ui/core";
import Button from "../../../../common/button/Button";
import classes from "./clearanceMan.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminPanelData } from "../../../../constant/adminPanel";
import { CloudUpload, Image } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const PrivateClearanceMan = ({ backToDashboard }) => {
  const [chips, setChips] = useState([]);
  const addChipsHandler = (value) => {
    const updateValue = [];
    updateValue.push(value);
    setChips((prevState) => [...prevState, ...updateValue]);
  };
  const chipDeleteHandler = (chip) => {
    const updateValue = chips.filter((_, index) => index !== chip);
    setChips([...updateValue]);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    clearanceId: "",
    mobile: "",
    address: "",
    email: "",
    workExperience: "",
    criminalRecord: "",
    selectClearance: "",
    clearances: [],
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("نام را وارد کنید"),
    lastName: Yup.string().required("نام خانوادگی را وارد کنید"),
    clearanceId: Yup.string()
      .min(11, "شماره صحیح نیست")
      .required(" کارگذاری را وارد کنید"),
    mobile: Yup.string()
      .min(11, "شماره موبایل صحیح نیست")
      .required("موبایل وارد کنید"),
    address: Yup.string().required("آدرس  را وارد کنید"),
    email: Yup.string().email("ایمیل صحیح نیست").required("ایمیل را وارد کنید"),
    selectClearance: Yup.string().required("گمرک مورد نظر خود را وارد کنید"),
    workExperience: Yup.mixed().required(),
    criminalRecord: Yup.mixed().required(),
  });

  const onSubmit = (values) => {
    console.log(values);
    values.clearances.push(...chips);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <React.Fragment>
      <Paper className={classes.paperPc}>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.PrivateClearanceMan}
        >
          <div className={`${classes.firstRow} ${classes.firstName} `}>
            <InputField
              customizeLabel="userInfo_label_PC"
              customizeInput="userInfo_input_PC"
              formik={formik}
              name="firstName"
              type="text"
              label={
                adminPanelData.userInfo.privateClearanceMan.forms.firstName
              }
              placeHolder={
                adminPanelData.userInfo.privateClearanceMan.placeHolder
                  .firstName
              }
            />
          </div>
          <div className={`${classes.firstRow} ${classes.lastName} `}>
            <InputField
              customizeLabel="userInfo_label_PC"
              customizeInput="userInfo_input_PC"
              formik={formik}
              name="lastName"
              type="text"
              label={adminPanelData.userInfo.privateClearanceMan.forms.lastName}
              placeHolder={
                adminPanelData.userInfo.privateClearanceMan.placeHolder.lastName
              }
            />
          </div>
          <div className={`${classes.firstRow} ${classes.clearanceId} `}>
            <InputField
              customizeLabel="userInfo_label_PC"
              customizeInput="userInfo_input_PC"
              formik={formik}
              name="clearanceId"
              type="text"
              label={
                adminPanelData.userInfo.privateClearanceMan.forms.clearanceId
              }
              placeHolder={
                adminPanelData.userInfo.privateClearanceMan.placeHolder
                  .clearanceId
              }
            />
          </div>
          <div className={`${classes.firstRow} ${classes.mobile} `}>
            <InputField
              customizeLabel="userInfo_label_PC"
              customizeInput="userInfo_input_PC"
              formik={formik}
              name="mobile"
              type="text"
              label={adminPanelData.userInfo.privateClearanceMan.forms.mobile}
              placeHolder={
                adminPanelData.userInfo.privateClearanceMan.placeHolder.mobile
              }
            />
          </div>

          <div className={classes.addressBox}>
            <InputField
              customizeLabel="userInfo_label_PC"
              customizeInput="userInfo_address_input_PC"
              formik={formik}
              name="address"
              type="text"
              label={adminPanelData.userInfo.privateClearanceMan.forms.address}
              placeHolder={
                adminPanelData.userInfo.privateClearanceMan.placeHolder.address
              }
            />
          </div>
          <div className={classes.emailBox}>
            <InputField
              customizeLabel="userInfo_label_PC"
              customizeInput="userInfo_email_input_PC"
              formik={formik}
              name="email"
              type="text"
              label={adminPanelData.userInfo.privateClearanceMan.forms.email}
              placeHolder={
                adminPanelData.userInfo.privateClearanceMan.placeHolder.email
              }
            />
          </div>

          <div className={`${classes.secondRow} ${classes.clearances} `}>
            <div className={classes.clearancesTitle}>
              {adminPanelData.userInfo.privateClearanceMan.forms.clearances}
            </div>
            <div className={classes.clearancesBox}>
              {chips.map((item, index) =>
                item !== "0" ? (
                  <Chip
                    className={classes.chip}
                    label={item}
                    onDelete={() => chipDeleteHandler(index)}
                    key={index}
                  />
                ) : null
              )}
            </div>
          </div>
          <div
            className={`${classes.secondRow} ${classes.imageCriminalRecord} `}
          >
            <div className={classes.imageCriminalRecordTitle}>
              {
                adminPanelData.userInfo.privateClearanceMan.forms
                  .criminalRecordImg
              }
            </div>
            <div className={classes.imageCriminalRecordBox}>
              {formik.values.criminalRecord ? (
                <img src={formik.values.criminalRecord} alt="criminal-record" />
              ) : (
                <Image fontSize="large" />
              )}
            </div>
          </div>
          <div
            className={`${classes.secondRow} ${classes.imageWorkExperience} `}
          >
            <div className={classes.imageWorkExperienceTitle}>
              {
                adminPanelData.userInfo.privateClearanceMan.forms
                  .WorkExperienceImg
              }
            </div>
            <div className={classes.imageWorkExperienceBox}>
              {formik.values.workExperience ? (
                <img src={formik.values.workExperience} alt="criminal-record" />
              ) : (
                <Image fontSize="large" />
              )}
            </div>
          </div>

          <div className={`${classes.thirdRow} ${classes.selectClearance} `}>
            <div className={classes.selectClearanceTitle}>
              {
                adminPanelData.userInfo.privateClearanceMan.forms
                  .selectClearance
              }
              {formik.touched.selectClearance &&
              chips.length === 0 &&
              formik.errors.selectClearance ? (
                <Fade
                  in={
                    formik.touched.selectClearance &&
                    chips.length === 0 &&
                    formik.errors.selectClearance
                      ? true
                      : false
                  }
                  timeout={400}
                >
                  <div className={classes.error}>
                    {formik.errors.selectClearance}
                  </div>
                </Fade>
              ) : null}
            </div>
            <select
              name="selectClearance"
              multiple={false}
              onChange={(e) => addChipsHandler(e.target.value)}
              className={`${classes.selectInput} ${
                formik.touched.selectClearance &&
                formik.errors.selectClearance &&
                chips.length === 0
                  ? classes.inputError
                  : null
              } `}
            >
              {adminPanelData.userInfo.privateClearanceMan.forms.options.map(
                (option, index) => (
                  <option
                    style={
                      option.value === "0" ? { color: "rgba(0,0,0,0.4)" } : null
                    }
                    value={option.value}
                    label={option.label}
                    key={index}
                  />
                )
              )}
            </select>
          </div>
          <div className={`${classes.thirdRow} ${classes.criminalRecord} `}>
            <div className={classes.criminalRecordTitle}>
              {
                adminPanelData.userInfo.privateClearanceMan.forms
                  .criminalRecordUpload
              }
              {formik.touched.criminalRecord && formik.errors.criminalRecord ? (
                <Fade
                  in={
                    formik.touched.criminalRecord &&
                    formik.errors.criminalRecord
                      ? true
                      : false
                  }
                  timeout={400}
                >
                  <Alert severity="error" className={classes.alert}></Alert>
                </Fade>
              ) : null}
            </div>
            <input
              className={classes.uploadInput}
              type="file"
              name="criminalRecord"
              value={formik.values.criminalRecord}
              onChange={formik.handleChange}
            />
            <CloudUpload fontSize="small" className={classes.uploadIcon} />
          </div>
          <div className={`${classes.thirdRow} ${classes.workExperience} `}>
            <div className={classes.workExperienceTitle}>
              {
                adminPanelData.userInfo.privateClearanceMan.forms
                  .WorkExperienceUpload
              }
              {formik.touched.workExperience && formik.errors.workExperience ? (
                <Fade
                  in={
                    formik.touched.workExperience &&
                    formik.errors.workExperience
                      ? true
                      : false
                  }
                  timeout={400}
                >
                  <Alert severity="error" className={classes.alert}></Alert>
                </Fade>
              ) : null}
            </div>
            <input
              className={classes.uploadInput}
              type="file"
              name="workExperience"
              value={formik.values.workExperience}
              onChange={formik.handleChange}
            />
            <CloudUpload fontSize="small" className={classes.uploadIcon} />
          </div>

          <div className={classes.BtnBox} type="submit">
            <Button type="submit" customizeClass="authActive">
              ثبت
            </Button>

            <Link to="/adminPanel/dashboard" replace>
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

export default PrivateClearanceMan;
