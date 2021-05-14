import React, { useState } from "react";
import classes from "./import.module.css";
import { Typography } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

const LocationPrice = () => {
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

  return (
    <React.Fragment>
      <Typography variant="body1" className={classes.fistStpSubTitle}>
        لطفا اطلاعات مربوط به مبدا و مقصد کالای موردنظر خود را وارد کنید
      </Typography>
      <div className={classes.formBox}>
        <div className={classes.inputBox}>
          <label htmlFor="tariff"> جنس و نوع کالا </label>
          <select
            name="tariff"
            className={classes.tariffSelect}
            value={formik.values.tariff}
            onChange={formik.handleChange}
          >
            <option value="1">انتخاب کنید</option>
            <option value="2">ممدخان</option>
            <option value="3">مصیب</option>
          </select>
        </div>

        <div className={classes.inputBox}>
          <label htmlFor="originLoading">مبدا بارگیری کالا </label>
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
      </div>
    </React.Fragment>
  );
};

export default LocationPrice;
