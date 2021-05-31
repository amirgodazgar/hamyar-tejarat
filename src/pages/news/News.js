import React, { useEffect } from "react";
import classes from "./news.module.css";
import { Breadcrumbs, Chip, Typography } from "@material-ui/core";
import {
  ArrowBackIosRounded,
  EventNoteRounded,
  ListRounded,
  VisibilityRounded,
  Telegram,
  Twitter,
  Facebook,
} from "@material-ui/icons";
import newsImg from "../../styles/image/image (7).jpg";
import news_1 from "../../styles/image/image (8).jpg";
import news_2 from "../../styles/image/image (9).jpg";
import news_3 from "../../styles/image/image (5).jpg";
import news_4 from "../../styles/image/image (1).jpg";
const sidebarNews = [
  {
    image: news_1,
    text: "نرخ صفر مالیاتی منوط و ارز صادراتی",
  },
  {
    image: news_2,
    text: "اطلاعیه جدید گمرک درباره فرم اظهارنامه مسافری",
  },
  {
    image: news_3,
    text: "واردات قطعات دارای مشابه تولید داخل ممنوع شد",
  },
  {
    image: news_4,
    text: "اطلاعیه جدید گمرک درباره فرم اظهارنامه مسافری",
  },
];

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={classes.container}>
      <div>
        <Breadcrumbs
          className={classes.breadcrumbs}
          separator={<ArrowBackIosRounded />}
        >
          <Typography className={classes.breadcrumbsText} variant="h6">
            همیار تجارت
          </Typography>
          <Typography className={classes.breadcrumbsText} variant="h6">
            اخبار
          </Typography>
          <Typography className={classes.breadcrumbsText} variant="h6">
            وضعیت متغیر های اقتصادی، نوید بخش پایداری بازار سرمایه در سال جدید
          </Typography>
        </Breadcrumbs>
      </div>
      <div className={classes.main}>
        <div className={classes.newsField}>
          <Typography
            color="primary"
            variant="h6"
            className={classes.newsTitle}
          >
            وضعیت متغیر های اقتصادی، نوید بخش پایداری بازار سرمایه در سال جدید
          </Typography>
          <div className={classes.newsInfo}>
            <div className={classes.newsInfoIcon}>
              <span>
                <EventNoteRounded color="secondary" />
              </span>
              <p>1400/01/14 5:30 ب.ظ</p>
            </div>
            <div className={classes.newsInfoIcon}>
              <span>
                {" "}
                <ListRounded color="secondary" />
              </span>
              <p>اقتصاد</p>
            </div>
            <div className={classes.newsInfoIcon}>
              <span>
                {" "}
                <VisibilityRounded color="secondary" />
              </span>
              <p>2548 بازدید</p>
            </div>
          </div>
          <div className={classes.newsDescription}>
            وزیر امور اقتصادی و دارایی با مطلوب توصیف نمودن وضعیت متغیر های
            اقتصادی مؤثر بر تحولات بازار سرمایه، این امر را نوید بخش پایداری
            بازار بورس در سال جدید ارزیابی کرد
          </div>
          <div className={classes.imageBox}>
            <img src={newsImg} alt="news-pic" />
          </div>
          <Typography className={classes.newsText} align="left" variant="body1">
            به گزارش شبکه اخبار اقتصادی و دارایی ایران (شادا)، دکتر فرهاد دژپسند
            طی سخنانی در حاشیه جلسه هیات دولت، اظهار داشت: خوشبختانه در آغاز
            سال، شرایط حاکم بر تمامی متغیر های اقتصادی موثر بر تحولات بازار
            سرمایه، به شکلی است که نوید پایداری در این بازار را می دهد وی افزود:
            خیلی از تحلیلگران بر این عقیده اند که با توجه به وضعیت متغیر های
            بنیادی، شرایط بورس، در حال طی کردن روندی است که به شرایط پایدار منجر
            می شود وزیر اقتصاد اعلام کرد: در سال جدید، مواردی در دستور کار شورای
            عالی بورس جهت بررسی و تصویب قرار گرفته که در راستای تقویت مؤلفه های
            پایداری بازار سرمایه است دژپسند با بیان اینکه شرایط شرکت های بورسی
            در ابتدای سال از نظر سودآوری خیلی خوب است، افزود: خوشبختانه شرایط
            برای شرکت های صادراتی نیز برای بالا بردن "نرخ بهره برداری از ظرفیت
            اسمی" در حال فراهم شدن است که این روی سودآوری بنگاه ها به شدت اثر
            گذار است وزیر اقتصاد با تاکید بر اینکه اقتضای فعالیت در بازار
            سرمایه، محاسبه گری و دقت در "خرید" و "فروش" است و در این مسیر باید
            از هر گونه برخورد و رفتار هیجانی به ویژه در امر فروش خودداری کرد،
            گفت: من احساس می کنم بعضی افراد در فروش، گرفتار رفتار هیجانی می شوند
            که از نظر من به عنوان یک کارشناس اقتصادی، اصلا به نفع شان نیست.
          </Typography>
          <Typography className={classes.newsText} align="left" variant="body1">
            وی تصریح کرد: همان گونه که شما هنگام فروش یک قطعه طلا، تمام ملاحظات
            را در نظر می گیرید، در مورد فروش سهام نیز باید دقت لازم را بکار
            ببندید، به ویژه با توجه به اینکه، سهام از ویژگی سود آوری نیز
            برخوردار است وزیر اقتصاد ابراز امیدواری کرد، با فراهم شدن زمینه
            اجرای برنامه های اعلامی ریاست جدید سازمان بورس و اوراق بهادار در سال
            جدید، بازار به شرایط پایدار خود برسد بنا بر این گزارش، وزیر اقتصاد
            در پاسخ به سؤالی در خصوص شرایط گمرکات کشور از نظر ترخیص کالا نیز با
            بیان اینکه زمان ترخیص کالا به شدت کاهش یافته است، گفت: با تجهیز گمرک
            جمهوری اسلامی به ابزار های مدرن و الکترونیکی شدن ارزیابی ها، نیاز به
            نیروی انسانی برای انجام عملیات به حداقل ممکن رسیده است دژپسند با
            اشاره به اینکه نظارت پیشینی در گمرکات کشور به نظارت پسینی بدل شده
            است، گفت: در حال حاضر تمام شرایط به نحوی فراهم شده که در صورت انجام
            "ثبت سفارش" و "تأمین ارز" وارد کنندگان، (و در صورت لزوم و برای کالای
            اساسی و مواد غذایی، تأیید استاندارد و وزارت بهداشت) در کوتاه ترین
            زمان ممکن، امکان ترخیص کالا فراهم شده است که در این خصوص رکورد ۲۴
            ساعت را هم به ثبت رسانده ایم وزیر اقتصاد با اشاره به تعیین شعار
            "تولید، پشتیبانی‌ها، مانع‌زدایی" برای امسال از سوی مقام معظم رهبری،
            گفت: گمرک جمهوری اسلامی با لحاظ سه مؤلفه "تسهیل واردات مواد اولیه و
            نیازمندی های خط تولید"، "تسهیل صادرات" و "ممانعت از قاچاق" یکی از
            مهم ترین مجاری حمایت از تولید در کشور است.
          </Typography>
          <div className={classes.socialNetwork}>
            <p>اشتراک گذاری :</p>
            <div>
              <Telegram fontSize="large" />
              <Twitter fontSize="large" />
              <Facebook fontSize="large" />
            </div>
          </div>
          <div className={classes.tags}>
            <p> برچسب ها :</p>
            <div className={classes.chips}>
              <Chip clickable label="متغیرهای اقتصادی" />
              <Chip clickable label="بازار سرمایه" />
              <Chip clickable label="سال 1400" />
              <Chip clickable label="متغیرهای اقتصادی" />
              <Chip clickable label="بازار سرمایه" />
              <Chip clickable label="سال 1400" />
            </div>
          </div>
        </div>
        <div className={classes.sideBar}>
          <div className={classes.recentNews}>
            <Typography variant="h6" color="primary">
              جدیدترین خبرها
            </Typography>
            {sidebarNews.map((item) => (
              <div className={classes.sidebarNewsBox}>
                <div>
                  <img src={item.image} alt="recent-img1" />
                </div>
                <Typography variant="button" align="left" color="primary">
                  {item.text}
                </Typography>
              </div>
            ))}
          </div>
          <div className={classes.popularNews}>
            <Typography variant="h6" color="primary">
              پر بازدیدترین خبرها
            </Typography>
            {sidebarNews.map((item) => (
              <div className={classes.sidebarNewsBox}>
                <div>
                  <img src={item.image} alt="recent-img1" />
                </div>
                <Typography variant="button" align="left" color="primary">
                  {item.text}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
