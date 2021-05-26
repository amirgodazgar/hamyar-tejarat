import React, { useState } from "react";
import classes from "./navbar.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import Button from "../../common/button/Button";
import { menuItem } from "../../constant/layoutData";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getUserInfoData } from "../../store/dashboard/dashboardSlice";

const Navbar = () => {
  const isLogin = Cookies.get("login");
  const dispatch = useDispatch();
  const [search, setSearch] = useState(true);
  const searchHandler = () => setSearch((prevState) => !prevState);

  return (
    <header className={classes.header}>
      <nav data-aos="fade-down" className={classes.navbar}>
        <Link className={classes.logo} to="/">
          <span className={classes.logoText}>همیار تجارت</span>
        </Link>

        <div className={classes.leftSide}>
          <ul className={classes.list}>
            {menuItem.map((item, index) => (
              <li className={classes.item} key={index}>
                {item}
              </li>
            ))}
          </ul>
          <div className={classes.searchBox}>
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
          </div>
          {isLogin ? (
            <div className={classes.panel}>
              <Link className={classes.link} to="/Dashboard/main">
                <Button
                  customizeClass="panel"
                  
                >
                  <PersonIcon fontSize="large" />
                  پنل کاربری
                </Button>
              </Link>
            </div>
          ) : (
            <Link className={classes.registerLink} to="/Register">
              <Button customizeClass="registerLink">ورود | ثبت نام</Button>
            </Link>
          )}
        </div>
      </nav>
      <div data-aos="fade-up" className={classes.mainTitle}>
        <h1>سامانه همیار تجارت</h1>
        <h6>نخستین سامانه برونسپاری ترخیص کالا در ایران</h6>
        <Button customizeClass="header">همین حالا شروع کنید</Button>
      </div>
    </header>
  );
};

export default Navbar;
