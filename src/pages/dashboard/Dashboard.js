import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Avatar,
  Typography,
  Badge,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Collapse,
} from "@material-ui/core";
import React, { useState } from "react";
import classes from "./Dashboard.module.css";
import logoImage from "../../styles/image/logo.png";
import { adminPanelData } from "../../constant/adminPanel";
import {
  Menu,
  Notifications,
  Email,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import DashboardMain from "./dashboard/DashboardMain";

import Tickets from "./tickets/Tickets";
import RequestRegister from "./requestRegister/RequestRegister";
import UserInfo from "./userInfo/UserInfo";
import BankAccount from "./bankAccount/BankAccount";
import TariffCodeList from "./tariffCodesList/TariffCodeList";
import cardImage from "../../styles/svg/profile-image.svg";
import ClearanceList from "./suggestionsList/ClearanceList";
import FindPrice from "./suggestionsList/FindPrice";
import { getBusinessmanProfile } from "../../services/userInfo/userInfoServices";

const Dashboard = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [dropDownSelect, setDropDownSelect] = useState(0);
  const [openDropDown, setOpenDropDown] = useState(false);
  const drawerHandler = () => {
    setOpen((prevState) => !prevState);
    setOpenDropDown(false);
  };
  const selectedHandler = (index) => {
    setSelected(index);
    if (selected === 4) {
      //run general method from server to check what kind of UserType and RoleType is exist
    }
  };
  const dropDownHandler = (path) => {
    if (path === "/Dashboard/suggestionsList") {
      setOpenDropDown((prevState) => !prevState);
      setOpen(true);
    }
  };
  const dropDownSelectHandler = (path, index) => {
    setDropDownSelect(index);
    history.replace(path);
  };

  return (
    <div className={classes.container}>
      <AppBar
        position="fixed"
        className={open ? classes.appBarShift : classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={drawerHandler}>
            <Menu fontSize="large" className={classes.menuIcon} />
          </IconButton>

          <Box color="primary" className={classes.leftSide}>
            <Box className={classes.userBox}>
              <Avatar src={cardImage} />
              <div className={classes.userBoxTitle}>
                <Typography variant="button" className={classes.userTitle}>
                  امیررضا چهری
                </Typography>
                <Typography variant="caption" className={classes.userRole}>
                  ترخیص کار
                </Typography>
              </div>
            </Box>
            <Box className={classes.notificationBox}>
              <IconButton>
                <Badge
                  badgeContent={6}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Notifications
                    fontSize="large"
                    className={classes.menuIcon}
                  />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge
                  badgeContent={455}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Email fontSize="large" className={classes.menuIcon} />
                </Badge>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        className={open ? classes.drawerContainerOpen : classes.drawerContainer}
        classes={{
          paper: open ? classes.drawerContainerOpen : classes.drawerContainer,
        }}
      >
        <Link to="/">
          <div className={`${classes.logo} ${open ? classes.open : ""}`}>
            <Typography
              variant="h4"
              className={`${classes.logoText} ${open ? classes.open : ""}`}
              color="primary"
            >
              {adminPanelData.logoTitle}
            </Typography>

            <img
              className={`${classes.logoImg} ${open ? classes.open : ""}`}
              src={logoImage}
              alt="logo"
            />
          </div>
        </Link>
        <Divider />
        <List className={classes.list}>
          {adminPanelData.listItem.map((item, index) => (
            <Link
              to={item.path !== "/Dashboard/suggestionsList" ? item.path : "#"}
              key={index}
            >
              <ListItem
                className={
                  selected === index ? classes.listItemActive : classes.listItem
                }
                onClick={() => dropDownHandler(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Fade in={open}>
                  <>
                    <ListItemText
                      style={open ? null : { display: "none" }}
                      className={classes.listItemText}
                    >
                      {item.text}
                    </ListItemText>
                    <div
                      style={
                        item.hasDropDown && open ? null : { display: "none" }
                      }
                    >
                      {openDropDown ? <ExpandMore /> : <ExpandLess />}
                    </div>
                  </>
                </Fade>
              </ListItem>
              {item.hasDropDown ? (
                <Collapse in={openDropDown} timeout={200} unmountOnExit>
                  <List component="div" disablePadding>
                    {item.dropDownText.map((subItem, idx) => (
                      <Link
                        onClick={() => dropDownSelectHandler(subItem.path, idx)}
                      >
                        <ListItem
                          style={open ? null : { display: "none" }}
                          button
                          key={idx}
                          className={
                            dropDownSelect === idx
                              ? classes.dropDownListActive
                              : classes.dropDownList
                          }
                        >
                          <ListItemText className={classes.dropDownText}>
                            {subItem.text}
                          </ListItemText>
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              ) : null}
            </Link>
          ))}
        </List>
      </Drawer>

      <div className={classes.main}>
        <Switch>
          <Route exact path="/Dashboard/main" component={DashboardMain} />

          <Route path="/Dashboard/tickets" component={Tickets} />
          <Route path="/Dashboard/requestRegister">
            <RequestRegister backToTab={selectedHandler} />
          </Route>
          <Route path="/Dashboard/userInfo">
            <UserInfo backToTab={selectedHandler} />
          </Route>
          <Route path="/Dashboard/bankAccount" component={BankAccount} />
          <Route path="/Dashboard/tariffCodesList" component={TariffCodeList} />

          <Route
            path="/Dashboard/suggestionsList/clearance"
            component={ClearanceList}
          />
          <Route
            path="/Dashboard/suggestionsList/findPrice"
            component={FindPrice}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
