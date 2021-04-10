import React from "react";
import classes from "./card.module.css";
import Button from "../button/Button";
import { Rating } from "@material-ui/lab";
import { cardData } from "../../constant/cardData";
import { Avatar } from "material-ui";

const Card = ({ imgSrc, alt, title, subtitle }) => {
  const [value, setValue] = React.useState(0);
  const ratingHandler = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.card}>
      <div className={classes.head}>
        <Avatar src={imgSrc} alt={alt} />
      </div>

      <div className={classes.body}>
        <h3>{title}</h3>
        <p>{subtitle}</p>

        <Rating
          className={classes.rating}
          value={value}
          onChange={(e, newValue) => ratingHandler(newValue)}
        />

        <Button customizeClass="card">{cardData.btn}</Button>
      </div>
    </div>
  );
};

export default Card;
