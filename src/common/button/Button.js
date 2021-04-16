import React from "react";
import classes from "./buttonStyle.module.css";

const Button = ({ children, customizeClass, click , type}) => {
  return (
    <button
      className={`${classes.btn} ${classes[customizeClass]}`}
      onClick={click}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
