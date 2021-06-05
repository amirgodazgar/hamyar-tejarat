import React from "react";
import classes from "./request.module.css";
import Button from "../../button/Button";
import { cardData } from "../../../constant/cardData";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
} from "@material-ui/core";

const RequestCard = ({ imgSrc, alt, title, subtitle, animation, delay }) => {
  return (
    <React.Fragment>
      <Card className={classes.card}  data-aos={animation}>
        <div className={classes.header}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar className={classes.avatar} src={imgSrc} alt={alt} />
            }
          />
          <Typography className={classes.title} variant="h6" align="left">
            {title}
          </Typography>
        </div>

        <CardContent className={classes.cardContentSubTitle}>
          <Typography
            className={classes.subTitle}
            variant="button"
            align="center"
          >
            {subtitle}
          </Typography>
        </CardContent>
        <CardContent className={classes.cardContent}>
          <Button customizeClass="requestCard">{cardData.request.btn}</Button>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default RequestCard;
