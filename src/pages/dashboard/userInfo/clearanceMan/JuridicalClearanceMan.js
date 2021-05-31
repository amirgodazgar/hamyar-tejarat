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
import { postClearanceJuridical } from "../../../../services/dashboard/userInfoServices";
import UserCheckBackDrop from "../../../../common/backDrop/UserCheckBackDrop";

const JuridicalClearanceMan = ({ backToDashboard }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [alert, setAlert] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [open, setOpen] = useState(false);
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
      // console.log(res.payload);
    });
  }, []);

  const placeHolder = {
    companyName:
      userData.companyName === null || userData.companyName === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.companyName
        : userData.companyName,

    nationalCompanyId:
      userData.nationalCompanyId === null ||
      userData.nationalCompanyId === undefined
        ? adminPanelData.userInfo.clearanceMan.placeHolder.companyNationalId
        : userData.nationalCompanyId,

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
  };

  const initialValues = {
    companyName: "",
    companyNationalId: "",
    mobileNum: "",
    address: "",
    workExperience: "",
    criminalRecord: "",
    selectClearance: "",
    clearances: null,
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required(
      adminPanelData.userInfo.clearanceMan.error.companyName
    ),

    companyNationalId: Yup.string()
      .min(11, adminPanelData.userInfo.clearanceMan.error.wrongNumber)
      .max(11, adminPanelData.userInfo.clearanceMan.error.wrongNumber)
      .required(adminPanelData.userInfo.clearanceMan.error.companyNationalId),
    mobileNum: Yup.string()
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
    const ids = chips === undefined ? [] : chips.map((item) => +item.id);
    const choosedCustomsIds =
      userData.choosedCustoms.length === 0
        ? []
        : userData.choosedCustoms.map((item) => +item.id);
    const filteredIds = [...new Set(ids)];
    let idContainer;
    choosedCustomsIds.forEach((itm) => {
      idContainer = ids.filter((item) => item !== itm);
    });
    const concatIds = [...new Set(idContainer)];
    // console.log(concatIds);

    values.clearances = chips === undefined ? [] : chips;
    const formData = new FormData();
    formData.append(
      "CompanyName",
      userData.companyName !== null ? userData.companyName : values.companyName
    );
    formData.append(
      "NationalCompanyId",
      userData.nationalCompanyId !== null
        ? userData.nationalCompanyId
        : values.companyNationalId
    );
    formData.append(
      "PhoneNumber",
      userData.phoneNumber !== null ? userData.phoneNumber : values.mobileNum
    );
    formData.append(
      "OfficeAddress",
      userData.officeAddress !== null ? userData.officeAddress : values.address
    );
    formData.append(
      "StringChoosedCustomIds",
      userData.choosedCustoms.length === 0 ? filteredIds : concatIds
    );
    formData.append(
      "CertificateOfNoCriminalRecordImage",
      workExpImg ? workExpImg : userData.workExperienceImagePath
    );
    formData.append(
      "WorkExperienceImage",
      crimeImg ? crimeImg : userData.certificateOfNoCriminalRecordImagePath
    );

    postClearanceJuridical(formData, setAlert, setIsConfirm, setOpen);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validationSchema,
  });

  return (
    <React.Fragment>
      {userData ? (
        <Paper className={classes.paper}>
          <form
            onSubmit={formik.handleSubmit}
            className={classes.juridicalClearanceMan}
          >
            <div className={classes.firstRow_JC}>
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
                  placeHolder={placeHolder.nationalCompanyId}
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
                  placeHolder={placeHolder.phoneNumber}
                />
              </div>
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
          {open ? (
            <UserCheckBackDrop
              setRoute={isConfirm ? "/Dashboard/main" : "/Dashboard/userInfo"}
              severity={isConfirm ? "success" : "error"}
              message={alert}
            />
          ) : null}
        </Paper>
      ) : (
        <BackDrop />
      )}
    </React.Fragment>
  );
};

export default JuridicalClearanceMan;
