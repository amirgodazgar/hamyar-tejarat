import React, { useState } from "react";
import classes from "./import.module.css";
import { Chip, Fade, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import tariffSvg from "../../../../styles/svg/link.svg";
import { Link } from "react-router-dom";

const LocationPrice = () => {
  const [chips, setChips] = useState([]);
  const addChipsHandler = (value) => {
    const updateValue = [];
    updateValue.push(value);
    setChips((prevState) => [...prevState, ...updateValue]);
  };
  const chipDeleteHandler = (chip) => {
    const updateValue = chips.filter((_, index) => index !== chip);
    setChips([...updateValue]);
  };

  const initialValues = {
    tariff: "",
    originLoading: "",
    originReleasing: [],
    merchandise: "",
  };

  const validationSchema = Yup.object({
    tariff: Yup.string().required("کد تعرفه را وارد کنید"),
    originLoading: Yup.string().required("مبدا بارگیری کالا را وارد کنید"),
    originReleasing: Yup.mixed().required("گمرک یا محل ترخیص را وارد کنید"),
    merchandise: Yup.mixed().required("عنوان کالا را وارد کنید"),
  });

  const onSubmit = (values) => {
    console.log(values);
    values.originReleasing.push(...chips);
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
          <div className={classes.inputBox}>
            {errorBox("tariff", "کد تعرفه")}
            <input
              className={`${classes.tariff}  ${
                formik.touched.tariff && formik.errors.tariff
                  ? classes.inputError
                  : null
              } `}
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
            {errorBox("merchandise", " عنوان کالا ")}
            <input
              className={`${classes.merchandise}  ${
                formik.touched.merchandise && formik.errors.merchandise
                  ? classes.inputError
                  : null
              } `}
              name="merchandise"
              type="text"
              placeholder=" اسب و الاغ"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.merchandise}
              required
            />
          </div>
          <div className={classes.inputBox}>
            {errorBox("originLoading", "مبدا بارگیری کالا ")}
            <input
              className={`${classes.originLoading}  ${
                formik.touched.originLoading && formik.errors.originLoading
                  ? classes.inputError
                  : null
              } `}
              name="originLoading"
              type="text"
              placeHolder="بازارچه پرویزخان"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.originLoading}
              required
            />
          </div>
        </form>
        <div className={classes.tariffCodes}>
          <Link to="/Dashboard/tariffCodesList">
            <img src={tariffSvg} alt="tariffCode" />
            <span>لیست کد تعرفه و اولویت های کالاهای گمرکی</span>
          </Link>
        </div>
        <div className={classes.tariffList}>
          <div className={classes.inputBox} style={{ width: "30%" }}>
            {errorBox("originReleasing", "گمرک مقصد، محل ترخیص کالا ")}
            <select
              name="originReleasing"
              value={formik.values.originReleasing}
              onChange={(e) => addChipsHandler(e.target.value)}
              className={`${classes.originReleasingSelect}  ${
                formik.touched.originReleasing &&
                formik.errors.originReleasing &&
                formik.values.originReleasing === "0"
                  ? classes.inputError
                  : null
              } `}
            >
              {[
                { label: "انتخاب کنید", value: "0" },
                { label: " بازارچه پرویزخان", value: "بازارچه پرویزخان" },
                { label: " بازارچه پرویزخان", value: "بازارچه پرویزخان" },
                { label: " بازارچه پرویزخان", value: "بازارچه پرویزخان" },
              ].map((option, index) => (
                <option
                  style={
                    option.value === "0" ? { color: "rgba(0,0,0,0.4)" } : null
                  }
                  value={option.value}
                  label={option.label}
                  key={index}
                />
              ))}
            </select>
          </div>
          <div className={classes.selectedTariffBox}>
            <div className={classes.tariffListTitle}>گمرک های انتخاب شده</div>
            <div className={classes.selectedTariff}>
              {chips.map((item, index) =>
                item !== "0" ? (
                  <Chip
                    className={classes.chip}
                    label={item}
                    onDelete={() => chipDeleteHandler(index)}
                    key={index}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LocationPrice;
