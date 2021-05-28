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
import { postClearancePrivate } from "../../../../services/dashboard/userInfoServices";

const PrivateClearanceMan = ({ backToDashboard }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [workExpImg, setWorkExpImg] = useState(null);
  const [crimeImg, setCrimeImg] = useState(null);
  const initChips =
    userData.choosedCustoms === undefined ? [] : userData.choosedCustoms;
  const [chips, setChips] = useState(initChips);

  const addChipsHandler = (e) => {
    const id = e.target.value;
    const label = e.nativeEvent.target[id - 1].label;
    const updateValue = [];
    updateValue.push({
      id,
      name: label,
    });
    setChips((prevState) => [...prevState, ...updateValue]);
  };

  const chipDeleteHandler = (chip) => {
    const updateValue = chips.filter((_, index) => index !== chip);
    setChips([...updateValue]);
  };

  const onChangeWorkExpImg = (e) => {
    setWorkExpImg(e.target.files[0]);
  };
  const onChangeCrimeImg = (e) => {
    setCrimeImg(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(getUserInfoData()).then((res) => {
      setUserData(res.payload);
      setChips(res.payload.choosedCustoms);
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

    email:
      userData.email === null || userData.email === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.email
        : userData.email,

    phoneNumber:
      userData.phoneNumber === null || userData.phoneNumber === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.mobile
        : userData.phoneNumber,

    officeAddress:
      userData.officeAddress === null || userData.officeAddress === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.address
        : userData.officeAddress,

    customsBrokerageNumber:
      userData.customsBrokerageNumber === null ||
      userData.customsBrokerageNumber === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.clearanceId
        : userData.customsBrokerageNumber,
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
    clearances: null,
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
      .max(11, adminPanelData.userInfo.clearanceMan.error.wrongNumber)
      .required(adminPanelData.userInfo.clearanceMan.error.clearanceId),
    mobile: Yup.string()
      .min(11, adminPanelData.userInfo.clearanceMan.error.mobileWrong)
      .max(11, adminPanelData.userInfo.clearanceMan.error.mobileWrong)
      .required(adminPanelData.userInfo.clearanceMan.error.mobile),
    address: Yup.string().required(
      adminPanelData.userInfo.clearanceMan.error.address
    ),
    // selectClearance: Yup.mixed().required(
    //   adminPanelData.userInfo.clearanceMan.error.selectClearance
    // ),
    // workExperience: Yup.mixed().required(),
    // criminalRecord: Yup.mixed().required(),
  });

  const onSubmit = (values) => {
    console.log(values);
    const ids = chips === undefined ? [] : chips.map((item) => +item.id);
    values.clearances = chips === undefined ? [] : chips;
    const formData = new FormData();
    formData.append(
      "FirstName",
      userData.firstName !== null ? userData.firstName : values.firstName
    );
    formData.append(
      "LastName",
      userData.lastName !== null ? userData.lastName : values.lastName
    );
    formData.append(
      "CustomsBrokerageNumber",
      userData.clearanceId !== undefined
        ? userData.clearanceId
        : values.clearanceId
    );
    formData.append(
      "PhoneNumber",
      userData.mobile !== undefined ? userData.mobile : values.mobile
    );
    formData.append(
      "OfficeAddress",
      userData.address !== undefined ? userData.address : values.address
    );
    formData.append(
      "ChoosedCustomIds",
      userData.choosedCustoms.length === 0 ||
        userData.choosedCustoms === undefined
        ? ids
        : userData.ChoosedCustomIds
    );
    formData.append(
      "CertificateOfNoCriminalRecordImage",
      workExpImg ? workExpImg : userData.workExperienceImagePath
    );
    formData.append(
      "WorkExperienceImage",
      crimeImg ? crimeImg : userData.certificateOfNoCriminalRecordImagePath
    );

    postClearancePrivate(formData);
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
                {chips.length === 0
                  ? null
                  : chips.map((item, index) => {
                      const filtered = chips.filter(
                        (curItem) => curItem.id !== item.id
                      );
                      return (
                        <Chip
                          className={classes.chip}
                          label={item.name}
                          onDelete={() => chipDeleteHandler(index)}
                          key={item.id}
                        />
                      );
                    })}
              </div>
            </div>
            <div
              className={`${classes.secondRow} ${classes.imageCriminalRecord} `}
            >
              <div className={classes.imageCriminalRecordTitle}>
                {adminPanelData.userInfo.clearanceMan.forms.criminalRecordImg}
              </div>
              <div className={classes.imageCriminalRecordBox}>
                {userData.certificateOfNoCriminalRecordImagePath !== null ? (
                  <img
                    src={
                      userData.certificateOfNoCriminalRecordImagePath === null
                        ? null
                        : `https://lunacyst.ir/${userData.certificateOfNoCriminalRecordImagePath}`
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
                {userData.workExperienceImagePath !== null ? (
                  <img
                    src={
                      userData.workExperienceImagePath === null
                        ? null
                        : `https://lunacyst.ir/${userData.workExperienceImagePath}`
                    }
                    alt="criminal-record"
                  />
                ) : (
                  <div
                    style={
                      userData.workExperienceImagePath !== null
                        ? { display: "none" }
                        : null
                    }
                  >
                    <Image fontSize="large" />
                  </div>
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
                onChange={(e) => addChipsHandler(e)}
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
                      value={option.id}
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
                onChange={(e) => onChangeCrimeImg(e)}
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
                onChange={(e) => onChangeWorkExpImg(e)}
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
