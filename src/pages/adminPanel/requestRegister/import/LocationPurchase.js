import React from "react";
import classes from "./import.module.css";
import { Fade, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import tariffSvg from "../../../../styles/svg/link.svg";
import { Link } from "react-router-dom";

const LocationPurchase = () => {
  const initialValues = {
    tariff: "",
    originLoading: "",
    originReleasing: "",
  };

  const validationSchema = Yup.object({
    tariff: Yup.string().required("error"),
    originLoading: Yup.string().required("error"),
    originReleasing: Yup.string().required("error"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const errorBox = (name) => (
    <div>
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
          <div className={classes.inputBox}>
            <label htmlFor="tariff">کد تعرفه</label>
            {errorBox("tariff")}
            <input
              className={classes.tariffSelect}
              name="tariff"
              type="text"
              placeHolder="0101"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tariff}
              required
            />
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="originLoading">مبدا بارگیری کالا </label>
            {errorBox("originLoading")}
            <input
              className={classes.originLoading}
              name="originLoading"
              type="text"
              placeHolder="بازارچه پرویزخان"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.originLoading}
              required
            />
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="originReleasing">گمرک مقصد، محل ترخیص کالا </label>
            {errorBox("originReleasing")}
            <select
              name="originReleasing"
              className={classes.originReleasingSelect}
              value={formik.values.originReleasing}
              onChange={formik.handleChange}
            >
              <option value="1">انتخاب کنید</option>
              <option value="2">ممدخان</option>
              <option value="3">مصیب</option>
            </select>
          </div>
        </form>
        <div className={classes.tariffCodes}>
          <Link to="/">
            <img src={tariffSvg} alt="tariffCode" />
            <span>لیست کد تعرفه و اولویت های کالاهای گمرکی</span>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LocationPurchase;
