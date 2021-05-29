import React from "react";
import classes from "./import.module.css";
import { Fade, Typography } from "@material-ui/core";

const UploadPrice = ({ transportTools, formik }) => {
  const errorBox = (name, label) => (
    <div className={classes.errorBox}>
      <label htmlFor={name}>{label}</label>
      {formik.touched[name] && formik.errors[name] ? (
        <Fade
          in={formik.touched[name] && formik.errors[name] ? true : false}
          timeout={400}
        >
          <div className={classes.error}>
          {/* {formik.errors[name]} */}
          </div>
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
            {errorBox("packagingType", "نوع بسته بندی")}
            <input
              className={`${classes.packingType}  ${
                formik.touched.packagingType && formik.errors.packagingType
                  ? classes.inputError
                  : null
              } `}
              name="packagingType"
              type="text"
              placeholder="بسته بندی معمولی"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.packagingType}
              required
            />
          </div>
          <div className={classes.UploadInputBox}>
            {errorBox("cargoAmount", " میزان/ حجم کالای مورد نظر ")}
            <input
              className={`${classes.amount}  ${
                formik.touched.cargoAmount && formik.errors.cargoAmount
                  ? classes.inputError
                  : null
              } `}
              name="cargoAmount"
              type="text"
              placeholder=" 20 کیلوگرم "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cargoAmount}
              required
            />
          </div>
          <div className={classes.UploadInputBox}>
            {errorBox("cargoTransportTools", "وسیله حمل کالا ")}
            <select
              name="cargoTransportTools"
              value={formik.values.cargoTransportTools}
              onChange={formik.handleChange}
              className={`${classes.conveyanceSelect}  ${
                formik.touched.cargoTransportTools &&
                formik.errors.cargoTransportTools &&
                formik.values.cargoTransportTools === "0"
                  ? classes.inputError
                  : null
              } `}
            >
              <option style={{ color: "rgba(0,0,0,0.4)" }}>انتخاب کنید</option>
              {transportTools.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.UploadInputBox}>
            {errorBox("cargoValue", "ارزش کالای مورد نظر (تومان) ")}
            <input
              className={`${classes.priceValue}  ${
                formik.touched.cargoValue && formik.errors.cargoValue
                  ? classes.inputError
                  : null
              } `}
              name="cargoValue"
              type="text"
              placeholder="70,000,000"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cargoValue}
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
