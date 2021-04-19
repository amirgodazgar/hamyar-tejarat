import React from "react";
import classes from "./buttonStyle.module.css";

const Button = ({ children, customizeClass, click , type}) => {
  console.log(`${classes.btn} ${classes[customizeClass]}`)
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
