import React, { useState } from "react";
import classes from "./import.module.css";
import { Typography } from "@material-ui/core";

const Location = () => {
  const [priceSelect, setPriceSelect] = useState(false);
  const [purchaseSelect, setPurchaseSelect] = useState(false);

  const priceHandler = () => {
    setPriceSelect(true);
    setPurchaseSelect(false);
  };
  const purchaseHandler = () => {
    setPurchaseSelect(true);
    setPriceSelect(false);
  };

  return (
    <React.Fragment>
      <Typography variant="body1" className={classes.fistStpSubTitle}>
        آیا کالای خود را خریداری نموده اید و یا قصد استعلام قیمت را دارید؟
      </Typography>
      <div className={classes.selectBox_stepTwo}>
        <div
          className={`${classes.purchase} ${
            purchaseSelect ? classes.selected : null
          }`}
          onClick={purchaseHandler}
        >
          <Typography variant="button">کالا خریداری شده </Typography>
        </div>
        <div
          className={`${classes.price} ${
            priceSelect ? classes.selected : null
          }`}
          onClick={priceHandler}
        >
          <Typography variant="button">قصد استعلام قیمت را دارم </Typography>
        </div>
      </div>
      <div className={classes.formBox}>
         
      </div>
    </React.Fragment>
  );
};

export default Location;
