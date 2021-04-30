import React from "react";
import InputField from "../../../../common/input/InputField";
import { Paper } from "@material-ui/core";
import Button from "../../../../common/button/Button";
import classes from "./clearanceMan.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminPanelData } from "../../../../constant/adminPanel";
import { CloudUpload } from "@material-ui/icons";

const PrivateClearanceMan = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    clearanceId: "",
    mobile: "",
    address: "",
    email: "",
  };
  const onSubmit = (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    //  validationSchema,
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
      <Paper className={classes.PrivateClearanceMan}>
        <div className={classes.firstRow}>
          <InputField
            customizeLabel="userInfo_label_PC"
            customizeInput="userInfo_input_PC"
            formik={formik}
            name="firstName"
            type="text"
            label={adminPanelData.userInfo.privateClearanceMan.forms.firstName}
            placeHolder="example@gmail.com"
          />
        </div>
        <div className={classes.firstRow}>
          <InputField
            customizeLabel="userInfo_label_PC"
            customizeInput="userInfo_input_PC"
            formik={formik}
            name="lastName"
            type="text"
            label={adminPanelData.userInfo.privateClearanceMan.forms.lastName}
            placeHolder="example@gmail.com"
          />
        </div>
        <div className={classes.firstRow}>
          <InputField
            customizeLabel="userInfo_label_PC"
            customizeInput="userInfo_input_PC"
            formik={formik}
            name="clearanceId"
            type="text"
            label={
              adminPanelData.userInfo.privateClearanceMan.forms.clearanceId
            }
            placeHolder="example@gmail.com"
          />
        </div>
        <div className={classes.firstRow}>
          <InputField
            customizeLabel="userInfo_label_PC"
            customizeInput="userInfo_input_PC"
            formik={formik}
            name="mobile"
            type="text"
            label={adminPanelData.userInfo.privateClearanceMan.forms.mobile}
            placeHolder="example@gmail.com"
          />
        </div>

        <div className={classes.addressBox}>
          <InputField
            customizeLabel="userInfo_label_PC"
            customizeInput="userInfo_input_PC"
            formik={formik}
            name="address"
            type="text"
            label={adminPanelData.userInfo.privateClearanceMan.forms.address}
            placeHolder="example@gmail.com"
          />
        </div>
        <div className={classes.emailBox}>
          <InputField
            customizeLabel="userInfo_label_PC"
            customizeInput="userInfo_input_PC"
            formik={formik}
            name="email"
            type="text"
            label={adminPanelData.userInfo.privateClearanceMan.forms.email}
            placeHolder="example@gmail.com"
          />
        </div>

        <div className={`${classes.secondRow} ${classes.clearances} `}>1</div>
        <div className={`${classes.secondRow} ${classes.imageCriminalRecord} `}>
          2
        </div>
        <div className={`${classes.secondRow} ${classes.imageWorkExperience} `}>
          3
        </div>

        <div className={`${classes.thirdRow} ${classes.selectClearance} `}>
          <div>سابقه کار</div>
          <select name="clearances" className={classes.selectInput}>
            <option value="0">انتخاب کنید</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className={`${classes.thirdRow} ${classes.criminalRecord} `}>
          <div>سابقه کار</div>
          <input type="file" name="criminalRecord" />
          <CloudUpload fontSize="small" className={classes.uploadIcon} />
        </div>
        <div className={`${classes.thirdRow} ${classes.workExperience} `}>
          <div>سابقه کار</div>
          <div>
            <input type="file" name="workExperience" />
            <CloudUpload fontSize="small" className={classes.uploadIcon} />
          </div>
        </div>

        <button className={classes.submitBtn} type="submit">
          ثبت
        </button>
        <button className={classes.cancelBtn}>انصراف</button>
      </Paper>
    </React.Fragment>
  );
};

export default PrivateClearanceMan;
