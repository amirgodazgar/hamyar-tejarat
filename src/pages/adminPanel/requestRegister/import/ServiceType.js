import React from "react";
import classes from "./import.module.css";
import { Typography } from "@material-ui/core";
import ExportSvg from "../../../../styles/svg/export.svg";
import ActiveImportSvg from "../../../../styles/svg/Import-active.svg";

const ServiceType = () => {
  return (
    <React.Fragment>
      <Typography variant="inherit" className={classes.fistStpTitle}>
        خواهشمند است جهت تسریع، تدقیق و بهبود روش قیمت گذاری، مراحل را با دقت
        تکمیل نمایید
      </Typography>
      <Typography variant="body1" className={classes.fistStpSubTitle}>
        لطفا نوع خدمت مورد نیاز خود را مشخص نمایید
      </Typography>
      <div className={classes.selectBox}>
        <div className={classes.exportSelect}>
          <img src={ExportSvg} alt="صادرات" />
          <Typography variant="h6">صادرات</Typography>
        </div>
        <div className={classes.importSelect}>
          <img src={ActiveImportSvg} alt="واردات" />
          <Typography variant="h6">واردات</Typography>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ServiceType;
