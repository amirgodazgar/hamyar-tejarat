import React, { useState } from "react";
import classes from "./import.module.css";
import { Chip, Fade, Typography } from "@material-ui/core";
import tariffSvg from "../../../../styles/svg/link.svg";
import { Link } from "react-router-dom";

const LocationPrice = ({ placeClearance, formik, chips, setChips }) => {
  const addChipsHandler = (e) => {
    const id = e.target.value;
    const text = e.nativeEvent.target[id].text;
    const updateValue = [];
    updateValue.push({
      id,
      name: text,
    });
    setChips((prevState) => [...prevState, ...updateValue]);
  };

  const chipDeleteHandler = (chip) => {
    const updateValue = chips.filter((_, index) => index !== chip);
    setChips([...updateValue]);
  };

  const errorBox = (name, label) => (
    <div className={classes.errorBox}>
      <label htmlFor={name}>{label}</label>
      {formik.touched[name] && formik.errors[name] ? (
        <Fade
          in={formik.touched[name] && formik.errors[name] ? true : false}
          timeout={400}
        >
          <div className={classes.error}>{/* {formik.errors[name]} */}</div>
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
        <div  className={classes.inputContainer}>
          <div className={classes.inputBox}>
            {errorBox("tariffCode", "کد تعرفه")}
            <input
              className={`${classes.tariff}  ${
                formik.touched.tariffCode && formik.errors.tariffCode
                  ? classes.inputError
                  : null
              } `}
              name="tariffCode"
              type="text"
              placeholder="0202"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tariffCode}
              required
            />
          </div>
          <div className={classes.inputBox}>
            {errorBox("cargoTitle", " عنوان کالا ")}
            <input
              className={`${classes.merchandise}  ${
                formik.touched.cargoTitle && formik.errors.cargoTitle
                  ? classes.inputError
                  : null
              } `}
              name="cargoTitle"
              type="text"
              placeholder="گوشت حیوانات از نوع گاو، منجمد"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cargoTitle}
              required
            />
          </div>
          <div className={classes.inputBox}>
            {errorBox("portOfLoading", "مبدا کالا ")}
            <input
              className={`${classes.originLoading}  ${
                formik.touched.portOfLoading && formik.errors.portOfLoading
                  ? classes.inputError
                  : null
              } `}
              name="portOfLoading"
              type="text"
              placeholder="بازارچه پرویزخان"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.portOfLoading}
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
            {errorBox("originCustomIds", "گمرک مقصد، محل ترخیص کالا ")}
            <select
              name="originCustomIds"
              value={formik.values.originCustomIds}
              onChange={(e) => addChipsHandler(e)}
              className={`${classes.originReleasingSelect}  ${
                formik.touched.originCustomIds &&
                formik.errors.originCustomIds &&
                formik.values.originCustomIds === "0"
                  ? classes.inputError
                  : null
              } `}
            >
              <option style={{ color: "rgba(0,0,0,0.4)" }}>انتخاب کنید</option>
              {placeClearance.map((option, index) => (
                <option value={option.id} key={index}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.selectedTariffBox}>
            <div className={classes.tariffListTitle}>گمرک های انتخاب شده</div>
            <div className={classes.selectedTariff}>
              {chips.map((item, index) =>
                index !== -1 ? (
                  <Chip
                    className={classes.chip}
                    label={item.name}
                    onDelete={() => chipDeleteHandler(index)}
                    key={item.id}
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
