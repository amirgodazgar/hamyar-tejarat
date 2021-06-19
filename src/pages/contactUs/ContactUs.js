import React, { useEffect } from "react";
import classes from "./contactUs.module.css";
import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import { ArrowBackIosRounded } from "@material-ui/icons";
import MailIcon from "../../styles/svg/mail.svg";
import PhoneIcon from "../../styles/svg/phone.svg";
import BuildingIcon from "../../styles/svg/building.svg";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={classes.container}>
      <div>
        <Breadcrumbs
          className={classes.breadcrumbs}
          separator={
            <ArrowBackIosRounded className={classes.breadCrumbsIcon} />
          }
        >
          <Typography className={classes.breadcrumbsText} variant="h6">
            همیار تجارت
          </Typography>
          <Typography className={classes.breadcrumbsText} variant="h6">
            تماس با ما
          </Typography>
        </Breadcrumbs>
      </div>
      <div className={classes.main} id="contact-us">
        <h6 className={classes.mainTitle}>با ما در ارتباط باشید</h6>
        <p className={classes.subTitle}>
          جهت ارتباط با سامانه همیار تجارت و مطرح کردن سوالات خود می توانید از
          طریق راه های ارتباطی اعلام شده، در تماس باشید
        </p>
        <div className={classes.contactInfoContainer}>
          <div className={classes.contactInfoBox}>
            <div className={classes.iconBox}>
              <img src={MailIcon} alt="mail-icon" />
            </div>
            <div className={classes.contactInformation}>
              <span>info@HamyarTejarat.com</span>
              <span>HamyarTejarat@gmail.com</span>
            </div>
          </div>
          <div className={classes.contactInfoBox}>
            <div className={classes.iconBox}>
              <img src={PhoneIcon} alt="phone-icon" />
            </div>
            <div className={classes.contactInformation}>
              <span> 02182991236</span>
              <span>02182991236</span>
            </div>
          </div>
          <div className={classes.contactInfoBox}>
            <div className={classes.iconBox}>
              <img src={BuildingIcon} alt="building-icon" />
            </div>
            <div className={classes.contactInformation}>
              <address className={classes.address}>
                تهران، خیابان ولی عصر (عج)، بالاتر از میدان ولیعصر(عج)، نبش کوچه
                ناصر
              </address>
            </div>
          </div>
        </div>
        <div className={classes.messageTitle}>ارسال پیام</div>
        <div className={classes.inputContainer}>
          <div className={classes.inputBox}>
            <input type="text" placeholder="نام" />
          </div>
          <div className={classes.inputBox}>
            <input type="email" placeholder="example@gmail.com" />
          </div>
        </div>
        <div className={classes.textareaBox}>
          <textarea
            cols="30"
            rows="5"
            placeholder="متن پیام خود را بنویسید"
          ></textarea>
        </div>
        <div className={classes.btnBox}>
          <Button variant="contained" color="secondary">
            ارسال پیام
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
