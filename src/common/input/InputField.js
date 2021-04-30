import { Fade } from "@material-ui/core";
import React from "react";
import classes from "./inputField.module.css";

const InputField = ({
  type,
  label,
  formik,
  placeHolder,
  name,
  customizeLabel,
  customizeInput,
}) => {
  return (
    <React.Fragment>
      <div className={`${classes.labelBox} ${classes[customizeLabel]}`}>
        <label className={classes.label} htmlFor={name ? name : type}>
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
        className={`${classes.textField} ${classes[customizeInput]} `}
        type={type}
        name={name ? name : type}
        placeholder={placeHolder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[type]}
        required
      />
    </React.Fragment>
  );
};

export default InputField;
