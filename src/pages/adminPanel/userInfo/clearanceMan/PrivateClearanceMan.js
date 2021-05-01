import React, { useState } from "react";
import InputField from "../../../../common/input/InputField";
import { Chip, Paper } from "@material-ui/core";
import Button from "../../../../common/button/Button";
import classes from "./clearanceMan.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminPanelData } from "../../../../constant/adminPanel";
import { CloudUpload, Image } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
  const onSubmit = (values) => {
    values.clearances.push(...chips);
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validationSchema,
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
            <div>
              {
                adminPanelData.userInfo.privateClearanceMan.forms
                  .selectClearance
              }
            </div>
            <select
              name="selectClearance"
              value={chips}
              onChange={(e) => addChipsHandler(e.target.value)}
              className={classes.selectInput}
            >
              {adminPanelData.userInfo.privateClearanceMan.forms.options.map(
                (option) => (
                  <option
                    style={
                      option.value === "0" ? { color: "rgba(0,0,0,0.4)" } : null
                    }
                    value={option.value}
                    label={option.label}
                  />
                )
              )}
            </select>
          </div>
          <div className={`${classes.thirdRow} ${classes.criminalRecord} `}>
            <div>
              {
                adminPanelData.userInfo.privateClearanceMan.forms
                  .criminalRecordUpload
              }
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
            <div>
              {
                adminPanelData.userInfo.privateClearanceMan.forms
                  .WorkExperienceUpload
              }
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
