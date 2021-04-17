import React, { useState } from "react";
import classes from "./navbar.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { Menu } from "@material-ui/icons";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import Button from "../../common/button/Button";
import { menuItem } from "../../constant/layoutData";

const Navbar = (props) => {
  const [search, setSearch] = useState(true);
  const searchHandler = () => setSearch((prevState) => !prevState);

  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <Link className={classes.logo} to="/">
          همیار تجارت
        </Link>

        <div className={classes.leftSide}>
          <ul className={classes.list}>
            {menuItem.map((item) => (
              <li className={classes.item}>{item}</li>
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
          <div className={classes.panel}>
            <Button customizeClass="panel">
              <PersonIcon fontSize="large" />
              <Link className={classes.link} to="/adminPanel">
                پنل کاربری
              </Link>
            </Button>
          </div>
          <div className={classes.register}>
            <Link className={classes.registerLink} to="/register">
              ورود | ثبتنام
            </Link>
          </div>
        </div>
      </nav>
      <div className={classes.mainTitle}>
        <h1>سامانه همیار تجارت</h1>
        <h6>نخستین سامانه برونسپاری ترخیص کالا در ایران</h6>
        <Button customizeClass="header">همین حالا شروع کنید</Button>
      </div>
    </header>
  );
};

export default Navbar;
