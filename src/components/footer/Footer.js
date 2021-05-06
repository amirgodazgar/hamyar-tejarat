import React from "react";
import { footerText } from "../../constant/layoutData";
import Button from "../../common/button/Button";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.main}>
        <div className={classes.preview}>
          <h2>همیار تجارت</h2>
          <p>{footerText.preview}</p>
        </div>
        <div className={classes.links}>
          <h6>{footerText.links.header}</h6>
          <ul>
            {footerText.links.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={classes.signUp}>
          <h6>{footerText.signUp.header}</h6>
          <span>{footerText.signUp.subTitle}</span>
          <div className={classes.signUpBox}>
            <input
              type="text"
              placeholder={footerText.signUp.field.placeHolder}
            />
            <Button customizeClass="footerSignUp">
              {footerText.signUp.field.button}
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.copyRight}>{footerText.copyRight}</div>
    </footer>
  );
};

export default Footer;
