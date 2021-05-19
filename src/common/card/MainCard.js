import React from "react";
import classes from "./card.module.css";
import Button from "../button/Button";
import { Rating } from "@material-ui/lab";
import { cardData } from "../../constant/cardData";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
} from "@material-ui/core";
import { StarRateRounded } from "@material-ui/icons";

const MainCard = ({ imgSrc, alt, title, subtitle, disable, removeIfLast }) => {
  const [value, setValue] = React.useState(3);
  const ratingHandler = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Card
        style={removeIfLast ? { display: "none" } : null}
        className={
          disable ? `${classes.card} ${classes.disable}` : classes.card
        }
      >
        <CardHeader
          className={classes.cardHeader}
          avatar={<Avatar className={classes.avatar} src={imgSrc} alt={alt} />}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} variant="h6" align="center">
            {title}
          </Typography>
          <Typography
            className={classes.subTitle}
            variant="button"
            align="center"
          >
            {subtitle}
          </Typography>
          <Rating
            className={classes.rating}
            // value={value}
            value={5}
            onChange={(e, newValue) => ratingHandler(e, newValue)}
            size="large"
            name="rating"
            icon={<StarRateRounded fontSize="large" />}
          />
          <Button customizeClass="card">{cardData.btn}</Button>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default MainCard;
