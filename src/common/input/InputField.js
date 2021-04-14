import React from "react";
import classes from "./inputField.module.css";
const InputField = ({ type, label, formik, placeHolder }) => {
  return (
    <React.Fragment>
      <label className={classes.label} htmlFor={type}>
        {label}
      </label>
      <input
        className={classes.textField}
        type={type}
        name={type}
        placeholder={placeHolder}
        onChange={formik.handleChange}
        value={formik.values[type]}
      />
    </React.Fragment>
  );
};

export default InputField;
