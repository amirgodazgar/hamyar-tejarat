import classes from "./home.module.css";
import React, { useEffect, useState } from "react";
import { homeData } from "../../constant/pagesData";
import clearanceImage from "../../styles/image/image (3).jpg";
import registrationImage from "../../styles/image/image (6).jpg";
import newsImg from "../../styles/image/image (7).jpg";
import otherNewsImg1 from "../../styles/image/image (1).jpg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MainCard from "../../common/card/MainCard";
import NewsCard from "../../common/card/homepage/NewsCard";
import RequestCard from "../../common/card/homepage/RequestCard";
import cardImage from "../../styles/image/profile-image.svg";
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
  const [cardNumber, setCardNumber] = useState(4);
  const changeCardNumber = () => {

    if (window.innerWidth > 768) {
      setCardNumber(4);
    }
    if (window.innerWidth <= 960) {
      setCardNumber(3);
    }
    if (window.innerWidth <= 768) {
      setCardNumber(2);
    }
    if (window.innerWidth <= 426) {
      setCardNumber(1);
    }
  };

  useEffect(() => {
    changeCardNumber();
    window.addEventListener("resize", changeCardNumber);
  }, [window.innerWidth]);


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
        <div data-aos="fade-out" data-aos-delay="30" className={classes.image}>
          <img src={clearanceImage} alt="clearance-img" />
        </div>
        <div className={classes.links} data-aos="fade-out" data-aos-delay="20">
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
        <h3 data-aos="flip-down">{homeData.topCompanies.title}</h3>
        <span
          data-aos="flip-down"
          data-aos-delay="10"
          className={classes.subLine}
        ></span>
        <div
          data-aos="flip-up"
          data-aos-delay="20"
          className={classes.cardsBox}
        >
          <div className={classes.sliderBox} style={{ direction: "ltr" }}>
            <ItemsCarousel
              noOfChildren={10}
              infiniteLoop={false}
              activePosition={"left"}
              chevronWidth={70}
              alwaysShowChevrons={true}
              numberOfCards={cardNumber}
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
              {cardItems.map((item, index) => (
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

      <div className={classes.introduction} id="introduction">
        <div className={classes.registration}>
          <h3 data-aos="fade-left" data-aos-delay="10">
            {homeData.registration.title}
          </h3>
          <span data-aos="fade-left" data-aos-delay="20"></span>
          <p data-aos="fade-left" data-aos-delay="25">
            {homeData.registration.text}
          </p>
          <div data-aos="fade-left" data-aos-delay="30">
            <Button customizeClass="registration">
              {homeData.registration.btn}
            </Button>
          </div>
        </div>
        <div data-aos="fade-out" data-aos-delay="20" className={classes.image}>
          <img src={registrationImage} alt="clearance-img" />
        </div>
      </div>

      <div className={classes.requests}>
        <div className={classes.header}>
          <h3 data-aos="fade-in">{homeData.requests.title}</h3>
          <Link to="/" data-aos="fade-in">
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
              animation="zoom-in"
            />
          ))}
        </div>
      </div>

      <div className={classes.statistics}>
        {homeData.statistics.map((item, index) => (
          <div className={classes.statisticsInfo} key={index}>
            <div className={classes.numberBox} data-aos="flip-up">
              <FontAwesomeIcon icon={faPlus} className={classes.addIcon} />
              <p className={classes.number}>{item.number}</p>
            </div>
            <p data-aos="flip-up"> {item.title}</p>
          </div>
        ))}
      </div>

      <div className={classes.news}>
        <div className={classes.header}>
          <h3 data-aos="fade-out">{homeData.news.title}</h3>
          <Link to="/news" data-aos="fade-out">
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
                img={newsImg}
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
                img={otherNewsImg1}
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
