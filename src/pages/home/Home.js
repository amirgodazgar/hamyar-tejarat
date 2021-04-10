import classes from "./home.module.css";
import React from "react";
import { homeData } from "../../constant/pagesData";
import clearanceImage from "../../styles/image/image (3).jpg";
import registrationImage from "../../styles/image/image (6).jpg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AddIcon from "@material-ui/icons/Add";
import MainCard from "../../common/card/MainCard";
import RequestCard from "../../common/card/homepage/RequestCard";
import cardImage from "../../styles/image/profile-image.png";
import Button from "../../common/button/Button";

const Home = () => {
  const cardItems = [
    {
      title: "شرکت ترخیص همراه",
      subTitle: "شرکت ترخیص همراه , همراه شما در مسیر تجارت",
      alt: "card-alt",
    },
    {
      title: "شرکت ترخیص همراه",
      subTitle: "شرکت ترخیص همراه , همراه شما در مسیر تجارت",
      alt: "card-alt",
    },
    {
      title: "شرکت ترخیص همراه",
      subTitle: "شرکت ترخیص همراه , همراه شما در مسیر تجارت",
      alt: "card-alt",
    },
    {
      title: "شرکت ترخیص همراه",
      subTitle: "شرکت ترخیص همراه , همراه شما در مسیر تجارت",
      alt: "card-alt",
    },
    {
      title: "شرکت ترخیص همراه",
      subTitle: "شرکت ترخیص همراه , همراه شما در مسیر تجارت",
      alt: "card-alt",
    },
  ];

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
          <div className={classes.preCard}>
            <ArrowForwardIosIcon className={classes.preIcon} fontSize="large" />
          </div>
          <div className={classes.slider}>
            {cardItems.map((card, index) => (
              <MainCard
                title={card.title}
                subtitle={card.subTitle}
                imgSrc={cardImage}
                alt={card.alt}
                key={index}
              />
            ))}
          </div>
          <div className={classes.nextCard} o>
            <ArrowBackIosIcon className={classes.nextIcon} fontSize="large" />
          </div>
        </div>
      </div>

      <div className={classes.introduction}>
        <div className={classes.registration}>
          <h3>{homeData.registration.title}</h3>
          <span></span>
          <p>{homeData.registration.text}</p>
          <Button customizeClass="registration">
            {homeData.registration.btn}
          </Button>
        </div>
        <div className={classes.image}>
          <img src={registrationImage} alt="clearance-image" />
        </div>
      </div>

      <div className={classes.requests}>
        <div className={classes.header}>
          <h3>{homeData.requests.title}</h3>
          <a href="#">
            {homeData.requests.link}
            <ArrowBackIosIcon style={{ fontWeight: "bolder" }} />
          </a>
        </div>
        <div className={classes.underLine}>
          <span></span>
        </div>
        <div className={classes.requestBox}>
          {homeData.requests.requestList.map((card, index) => (
            <RequestCard
              title={card.title}
              subtitle={card.text}
              imgSrc={cardImage}
              alt={card.alt}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className={classes.statistics}>
        <div className={classes.successfulOrder}>
          <div className={classes.numberBox}>
            <AddIcon fontSize="large" className={classes.addIcon} />
            <p className={classes.number}>450</p>
          </div>
          <p> سفارش موفق</p>
        </div>
        <div className={classes.partnerCompany}>
          <div className={classes.numberBox}>
            <AddIcon fontSize="large" className={classes.addIcon} />
            <p className={classes.number}>700</p>
          </div>
          <p> شرکت همکار</p>
        </div>
        <div className={classes.activeUser}>
          <div className={classes.numberBox}>
            <AddIcon fontSize="large" className={classes.addIcon} />
            <p className={classes.number}> 8000</p>
          </div>
          <p> کاربر فعال</p>
        </div>
      </div>


      
      <div className={classes.news}>

      </div>
    </div>
  );
};

export default Home;
