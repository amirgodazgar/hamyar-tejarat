import React from "react";
import classes from "./import.module.css";
import { Typography, Fade } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

const UploadPurchase = ({
  transportTools,
  formik,
  setPerforma,
  setBillOfLoading,
  setPackingList,
}) => {
  const errorBox = (name, label) => (
    <div className={classes.errorBox}>
      <label htmlFor={name}>{label}</label>
      {formik.touched[name] && formik.errors[name] ? (
        <Fade
          in={formik.touched[name] && formik.errors[name] ? true : false}
          timeout={400}
        >
          <div className={classes.error}></div>
        </Fade>
      ) : null}
    </div>
  );

  return (
    <React.Fragment>
      <Typography variant="body1" className={classes.firstStpSubTitle_Upload}>
        لطفا تصویر مدارک درخواستی را با فرمت و حجم حداکثر کیلوبایت بارگذاری
        نمایید
      </Typography>
      <div className={classes.formBox}>
        <div className={classes.inputContainer}>
          <div className={classes.UploadInputBox}>
            {errorBox("packagingTypePurchase", "نوع بسته بندی")}
            <input
              className={`${classes.packingType}  ${
                formik.touched.packagingTypePurchase &&
                formik.errors.packagingTypePurchase
                  ? classes.inputError
                  : null
              } `}
              name="packagingTypePurchase"
              type="text"
              placeholder="بسته بندی معمولی"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.packagingTypePurchase}
              required
            />
          </div>
          <div className={classes.UploadInputBox}>
            {errorBox("cargoAmountPurchase", " میزان/ حجم کالای مورد نظر ")}
            <input
              className={`${classes.amount}  ${
                formik.touched.cargoAmountPurchase &&
                formik.errors.cargoAmountPurchase
                  ? classes.inputError
                  : null
              } `}
              name="cargoAmountPurchase"
              type="text"
              placeholder=" 20 کیلوگرم "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cargoAmountPurchase}
              required
            />
          </div>
          <div className={classes.UploadInputBox}>
            {errorBox("cargoTransportToolsPurchase", "وسیله حمل کالا ")}
            <select
              multiple={false}
              name="cargoTransportToolsPurchase"
              value={formik.values.cargoTransportToolsPurchase}
              onChange={formik.handleChange}
              className={`${classes.conveyanceSelect}  ${
                formik.touched.cargoTransportToolsPurchase &&
                formik.errors.cargoTransportToolsPurchase &&
                formik.values.cargoTransportToolsPurchase === "0"
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
            {errorBox("cargoValuePurchase", "ارزش کالای مورد نظر (تومان) ")}
            <input
              className={`${classes.priceValue}  ${
                formik.touched.cargoValuePurchase &&
                formik.errors.cargoValuePurchase
                  ? classes.inputError
                  : null
              } `}
              name="cargoValuePurchase"
              type="text"
              placeholder="70,000,000"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cargoValuePurchase}
              required
            />
          </div>
        </div>

        <div className={classes.inputContainer}>
          <div className={classes.uploadInputBox}>
            {errorBox("loadingBill", "بارگذاری بارنامه (Bill of Loading)")}

            <input
              className={classes.uploadInput}
              type="file"
              name="loadingBill"
              value={formik.values.loadingBill}
              onChange={(e) => setBillOfLoading(e.target.files[0])}
            />
            <CloudUpload fontSize="small" className={classes.uploadIcon} />
          </div>

          <div className={classes.uploadInputBox}>
            {errorBox("performa", "  بارگذاری پرفورما")}

            <input
              className={classes.uploadInput}
              type="file"
              name="performa"
              value={formik.values.performa}
              onChange={(e) => setPerforma(e.target.files[0])}
            />
            <CloudUpload fontSize="small" className={classes.uploadIcon} />
          </div>

          <from className={classes.uploadInputBox}>
            {errorBox("packingList", "بارگذاری فهرست عدل بندی  (Packing List)")}
            <input
              className={classes.uploadInput}
              type="file"
              name="packingList"
              value={formik.values.packingList}
              onChange={(e) => setPackingList(e.target.files[0])}
            />

            <CloudUpload fontSize="small" className={classes.uploadIcon} />
          </from>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadPurchase;
