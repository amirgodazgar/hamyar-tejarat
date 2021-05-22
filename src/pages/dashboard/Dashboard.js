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
import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getUserInfoData } from "../../store/dashboard/dashboardSlice";

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [dropDownSelect, setDropDownSelect] = useState(0);
  const [userInfoRoute, setUserInfoRoute] = useState("");
  const [openSuggestList, setOpenSuggestList] = useState(false);

  useEffect(() => {
    dispatch(getUserInfoData());
  }, []);

  const userInfoHandler = () => {
    const user = Cookies.getJSON("userInfo");
    console.log(`${user.type}-${user.role}`);
    setUserInfoRoute(`${user.type}-${user.role}`);
  };

  const drawerHandler = () => {
    setOpen((prevState) => !prevState);
    setOpenSuggestList(false);
  };
  const selectedHandler = (index) => {
    setSelected(index);
  };
  const dropDownHandler = (path) => {
    if (path === "/Dashboard/suggestionsList") {
      setOpenSuggestList((prevState) => !prevState);
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
          {/* DASHBOARD --------------------- */}
          <Link to={adminPanelData.listItem[0].path}>
            <ListItem
              className={
                selected === 0 ? classes.listItemActive : classes.listItem
              }
            >
              <ListItemIcon>{adminPanelData.listItem[0].icon}</ListItemIcon>
              <Fade in={open}>
                <>
                  <ListItemText
                    style={open ? null : { display: "none" }}
                    className={classes.listItemText}
                  >
                    {adminPanelData.listItem[0].text}
                  </ListItemText>
                </>
              </Fade>
            </ListItem>
          </Link>

          {/* SUGGESTIONS-LIST --------------------- */}
          <Link to="#">
            <ListItem
              className={
                selected === 1 ? classes.listItemActive : classes.listItem
              }
              onClick={() => dropDownHandler(adminPanelData.listItem[1].path)}
            >
              <ListItemIcon>{adminPanelData.listItem[1].icon}</ListItemIcon>
              <Fade in={open}>
                <>
                  <ListItemText
                    style={open ? null : { display: "none" }}
                    className={classes.listItemText}
                  >
                    {adminPanelData.listItem[1].text}
                  </ListItemText>
                  <div
                    style={
                      adminPanelData.listItem[1].hasDropDown && open
                        ? null
                        : { display: "none" }
                    }
                  >
                    {openSuggestList ? <ExpandMore /> : <ExpandLess />}
                  </div>
                </>
              </Fade>
            </ListItem>
            {adminPanelData.listItem[1].hasDropDown ? (
              <Collapse in={openSuggestList} timeout={200} unmountOnExit>
                <List component="div" disablePadding>
                  {adminPanelData.listItem[1].dropDownText.map(
                    (subItem, idx) => (
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
                    )
                  )}
                </List>
              </Collapse>
            ) : null}
          </Link>

          {/* TICKETS --------------------- */}
          <Link to={adminPanelData.listItem[2].path}>
            <ListItem
              className={
                selected === 2 ? classes.listItemActive : classes.listItem
              }
            >
              <ListItemIcon>{adminPanelData.listItem[2].icon}</ListItemIcon>
              <Fade in={open}>
                <>
                  <ListItemText
                    style={open ? null : { display: "none" }}
                    className={classes.listItemText}
                  >
                    {adminPanelData.listItem[2].text}
                  </ListItemText>
                </>
              </Fade>
            </ListItem>
          </Link>

          {/* REQUEST-REGISTER --------------------- */}
          <Link to={adminPanelData.listItem[3].path}>
            <ListItem
              className={
                selected === 3 ? classes.listItemActive : classes.listItem
              }
            >
              <ListItemIcon>{adminPanelData.listItem[3].icon}</ListItemIcon>
              <Fade in={open}>
                <>
                  <ListItemText
                    style={open ? null : { display: "none" }}
                    className={classes.listItemText}
                  >
                    {adminPanelData.listItem[3].text}
                  </ListItemText>
                </>
              </Fade>
            </ListItem>
          </Link>

          {/* USER-INFO --------------------- */}
          <Link to={"/Dashboard/userInfo"}>
            <ListItem
              className={
                selected === 4 ? classes.listItemActive : classes.listItem
              }
            >
              <ListItemIcon>{adminPanelData.listItem[4].icon}</ListItemIcon>
              <Fade in={open}>
                <>
                  <ListItemText
                    style={open ? null : { display: "none" }}
                    className={classes.listItemText}
                  >
                    {adminPanelData.listItem[4].text}
                  </ListItemText>
                </>
              </Fade>
            </ListItem>
          </Link>

          {/* BANK-ACCOUNT --------------------- */}
          <Link to={adminPanelData.listItem[5].path}>
            <ListItem
              className={
                selected === 5 ? classes.listItemActive : classes.listItem
              }
            >
              <ListItemIcon>{adminPanelData.listItem[5].icon}</ListItemIcon>
              <Fade in={open}>
                <>
                  <ListItemText
                    style={open ? null : { display: "none" }}
                    className={classes.listItemText}
                  >
                    {adminPanelData.listItem[5].text}
                  </ListItemText>
                </>
              </Fade>
            </ListItem>
          </Link>

          {/* TARIFF-CODE-LIST --------------------- */}
          <Link to={adminPanelData.listItem[6].path}>
            <ListItem
              className={
                selected === 6 ? classes.listItemActive : classes.listItem
              }
            >
              <ListItemIcon>{adminPanelData.listItem[6].icon}</ListItemIcon>
              <Fade in={open}>
                <>
                  <ListItemText
                    style={open ? null : { display: "none" }}
                    className={classes.listItemText}
                  >
                    {adminPanelData.listItem[6].text}
                  </ListItemText>
                </>
              </Fade>
            </ListItem>
          </Link>
        </List>
      </Drawer>

      <div className={classes.main}>
        <Switch>
          <Route exact path="/Dashboard/main" component={DashboardMain} />

          <Route path="/Dashboard/tickets" component={Tickets} />
          <Route path="/Dashboard/requestRegister">
            <RequestRegister backToTab={selectedHandler} />
          </Route>

          <Route path={"/Dashboard/userInfo"}>
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
