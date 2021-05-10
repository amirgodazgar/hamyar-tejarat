import React from "react";
import classes from "./news.module.css";
import { Card, CardMedia, CardContent } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faListUl,
  faChevronLeft,
} from "@fortawesome/fontawesome-free-solid";
import { cardData } from "../../../constant/cardData";

const NewsCard = ({ img, type, date, title, tagTitle, text, dir }) => {
  return (
    <React.Fragment>
      <Card className={`${classes.card} ${classes[dir]}`}>
        <CardMedia
          image={img}
          className={
            dir === "horizontal"
              ? classes.mainCardImage
              : classes.otherCardImage
          }
        />
        <CardContent
          className={
            dir === "horizontal" ? classes.content : classes.verticalContent
          }
        >
          <CardContent className={classes.header}>
            <div className={classes.firstRow}>
              <span>
                <FontAwesomeIcon
                  icon={faListUl}
                  style={{ margin: "0 0 0 0.5rem" }}
                />
                {type}
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  style={{ margin: "0 0 0 0.5rem" }}
                />
                {date}
              </span>
            </div>
            {dir === "horizontal" ? (
              <div className={classes.secondRow}>{tagTitle}</div>
            ) : null}
          </CardContent>
          {dir === "horizontal" ? (
            <CardContent className={classes.title}>{title}</CardContent>
          ) : (
            <CardContent className={classes.otherCardTitle}>
              {title}
            </CardContent>
          )}

          {dir === "horizontal" ? (
            <CardContent className={classes.text}>{text}</CardContent>
          ) : null}

          <CardContent className={classes.link}>
            <span>
              <span className={classes.linkText}>{cardData.news.link}</span>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={classes.linkIcon}
              />
            </span>
          </CardContent>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default NewsCard;
