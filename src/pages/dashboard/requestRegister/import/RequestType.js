import React, { memo, useState } from "react";
import classes from "./import.module.css";
import { Typography } from "@material-ui/core";
import PriceSvg from "../../../../styles/svg/askfor-price.svg";
import PriceSvgActive from "../../../../styles/svg/askfor-price-active.svg";
import PurchaseSvg from "../../../../styles/svg/purchase.svg";
import PurchaseActiveSvg from "../../../../styles/svg/purchase-active.svg";

const RequestType = ({ setRequestType }) => {
  const [priceSelect, setPriceSelect] = useState(true);
  const [purchaseSelect, setPurchaseSelect] = useState(false);

  const priceHandler = () => {
    setPriceSelect(true);
    setPurchaseSelect(false);
    setRequestType(false);
  };
  const purchaseHandler = () => {
    setPurchaseSelect(true);
    setPriceSelect(false);
    setRequestType(true);
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
          <img src={purchaseSelect ? PriceSvgActive : PriceSvg} alt="price" />
          <Typography variant="body1" className={classes.selectBoxTitle}>
            کالا خریداری شده{" "}
          </Typography>
        </div>
        <div
          className={`${classes.price} ${
            priceSelect ? classes.selected : null
          }`}
          onClick={priceHandler}
        >
          <img
            src={priceSelect ? PurchaseActiveSvg : PurchaseSvg}
            alt="purchase"
          />
          <Typography variant="body1" className={classes.selectBoxTitle}>
            قصد استعلام قیمت را دارم{" "}
          </Typography>
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(RequestType);
