import React, { memo } from "react";
import classes from "./import.module.css";
import { Fade, Typography } from "@material-ui/core";
import tariffSvg from "../../../../styles/svg/link.svg";
import { Link } from "react-router-dom";

const LocationPurchase = ({ placeClearancePurchase, formik }) => {
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
      <Typography variant="body1" className={classes.fistStpSubTitle}>
        لطفا اطلاعات مربوط به مبدا و مقصد کالای موردنظر خود را وارد کنید
      </Typography>
      <div className={classes.formBox}>
        <div className={classes.inputContainer}>
          <div className={classes.inputBox}>
            {errorBox("tariffCodePurchase", "کد تعرفه")}
            <input
              className={`${classes.tariff}  ${
                formik.touched.tariffCodePurchase &&
                formik.errors.tariffCodePurchase
                  ? classes.inputError
                  : null
              } `}
              name="tariffCodePurchase"
              type="text"
              placeholder="0202"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tariffCodePurchase}
              required
            />
          </div>
          <div className={classes.inputBox}>
            {errorBox("cargoTitlePurchase", " عنوان کالا ")}
            <input
              className={`${classes.merchandise}  ${
                formik.touched.cargoTitlePurchase &&
                formik.errors.cargoTitlePurchase
                  ? classes.inputError
                  : null
              } `}
              name="cargoTitlePurchase"
              type="text"
              placeholder="گوشت حیوانات از نوع گاو، منجمد"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cargoTitlePurchase}
              required
            />
          </div>
          <div className={classes.inputBox}>
            {errorBox("portOfLoadingPurchase", "مبدا کالا ")}
            <input
              className={`${classes.originLoading}  ${
                formik.touched.portOfLoadingPurchase &&
                formik.errors.portOfLoadingPurchase
                  ? classes.inputError
                  : null
              } `}
              name="portOfLoadingPurchase"
              type="text"
              placeholder="بازارچه پرویزخان"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.portOfLoadingPurchase}
              required
            />
          </div>
        </div>
        <div className={classes.tariffCodes}>
          <Link to="/Dashboard/tariffCodesList" target="blank">
            <img src={tariffSvg} alt="tariffCode" />
            <span>لیست کد تعرفه و اولویت های کالاهای گمرکی</span>
          </Link>
        </div>
        <div className={classes.tariffList}>
          <div className={classes.inputBox} style={{ width: "30%" }}>
            {errorBox("originCustomIdsPurchase", "گمرک مقصد، محل ترخیص کالا ")}
            <select
              multiple={false}
              name="originCustomIdsPurchase"
              value={formik.values.originCustomIdsPurchase}
              onChange={formik.handleChange}
              className={`${classes.originReleasingSelect}  ${
                formik.touched.originCustomIdsPurchase &&
                formik.errors.originCustomIdsPurchase &&
                formik.values.originCustomIdsPurchase === "0"
                  ? classes.inputError
                  : null
              } `}
            >
              <option style={{ color: "rgba(0,0,0,0.4)" }}>انتخاب کنید</option>
              {placeClearancePurchase.map((option, index) => (
                <option value={option.id} key={index}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(LocationPurchase);
