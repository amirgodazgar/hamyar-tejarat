import React from "react";
import classes from "./buttonStyle.module.css";

const Button = ({ children, customizeClass }) => {
  return (
    <button className={`${classes.btn} ${classes[customizeClass]}`}>
      {children}
    </button>
  );
};

export default Button;
