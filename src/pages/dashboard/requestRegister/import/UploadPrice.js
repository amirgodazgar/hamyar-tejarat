import React from "react";
import classes from "./import.module.css";
import { Fade, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

const UploadPrice = () => {
  const initialValues = {
    packingType: "",
    amount: "",
    conveyance: "",
    priceValue: "",
  };

  const validationSchema = Yup.object({
    packingType: Yup.string().required("فیلد را پر کنید"),
    amount: Yup.string().required("فیلد را پر کنید"),
    conveyance: Yup.mixed().required("فیلد را پر کنید"),
    priceValue: Yup.mixed().required("فیلد را پر کنید"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const errorBox = (name, label) => (
    <div className={classes.errorBox}>
      <label htmlFor={name}>{label}</label>
      {formik.touched[name] && formik.errors[name] ? (
        <Fade
          in={formik.touched[name] && formik.errors[name] ? true : false}
          timeout={400}
        >
          <div className={classes.error}>{formik.errors[name]}</div>
        </Fade>
      ) : null}
    </div>
  );

  return (
    <React.Fragment>
      <Typography variant="body1" className={classes.fistStpSubTitle}>
        لطفا اطلاعات مربوط به مبدا و مقصد کالای موردنظر خود را وارد کنید
      </Typography>
      <div className={classes.formBox}>
        <form onSubmit={formik.handleSubmit} className={classes.inputContainer}>
          <div className={classes.UploadInputBox}>
            {errorBox("packingType", "نوع بسته بندی")}
            <input
              className={`${classes.packingType}  ${
                formik.touched.packingType && formik.errors.packingType
                  ? classes.inputError
                  : null
              } `}
              name="packingType"
              type="text"
              placeholder="بسته بندی معمولی"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.packingType}
              required
            />
          </div>
          <div className={classes.UploadInputBox}>
            {errorBox("amount", " میزان/ حجم کالای مورد نظر ")}
            <input
              className={`${classes.amount}  ${
                formik.touched.amount && formik.errors.amount
                  ? classes.inputError
                  : null
              } `}
              name="amount"
              type="text"
              placeholder=" 20 کیلوگرم "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              required
            />
          </div>
          <div className={classes.UploadInputBox}>
            {errorBox("conveyance", "وسیله حمل کالا ")}
            <select
              name="conveyance"
              value={formik.values.conveyance}
              onChange={formik.handleChange}
              className={`${classes.conveyanceSelect}  ${
                formik.touched.conveyance &&
                formik.errors.conveyance &&
                formik.values.conveyance === "0"
                  ? classes.inputError
                  : null
              } `}
            >
              <option value="0" style={{ color: "rgba(0,0,0,0.4)" }}>
                انتخاب کنید
              </option>
              <option value="2">هوایی</option>
              <option value="3">زمینی</option>
            </select>
          </div>
          <div className={classes.UploadInputBox}>
            {errorBox("priceValue", "ارزش کالای مورد نظر (تومان) ")}
            <input
              className={`${classes.priceValue}  ${
                formik.touched.priceValue && formik.errors.priceValue
                  ? classes.inputError
                  : null
              } `}
              name="priceValue"
              type="text"
              placeholder="70,000,000"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.packingType}
              required
            />
          </div>
        </form>
        <div className={classes.tariffCodes}></div>
        <div className={classes.tariffList}></div>
      </div>
    </React.Fragment>
  );
};

export default UploadPrice;
