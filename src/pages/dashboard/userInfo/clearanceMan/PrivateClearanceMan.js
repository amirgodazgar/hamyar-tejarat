import React, { useEffect, useState } from "react";
import InputField from "../../../../common/input/InputField";
import { Chip, Paper, Fade } from "@material-ui/core";
import Button from "../../../../common/button/Button";
import classes from "./clearanceMan.module.css";
import inputClass from "../../../../common/input/inputField.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminPanelData } from "../../../../constant/adminPanel";
import { CloudUpload, Image } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { getUserInfoData } from "../../../../store/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";
import BackDrop from "../../../../common/backDrop/BackDrop";

const PrivateClearanceMan = ({ backToDashboard }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
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

  useEffect(() => {
    dispatch(getUserInfoData()).then((res) => {
      setUserData(res.payload);
    });
  }, []);

  // console.log("CP", userData);

  const placeHolder = {
    firstName:
      userData.firstName === null
        ? adminPanelData.userInfo.clearanceMan.placeHolder.firstName
        : userData.firstName,

    lastName:
      userData.lastName === null
        ? adminPanelData.userInfo.clearanceMan.placeHolder.lastName
        : userData.lastName,

    email:
      userData.email === null
        ? adminPanelData.userInfo.clearanceMan.placeHolder.email
        : userData.email,

    phoneNumber:
      userData.phoneNumber === null
        ? adminPanelData.userInfo.clearanceMan.placeHolder.mobile
        : userData.phoneNumber,

    officeAddress:
      userData.officeAddress === null
        ? adminPanelData.userInfo.clearanceMan.placeHolder.address
        : userData.officeAddress,

    customsBrokerageNumber:
      userData.customsBrokerageNumber === null
        ? adminPanelData.userInfo.clearanceMan.placeHolder.clearanceId
        : userData.customsBrokerageNumber,

    workExperienceImagePath: null,

    certificateOfNoCriminalRecordImagePath: null,
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    clearanceId: "",
    mobile: "",
    address: "",
    workExperience: "",
    criminalRecord: "",
    selectClearance: "",
    clearances: [],
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(
      adminPanelData.userInfo.clearanceMan.error.firstName
    ),
    lastName: Yup.string().required(
      adminPanelData.userInfo.clearanceMan.error.lastName
    ),
    clearanceId: Yup.string()
      .min(11, adminPanelData.userInfo.clearanceMan.error.wrongNumber)
      .required(adminPanelData.userInfo.clearanceMan.error.clearanceId),
    mobile: Yup.string()
      .min(11, adminPanelData.userInfo.clearanceMan.error.mobileWrong)
      .required(adminPanelData.userInfo.clearanceMan.error.mobile),
    address: Yup.string().required(
      adminPanelData.userInfo.clearanceMan.error.address
    ),
    // selectClearance: Yup.mixed().required(
    //   adminPanelData.userInfo.clearanceMan.error.selectClearance
    // ),
    workExperience: Yup.mixed().required(),
    criminalRecord: Yup.mixed().required(),
  });

  const onSubmit = (values) => {
    console.log(values);
    console.log("values");
    values.clearances.push(...chips);
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
            className={classes.privateClearanceMan}
          >
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
            <div className={`${classes.firstRow} ${classes.clearanceId} `}>
              <InputField
                customizeLabel="userInfo_label"
                customizeInput="userInfo_input"
                formik={formik}
                name="clearanceId"
                type="text"
                label={adminPanelData.userInfo.clearanceMan.forms.clearanceId}
                placeHolder={placeHolder.customsBrokerageNumber}
              />
            </div>
            <div className={`${classes.firstRow} ${classes.mobile} `}>
              <InputField
                customizeLabel="userInfo_label"
                customizeInput="userInfo_input"
                formik={formik}
                name="mobile"
                type="text"
                label={adminPanelData.userInfo.clearanceMan.forms.mobile}
                placeHolder={placeHolder.phoneNumber}
              />
            </div>

            <div className={classes.addressBox}>
              <InputField
                customizeLabel="userInfo_label"
                customizeInput="userInfo_address_input"
                formik={formik}
                name="address"
                type="text"
                label={adminPanelData.userInfo.clearanceMan.forms.address}
                placeHolder={placeHolder.officeAddress}
              />
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

            <div className={`${classes.secondRow} ${classes.clearances} `}>
              <div className={classes.clearancesTitle}>
                {adminPanelData.userInfo.clearanceMan.forms.clearances}
              </div>
              <div
                className={
                  chips.length === 0
                    ? classes.clearancesBox
                    : `${classes.clearancesBox} ${classes.active}`
                }
              >
                {/* {formik.values.clearances.length === 0
                  ? null
                  : formik.values.clearances.map((item, index) => (
                      <Chip
                        className={classes.chip}
                        label={item}
                        onDelete={() => chipDeleteHandler(index)}
                        key={index}
                      />
                    ))} */}
                {chips.length === 0
                  ? null
                  : chips.map((item, index) => (
                      <Chip
                        className={classes.chip}
                        label={item}
                        onDelete={() => chipDeleteHandler(index)}
                        key={index}
                      />
                    ))}
              </div>
            </div>
            <div
              className={`${classes.secondRow} ${classes.imageCriminalRecord} `}
            >
              <div className={classes.imageCriminalRecordTitle}>
                {adminPanelData.userInfo.clearanceMan.forms.criminalRecordImg}
              </div>
              <div className={classes.imageCriminalRecordBox}>
                {formik.values.criminalRecord ? (
                  <img
                    src={
                      userData.certificateOfNoCriminalRecordImagePath === null
                        ? formik.values.criminalRecord
                        : userData.certificateOfNoCriminalRecordImagePath
                    }
                    alt="criminal-record"
                  />
                ) : (
                  <Image
                    fontSize="large"
                    style={
                      userData.certificateOfNoCriminalRecordImagePath !== null
                        ? { display: "none" }
                        : null
                    }
                  />
                )}
              </div>
            </div>
            <div
              className={`${classes.secondRow} ${classes.imageWorkExperience} `}
            >
              <div className={classes.imageWorkExperienceTitle}>
                {adminPanelData.userInfo.clearanceMan.forms.WorkExperienceImg}
              </div>
              <div className={classes.imageWorkExperienceBox}>
                {formik.values.workExperience ? (
                  <img
                    src={
                      userData.workExperienceImagePath === null
                        ? formik.values.workExperience
                        : userData.workExperienceImagePath
                    }
                    alt="criminal-record"
                  />
                ) : (
                  <Image
                    fontSize="large"
                    style={
                      userData.workExperienceImagePath !== null
                        ? { display: "none" }
                        : null
                    }
                  />
                )}
              </div>
            </div>

            <div className={`${classes.thirdRow} ${classes.selectClearance} `}>
              <div className={classes.selectClearanceTitle}>
                {adminPanelData.userInfo.clearanceMan.forms.selectClearance}
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
                {!userData.customsList ? (
                  <option disabled label={"انتخاب کنید"} />
                ) : (
                  userData.customsList.map((option) => (
                    <option
                      value={option.name}
                      label={option.name}
                      key={option.id}
                    />
                  ))
                )}
              </select>
            </div>
            <div className={`${classes.thirdRow} ${classes.criminalRecord} `}>
              <div className={classes.criminalRecordTitle}>
                {
                  adminPanelData.userInfo.clearanceMan.forms
                    .criminalRecordUpload
                }
                {formik.touched.criminalRecord &&
                formik.errors.criminalRecord ? (
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
                  adminPanelData.userInfo.clearanceMan.forms
                    .WorkExperienceUpload
                }
                {formik.touched.workExperience &&
                formik.errors.workExperience ? (
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

            <div className={classes.BtnBox}>
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

export default PrivateClearanceMan;
