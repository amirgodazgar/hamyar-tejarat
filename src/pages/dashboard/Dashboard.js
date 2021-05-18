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
} from "@material-ui/core";
import React, { useState } from "react";
import classes from "./Dashboard.module.css";
import logoImage from "../../styles/image/logo.png";
import { adminPanelData } from "../../constant/adminPanel";
import { Menu, Notifications, Email } from "@material-ui/icons";
import { Switch, Route, Link } from "react-router-dom";
import DashboardMain from "./dashboard/DashboardMain";
import SuggestionsList from "./suggestionsList/SuggestionsList";
import Tickets from "./tickets/Tickets";
import RequestRegister from "./requestRegister/RequestRegister";
import UserInfo from "./userInfo/UserInfo";
import BankAccount from "./bankAccount/BankAccount";
import TariffCodeList from "./tariffCodesList/TariffCodeList";
import { getBusinessmanProfile } from "../../services/userInfo/userInfoServices";
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const drawerHandler = () => {
    setOpen((prevState) => !prevState);
  };
  const selectedHandler = (index) => {
    setSelected(index);
    if (selected === 4) {
      //run general method from server to check what kind of UserType and RoleType is exist
    }
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
              <Avatar />
              <div className={classes.userBoxTitle}>
                <Typography variant="button" className={classes.userTitle}>
                  چنگیز مغول
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
              to={item.path ? item.path : "/Dashboard/dashboard"}
              key={index}
            >
              <ListItem
                className={
                  selected === index ? classes.listItemActive : classes.listItem
                }
                onClick={() => selectedHandler(index)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Fade in={open}>
                  <ListItemText
                    style={open ? null : { display: "none" }}
                    className={classes.listItemText}
                  >
                    {item.text}
                  </ListItemText>
                </Fade>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <div className={classes.main}>
        <Switch>
          <Route exact path="/Dashboard/dashboard" component={DashboardMain} />
          <Route
            path="/Dashboard/suggestionsList"
            component={SuggestionsList}
          />
          <Route path="/Dashboard/tickets" component={Tickets} />
          <Route path="/Dashboard/requestRegister">
            <RequestRegister backToTab={selectedHandler} />
          </Route>
          <Route path="/Dashboard/userInfo">
            <UserInfo backToTab={selectedHandler} />
          </Route>
          <Route path="/Dashboard/bankAccount" component={BankAccount} />
          <Route path="/Dashboard/tariffCodesList" component={TariffCodeList} />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
