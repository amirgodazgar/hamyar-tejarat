import React from "react";
import classes from "./buttonStyle.module.css";

const Button = ({ children, customizeClass, click }) => {
  return (
    <button
      className={`${classes.btn} ${classes[customizeClass]}`}
      onClick={click}
    >
      {children}
    </button>
  );
};

export default Button;
