import React from "react";
import classes from "./import.module.css";
import { Typography, Fade } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CloudUpload, Image } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

const UploadPurchase = () => {
  const initialValues = {
    loadingBill: "",
    performa: "",
    packingList: "",
  };

  const validationSchema = Yup.object({
    loadingBill: Yup.mixed().required(),
    performa: Yup.mixed().required(),
    packingList: Yup.mixed().required(),
  });

  const onSubmit = (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <React.Fragment>
      <Typography variant="body1" className={classes.firstStpSubTitle_Upload}>
        لطفا تصویر مدارک درخواستی را با فرمت و حجم حداکثر کیلوبایت بارگذاری
        نمایید
      </Typography>
      <div className={classes.uploadContainer}>
        <div className={classes.uploadImgBox}>
          <div className={classes.uploadImgTitle}> پیش نمایش تصویر بارنامه</div>
          <div className={classes.uploadImg}>
            {formik.values.loadingBill ? (
              <img src={formik.values.loadingBill} alt="criminal-record" />
            ) : (
              <Image fontSize="large" />
            )}
          </div>
        </div>

        <div className={classes.uploadImgBox}>
          <div className={classes.uploadImgTitle}> پیش نمایش تصویر پرفورما</div>
          <div className={classes.uploadImg}>
            {formik.values.performa ? (
              <img src={formik.values.performa} alt="criminal-record" />
            ) : (
              <Image fontSize="large" />
            )}
          </div>
        </div>

        <div className={classes.uploadImgBox}>
          <div className={classes.uploadImgTitle}>
            پیش نمایش تصویر فهرست عدل بندی
          </div>
          <div className={classes.uploadImg}>
            {formik.values.packingList ? (
              <img src={formik.values.packingList} alt="criminal-record" />
            ) : (
              <Image fontSize="large" />
            )}
          </div>
        </div>
      </div>

      <div className={classes.inputContainer}>
        <div className={classes.uploadInputBox}>
          <div className={classes.uploadInputBoxTitle}>
            بارگذاری بارنامه یا Bill of Loading
            {formik.touched.workExperience && formik.errors.workExperience ? (
              <Fade
                in={
                  formik.touched.workExperience && formik.errors.workExperience
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
            name="loadingBill"
            value={formik.values.loadingBill}
            onChange={formik.handleChange}
          />
          <CloudUpload fontSize="small" className={classes.uploadIcon} />
        </div>

        <div className={classes.uploadInputBox}>
          <div className={classes.uploadInputBoxTitle}>
            بارگذاری پرفورما
            {formik.touched.workExperience && formik.errors.workExperience ? (
              <Fade
                in={
                  formik.touched.workExperience && formik.errors.workExperience
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
            name="performa"
            value={formik.values.performa}
            onChange={formik.handleChange}
          />
          <CloudUpload fontSize="small" className={classes.uploadIcon} />
        </div>

        <div className={classes.uploadInputBox}>
          <div className={classes.uploadInputBoxTitle}>
            بارگذاری فهرست عدل بندی یا Packing List
            {formik.touched.workExperience && formik.errors.workExperience ? (
              <Fade
                in={
                  formik.touched.workExperience && formik.errors.workExperience
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
            name="packingList"
            value={formik.values.packingList}
            onChange={formik.handleChange}
          />
          <CloudUpload fontSize="small" className={classes.uploadIcon} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadPurchase;
