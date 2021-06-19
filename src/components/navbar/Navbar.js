import React, { useState } from "react";
import classes from "./navbar.module.css";
// import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import Button from "../../common/button/Button";
import { menuItem } from "../../constant/layoutData";
import Cookies from "js-cookie";
import { ExitToApp, ExpandMore, Menu } from "@material-ui/icons";
import logoImage from "../../styles/image/logo-white.png";
import { clearCookies } from "../../helper/cookies";
import {
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button as MuiButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  drawerPaper: {
    backgroundColor: "#f4f4f4",
  },
});

const Navbar = () => {
  const styles = useStyles();
  const isLogin = Cookies.get("login");
  const history = useHistory();
  // const [search, setSearch] = useState(true);
  const [open, setOpen] = useState(false);
  const drawerHandler = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  // const searchHandler = () => setSearch((prevState) => !prevState);
  const exitHandler = () => {
    clearCookies();
    window.location.reload();
  };

  const servicesHandler = () => {
    setOpen(false);
    history.push("/");
  };
  const newsHandler = () => {
    setOpen(false);
    history.push("/news");
  };
  const contactUsHandler = () => {
    setOpen(false);
    history.push("/contactUs");
  };

  return (
    <header className={classes.header}>
      <Hidden smDown>
        <nav data-aos="fade-down" className={classes.navbar}>
          <Link className={classes.logo} to="/">
            <span className={classes.logoText}>همیار تجارت</span>
          </Link>

          <div className={classes.leftSide}>
            <ul className={classes.list}>
              <li className={classes.item}>
                <a href="#introduction" onClick={() => history.push("/")}>
                  خدمات
                </a>
              </li>
              <li className={classes.item}>
                <a href="#newsMain" onClick={() => history.push("/news")}>
                  اخبار
                </a>
              </li>
              <li className={classes.item}>
                <a
                  href="#contact-us"
                  onClick={() => history.push("/contactUs")}
                >
                  تماس با ما
                </a>
              </li>
              <li className={classes.item}>
                <a href="#footer" onClick={() => history.push("/")}>
                  درباره ما
                </a>
              </li>
            </ul>
            {/* <div className={classes.searchBox} style={{ display: "none" }}>
            <input
              type="text"
              className={
                search
                  ? classes.searchInput
                  : `${classes.searchInput} ${classes.active}`
              }
            />
            <button onClick={searchHandler}>
              <SearchIcon
                style={{ fontSize: 29 }}
                className={
                  search
                    ? classes.searchIcon
                    : `${classes.searchIcon} ${classes.active}`
                }
              />
            </button>
          </div> */}
            {isLogin ? (
              <div className={classes.panel}>
                {/* <Link className={classes.link} to="/Dashboard/main"> */}
                <Button
                  customizeClass="panel"
                  click={() => history.replace("/Dashboard/main")}
                >
                  <PersonIcon />
                  پنل کاربری
                </Button>
                {/* </Link> */}

                <Button customizeClass="logout" click={exitHandler}>
                  <ExitToApp />
                  خروج
                </Button>
              </div>
            ) : (
              <Link className={classes.registerLink} to="/Register">
                <Button customizeClass="registerLink">ورود | ثبت نام</Button>
              </Link>
            )}
          </div>
        </nav>
      </Hidden>
      <Hidden mdUp>
        <div className={classes.responsiveMenuContainer}>
          <IconButton onClick={drawerHandler}>
            <Menu fontSize="large" style={{ color: "#fff" }} />
          </IconButton>
          <Drawer
            anchor="left"
            open={open}
            onClose={closeDrawer}
            classes={{ paper: styles.drawerPaper }}
          >
            <div style={{ width: "20rem", background: "#f4f4f4" }}>
              <List className={classes.responsiveNavbarHeader}>
                <img className={classes.logoImg} src={logoImage} alt="logo" />
                <Typography
                  variant="h4"
                  className={classes.logoTextDrawer}
                  color="primary"
                >
                  همیار تجارت
                </Typography>
              </List>
              <Divider />
              <List>
                <ListItem>
                  <a href="#introduction" onClick={servicesHandler}>
                    <Accordion
                      expanded={false}
                      style={{ width: "100%", background: "#f4f4f4" }}
                      elevation={0}
                    >
                      <AccordionSummary
                        style={{ minHeight: "2rem" }}
                        // expandIcon={<ExpandMore />}
                      >
                        <Typography className={classes.responsiveItem}>
                          خدمات
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="button">خدمات تاجرین</Typography>
                        <Typography variant="button">
                          خدمات ترخیص کاران
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </a>
                </ListItem>
                <ListItem>
                  <a href="#newsMain" onClick={newsHandler}>
                    <Accordion
                      expanded={false}
                      style={{ width: "100%", background: "#f4f4f4" }}
                      elevation={0}
                    >
                      <AccordionSummary
                        style={{ minHeight: "2rem" }}
                        // expandIcon={<ExpandMore />}
                      >
                        <Typography className={classes.responsiveItem}>
                          اخبار
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="button">
                          جدیدترین خبر ها
                        </Typography>
                        <Typography variant="button">
                          پربازدیدترین خبر ها
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </a>
                </ListItem>
                <ListItem>
                  <a href="#contact-us" onClick={contactUsHandler}>
                    <Accordion
                      expanded={false}
                      style={{ width: "100%", background: "#f4f4f4" }}
                      elevation={0}
                    >
                      <AccordionSummary
                        style={{ minHeight: "2rem" }}
                        // expandIcon={<ExpandMore />}
                      >
                        <Typography className={classes.responsiveItem}>
                          تماس با ما
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="button">
                          تماس با پشتیبانی
                        </Typography>
                        <Typography variant="button">
                          رسیدگی به شکایات
                        </Typography>
                        <Typography variant="button">
                          تلفن گویا همیار تجارت
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </a>
                </ListItem>
                <ListItem>
                  <a href="#footer" onClick={contactUsHandler}>
                    <Accordion
                      expanded={false}
                      style={{ width: "100%", background: "#f4f4f4" }}
                      elevation={0}
                    >
                      <AccordionSummary>
                        <Typography className={classes.responsiveItem}>
                          درباره ما
                        </Typography>
                      </AccordionSummary>
                    </Accordion>
                  </a>
                </ListItem>
                <Divider />
                {isLogin ? (
                  <>
                    <ListItem>
                      <MuiButton
                        className={classes.responsiveNavbarBtn}
                        variant="contained"
                        color="secondary"
                        onClick={() => history.replace("/Dashboard/main")}
                      >
                        <PersonIcon style={{ margin: "0  0 0 .3rem" }} />
                        پنل کاربری
                      </MuiButton>
                    </ListItem>
                    <ListItem>
                      <MuiButton
                        className={classes.responsiveNavbarBtn}
                        variant="contained"
                        color="secondary"
                        onClick={exitHandler}
                      >
                        <ExitToApp style={{ margin: "0  0 0 .3rem" }} />
                        خروج
                      </MuiButton>
                    </ListItem>
                  </>
                ) : (
                  <Link className={classes.registerLink} to="/Register">
                    <ListItem>
                      <MuiButton
                        className={classes.responsiveNavbarBtn}
                        variant="contained"
                        color="secondary"
                      >
                        ورود | ثبت نام
                      </MuiButton>
                    </ListItem>
                  </Link>
                )}
                <ListItem>
                  <MuiButton
                    className={classes.responsiveNavbarBtn}
                    variant="contained"
                    onClick={closeDrawer}
                  >
                    بازگشت
                  </MuiButton>
                </ListItem>
              </List>
            </div>
          </Drawer>
          <div className={classes.responsiveLogoText}>همیار تجارت</div>
        </div>
      </Hidden>

      <div data-aos="fade-up" className={classes.mainTitle}>
        <h1>سامانه همیار تجارت</h1>
        <h6>نخستین سامانه برونسپاری ترخیص کالا در ایران</h6>
        <Button
          click={() => history.replace("/Dashboard/main")}
          customizeClass="header"
        >
          همین حالا شروع کنید
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
