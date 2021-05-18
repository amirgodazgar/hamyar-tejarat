import classes from "./home.module.css";
import React, { useState } from "react";
import { homeData } from "../../constant/pagesData";
import clearanceImage from "../../styles/image/image (3).jpg";
import registrationImage from "../../styles/image/image (6).jpg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MainCard from "../../common/card/MainCard";
import NewsCard from "../../common/card/homepage/NewsCard";
import RequestCard from "../../common/card/homepage/RequestCard";
import cardImage from "../../styles/image/profile-image.png";
import Button from "../../common/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faPlus,
} from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import ItemsCarousel from "react-items-carousel";

const Home = () => {
  const cardItems = [
    {
      title: "0 شرکت ترخیص همراه",
      subTitle: "شرکت ترخیص همراه , همراه شما در مسیر تجارت",
      alt: "1",
      img: cardImage,
    },
    {
      title: "1 شرکت ترخیص همراه",
      subTitle: "شرکت ترخیص همراه , همراه شما در مسیر تجارت",
      alt: "2",
      img: cardImage,
    },
    {
      title: "2 شرکت ترخیص همراه",
      subTitle: "شرکت ترخیص همراه , همراه شما در مسیر تجارت",
      alt: "3",
      img: cardImage,
    },
    {
      title: "3 شرکت ترخیص همراه",
      subTitle: "شرکت ترخیص همراه , همراه شما در مسیر تجارت",
      alt: "4",
      img: cardImage,
    },
    {
      title: "4 شرکت ترخیص همراه",
      subTitle: "شرکت ترخیص همراه , همراه شما در مسیر تجارت",
      alt: "5",
      img: cardImage,
    },
    {
      title: "5 شرکت ترخیص همراه",
      subTitle: "شرکت ترخیص همراه , همراه شما در مسیر تجارت",
      alt: "6",
      img: cardImage,
    },
  ];

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const previous = (
    <button className={classes.preCard}>
      <FontAwesomeIcon icon={faChevronRight} className={classes.preIcon} />
    </button>
  );
  const next = (
    <button className={classes.nextCard}>
      <FontAwesomeIcon icon={faChevronLeft} className={classes.nextIcon} />
    </button>
  );

  return (
    <div className={classes.home}>
      <div className={classes.clearance}>
        <div className={classes.image}>
          <img src={clearanceImage} alt="clearance-img" />
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
          <div className={classes.sliderBox}>
            <ItemsCarousel
              noOfChildren={10}
              infiniteLoop={false}
              activePosition={"center"}
              chevronWidth={70}
              alwaysShowChevrons={true}
              numberOfCards={4}
              slidesToScroll={1}
              showSlither={false}
              firstAndLastGutter={false}
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              gutter={15}
              leftChevron={next}
              rightChevron={previous}
              outsideChevron
            >
              {cardItems.reverse().map((item, index) => (
                <MainCard
                  key={index}
                  title={item.title}
                  subtitle={item.subTitle}
                  imgSrc={item.img}
                  alt={item.alt}
                />
              ))}
            </ItemsCarousel>
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
          <img src={registrationImage} alt="clearance-img" />
        </div>
      </div>

      <div className={classes.requests}>
        <div className={classes.header}>
          <h3>{homeData.requests.title}</h3>
          <Link to="/">
            {homeData.requests.link}
            <ArrowBackIosIcon style={{ fontWeight: "bolder" }} />
          </Link>
        </div>
        <div className={classes.underLine}>
          <a></a>
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
        {homeData.statistics.map((item, index) => (
          <div className={classes.statisticsInfo} key={index}>
            <div className={classes.numberBox}>
              <FontAwesomeIcon icon={faPlus} className={classes.addIcon} />
              <p className={classes.number}>{item.number}</p>
            </div>
            <p> {item.title}</p>
          </div>
        ))}
      </div>

      <div className={classes.news}>
        <div className={classes.header}>
          <h3>{homeData.news.title}</h3>
          <Link to="/">
            {homeData.news.link}
            <ArrowBackIosIcon style={{ fontWeight: "bolder" }} />
          </Link>
        </div>
        <div className={classes.underLine}>
          <span></span>
        </div>
        <div className={classes.newsBox}>
          <div className={classes.mainNews}>
            {homeData.news.mainCard.map((card, index) => (
              <NewsCard
                img={clearanceImage}
                type={card.type}
                date={card.date}
                title={card.title}
                tagTitle={card.tagTitle}
                text={card.text}
                dir={card.dir}
                key={index}
              />
            ))}
          </div>

          <div className={classes.otherNews}>
            {homeData.news.cards.map((card, index) => (
              <NewsCard
                img={clearanceImage}
                type={card.type}
                date={card.date}
                title={card.title}
                dir={card.dir}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
