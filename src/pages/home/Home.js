import classes from "./home.module.css";
import React from "react";
import { homeData } from "../../constant/pagesData";
import clearanceImage from "../../styles/image/image (3).jpg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MainCard from "../../common/card/MainCard";
import cardImage from "../../styles/image/profile-image.png";

const Home = () => {

   const scrollRightHandler = () => {
      document.scrollLeft = 15
   }
   const scrollLeftHandler = () => {

   }

  return (
    <div className={classes.home}>
      <div className={classes.clearance}>
        <div className={classes.image}>
          <img src={clearanceImage} alt="clearance-image" />
        </div>
        <div className={classes.links}>
          <h3>{homeData.clearance.links.title}</h3>
          <span></span>
          <ul>
            {homeData.clearance.links.links.map((link, index) => (
              <li key={index}>
                <ArrowBackIosIcon
                  style={{ color: "#277FE5" }}
                  fontSize="small"
                />
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={classes.topCompanies}>
        <h3>{homeData.topCompanies.title}</h3>
        <span className={classes.subLine}></span>
        <div className={classes.cardsBox}>
          <div className={classes.preCard} onClick={scrollLeftHandler}>
            <ArrowForwardIosIcon className={classes.preIcon} fontSize="large" />
          </div>
          <div className={classes.slider} >
            <MainCard
              title="شرکت ترخیص همراه"
              subtitle="شرکت ترخیص همراه , همراه شما در مسیر تجارت"
              imgSrc={cardImage}
              alt="card-alt"
            />
            <MainCard
              title="شرکت ترخیص همراه"
              subtitle="شرکت ترخیص همراه , همراه شما در مسیر تجارت"
              imgSrc={cardImage}
              alt="card-alt"
            />
            <MainCard
              title="شرکت ترخیص همراه"
              subtitle="شرکت ترخیص همراه , همراه شما در مسیر تجارت"
              imgSrc={cardImage}
              alt="card-alt"
            />
            <MainCard
              title="شرکت ترخیص همراه"
              subtitle="شرکت ترخیص همراه , همراه شما در مسیر تجارت"
              imgSrc={cardImage}
              alt="card-alt"
            />
            <MainCard
              title="شرکت ترخیص همراه"
              subtitle="شرکت ترخیص همراه , همراه شما در مسیر تجارت"
              imgSrc={cardImage}
              alt="card-alt"
            />
            <MainCard
              title="شرکت ترخیص همراه"
              subtitle="شرکت ترخیص همراه , همراه شما در مسیر تجارت"
              imgSrc={cardImage}
              alt="card-alt"
            />
          </div>
          <div className={classes.nextCard} onClick={scrollRightHandler}>
            <ArrowBackIosIcon className={classes.nextIcon} fontSize="large" />
          </div>
        </div>
      </div>

      <div className={classes.introduction}>
        <div className={classes.image}>image</div>
        <div className={classes.registration}></div>
      </div>
    </div>
  );
};

export default Home;
