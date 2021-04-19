import { Fade } from "@material-ui/core";
import React from "react";
import classes from "./inputField.module.css";

const InputField = ({ type, label, formik, placeHolder }) => {
  return (
    <React.Fragment>
      <div className={classes.labelBox}>
        <label className={classes.label} htmlFor={type}>
          {label}
        </label>
        {formik.touched[type] && formik.errors[type] ? (
          <Fade
            in={formik.touched[type] && formik.errors[type] ? true : false}
            timeout={400}
          >
            <div className={classes.error}>{formik.errors[type]}</div>
          </Fade>
        ) : null}
      </div>
      <input
        className={classes.textField}
        type={type}
        name={type}
        placeholder={placeHolder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[type]}
      />
    </React.Fragment>
  );
};

export default InputField;
