import React, { useState } from "react";
import classes from "./import.module.css";
import { Typography } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../../../common/input/InputField";

const Location = () => {
  const [priceSelect, setPriceSelect] = useState(false);
  const [purchaseSelect, setPurchaseSelect] = useState(false);

  const priceHandler = () => {
    setPriceSelect(true);
    setPurchaseSelect(false);
  };
  const purchaseHandler = () => {
    setPurchaseSelect(true);
    setPriceSelect(false);
  };

  const initialValues = {
    merchandise: "",
    originLoading: "",
    originReleasing: "",
  };

  const validationSchema = Yup.object({
    merchandise: Yup.string().required("error"),
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
        آیا کالای خود را خریداری نموده اید و یا قصد استعلام قیمت را دارید؟
      </Typography>
      <div className={classes.selectBox_stepTwo}>
        <div
          className={`${classes.purchase} ${
            purchaseSelect ? classes.selected : null
          }`}
          onClick={purchaseHandler}
        >
          <Typography variant="button">کالا خریداری شده </Typography>
        </div>
        <div
          className={`${classes.price} ${
            priceSelect ? classes.selected : null
          }`}
          onClick={priceHandler}
        >
          <Typography variant="button">قصد استعلام قیمت را دارم </Typography>
        </div>
      </div>
      <div className={classes.formBox}>
        <div className={classes.inputBox}>
          <label htmlFor=""> جنس و نوع کالا </label>
          <select name="" id="" className={classes.merchandiseSelect}>
            <option value="">پرویزخان</option>
            <option value="">ممدخان</option>
            <option value="">مصیب</option>
          </select>
        </div>

        <div className={classes.inputBox}>
          <label htmlFor="">مبدا بارگیری کالا </label>
          <input
            className={classes.originLoading}
            name="originLoading"
            type="text"
            placeHolder="بازارچه پرویزخان"
          />
        </div>
        <div className={classes.inputBox}>
          <label htmlFor="">گمرک مقصد، محل ترخیص کالا </label>
          <select name="" id="" className={classes.originReleasingSelect}>
            <option value="">پرویزخان</option>
            <option value="">ممدخان</option>
            <option value="">مصیب</option>
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Location;
