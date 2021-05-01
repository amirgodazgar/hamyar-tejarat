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
        <label className={classes.label} htmlFor={name}>
          {label}
        </label>
        {formik.touched[name] && formik.errors[name] ? (
          <Fade
            in={formik.touched[name] && formik.errors[name] ? true : false}
            timeout={400}
          >
            <div className={classes.error}>{formik.errors[name]}</div>
          </Fade>
        ) : null}
      </div>
      <input
        className={`${classes.textField} ${classes[customizeInput]} ${
          formik.touched[name] && formik.errors[name]
            ? classes.inputError
            : null
        } `}
        type={type}
        name={name}
        placeholder={placeHolder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        required
      />
    </React.Fragment>
  );
};

export default InputField;
