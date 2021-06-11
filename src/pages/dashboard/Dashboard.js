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
  ExitToAppRounded,
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
import RequestDetail from "./suggestionsList/RequestDetail";
import BackDrop from "../../common/backDrop/BackDrop";
import ProposalsList from "./suggestionsList/ProposalsList";
import ProposalDetail from "./suggestionsList/ProposalDetail";
import ClearanceProposalList from "./suggestionsList/ClearanceProposalList";
import ClearanceProposalDetail from "./suggestionsList/ClearanceProposalDetail";
import SearchAllRequest from "./suggestionsList/submitProposal/SearchAllRequest";
import SubmitProposalDetail from "./suggestionsList/submitProposal/SubmitProposalDetail";
import UserCheckBackDrop from "../../common/backDrop/UserCheckBackDrop";
import { clearCookies } from "../../helper/cookies";

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [dropDownSelect, setDropDownSelect] = useState(0);
  const [openSuggestList, setOpenSuggestList] = useState(false);
  const [openProposalList, setOpenProposalList] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getUserInfoData()).then((res) => {
      if (res.payload === undefined) {
        clearCookies();
        history.replace("/register");
        return;
      }
      setUserData(res.payload);
      const checkProfileCompleted =
        res.payload.isProfileCompleted === undefined
          ? false
          : res.payload.isProfileCompleted;
      setIsProfileCompleted(checkProfileCompleted);
      setIsLoading(false);
      console.log(res);
    });
  }, []);

  const checkBusinessMan = () => {
    const role = Cookies.getJSON("userInfo").role;
    switch (role) {
      case "Businessman":
        return true;

      case "Clearanceman ":
        return false;

      default:
        return false;
    }
  };

  const userName = () => {
    if (userData.firstName && userData.lastName) {
      return userData.firstName === undefined && userData.lastName === undefined
        ? userData.email
        : `${userData.firstName} ${userData.lastName}`;
    } else if (userData.companyName) {
      return userData.companyName === undefined
        ? userData.email
        : userData.companyName;
    }
  };

  const exitHandler = () => {
    clearCookies();
    window.location.reload();
  };
  const userInfoHandler = () => {
    dispatch(getUserInfoData());
  };
  let isLogin = Cookies.get("login");
  let navbarRole = () => {
    return Cookies.getJSON("userInfo") === undefined
      ? history.replace("/register")
      : Cookies.getJSON("userInfo");
  };
  const drawerHandler = () => {
    setOpen((prevState) => !prevState);
    setOpenSuggestList(false);
  };
  const selectedHandler = (index) => {
    setSelected(index);
  };
  const dropDownHandler = (path) => {
    if (
      path === "/Dashboard/suggestionsList" ||
      path === "/Dashboard/quotationProposalsListAsync"
    ) {
      setOpenSuggestList((prevState) => !prevState);
      setOpenProposalList(false);
      setOpen(true);
    }
  };
  const dropDownSelectHandler = (path, index) => {
    setDropDownSelect(index);
    history.replace(path);
  };
  const secondDropDownHandler = (path) => {
    if (path === "/Dashboard/getQuotationRequestList") {
      setOpenProposalList((prevState) => !prevState);
      setOpenSuggestList(false);
      setOpen(true);
    }
  };

  return (
    <>
      {!isLogin || isLogin === undefined ? (
        history.replace("/register")
      ) : (
        <div className={classes.container}>
          {isLoading ? (
            <BackDrop />
          ) : (
            <>
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
                        <Typography
                          variant="button"
                          className={classes.userTitle}
                        >
                          {userName()}
                        </Typography>
                        <Typography
                          variant="caption"
                          className={classes.userRole}
                        >
                          {navbarRole().role === "Clearanceman"
                            ? "ترخیص کار"
                            : "تاجر"}
                        </Typography>
                      </div>
                    </Box>
                    <Box className={classes.notificationBox}>
                      {/* <IconButton>
                        <Badge
                          badgeContent={0}
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
                          badgeContent={0}
                          color="secondary"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <Email
                            fontSize="large"
                            className={classes.menuIcon}
                          />
                        </Badge>
                      </IconButton> */}
                      <IconButton
                        style={{ borderRadius: "10px" }}
                        onClick={exitHandler}
                      >
                        <ExitToAppRounded fontSize="default" />
                        <Typography style={{marginRight:".2rem"}} variant="button">خروج</Typography>
                      </IconButton>
                      <IconButton
                        style={{ borderRadius: "10px" }}
                        onClick={() => history.push("/")}
                      >
                        <Typography variant="button">صفحه اصلی</Typography>
                      </IconButton>
                    </Box>
                  </Box>
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                open={open}
                className={
                  open ? classes.drawerContainerOpen : classes.drawerContainer
                }
                classes={{
                  paper: open
                    ? classes.drawerContainerOpen
                    : classes.drawerContainer,
                }}
              >
                <Link to="/">
                  <div
                    className={`${classes.logo} ${open ? classes.open : ""}`}
                  >
                    <Typography
                      variant="h4"
                      className={`${classes.logoText} ${
                        open ? classes.open : ""
                      }`}
                      color="primary"
                    >
                      {adminPanelData.logoTitle}
                    </Typography>

                    <img
                      className={`${classes.logoImg} ${
                        open ? classes.open : ""
                      }`}
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
                        selected === 0
                          ? classes.listItemActive
                          : classes.listItem
                      }
                    >
                      <ListItemIcon>
                        {adminPanelData.listItem[0].icon}
                      </ListItemIcon>
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

                  {/* SUGGESTIONS-LIST --- OR --- PROPOSAL-LIST --------- */}
                  {checkBusinessMan() === true ? (
                    <Link to="#">
                      <ListItem
                        className={
                          selected === 1
                            ? classes.listItemActive
                            : classes.listItem
                        }
                        onClick={() =>
                          dropDownHandler(adminPanelData.listItem[1].path)
                        }
                      >
                        <ListItemIcon>
                          {adminPanelData.listItem[1].icon}
                        </ListItemIcon>
                        <Fade in={open}>
                          <>
                            <ListItemText
                              style={open ? null : { display: "none" }}
                              className={classes.listItemText}
                            >
                              {"فعالیت های شما"}
                            </ListItemText>
                            <div
                              style={
                                adminPanelData.listItem[1].hasDropDown && open
                                  ? null
                                  : { display: "none" }
                              }
                            >
                              {openSuggestList ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </div>
                          </>
                        </Fade>
                      </ListItem>
                      {adminPanelData.listItem[1].hasDropDown ? (
                        <Collapse
                          in={openSuggestList}
                          timeout={200}
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {adminPanelData.listItem[1].dropDownText.map(
                              (subItem, idx) => (
                                <span
                                  onClick={() =>
                                    dropDownSelectHandler(subItem.path, idx)
                                  }
                                  key={idx}
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
                                    <ListItemText
                                      className={classes.dropDownText}
                                    >
                                      {subItem.text}
                                    </ListItemText>
                                  </ListItem>
                                </span>
                              )
                            )}
                          </List>
                        </Collapse>
                      ) : null}
                    </Link>
                  ) : (
                    <Link to="#">
                      <ListItem
                        className={
                          selected === 1
                            ? classes.listItemActive
                            : classes.listItem
                        }
                        onClick={() =>
                          dropDownHandler(
                            adminPanelData.listItemClearance[0].path
                          )
                        }
                      >
                        <ListItemIcon>
                          {adminPanelData.listItemClearance[0].icon}
                        </ListItemIcon>
                        <Fade in={open}>
                          <>
                            <ListItemText
                              style={open ? null : { display: "none" }}
                              className={classes.listItemText}
                            >
                              {"فعالیت های شما"}
                            </ListItemText>
                            <div
                              style={
                                adminPanelData.listItemClearance[0]
                                  .hasDropDown && open
                                  ? null
                                  : { display: "none" }
                              }
                            >
                              {openSuggestList ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </div>
                          </>
                        </Fade>
                      </ListItem>
                      {adminPanelData.listItemClearance[0].hasDropDown ? (
                        <Collapse
                          in={openSuggestList}
                          timeout={200}
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {adminPanelData.listItemClearance[0].dropDownText.map(
                              (subItem, idx) => (
                                <span
                                  onClick={() =>
                                    dropDownSelectHandler(subItem.path, idx)
                                  }
                                  key={idx}
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
                                    <ListItemText
                                      className={classes.dropDownText}
                                    >
                                      {subItem.text}
                                    </ListItemText>
                                  </ListItem>
                                </span>
                              )
                            )}
                          </List>
                        </Collapse>
                      ) : null}
                    </Link>
                  )}

                  {/* TICKETS --------------------- */}
                  <Link to={adminPanelData.listItem[2].path}>
                    <ListItem
                      className={
                        selected === 2
                          ? classes.listItemActive
                          : classes.listItem
                      }
                    >
                      <ListItemIcon>
                        {adminPanelData.listItem[2].icon}
                      </ListItemIcon>
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

                  {/* REQUEST-REGISTER --- OR --- QuotationList --------- */}

                  {checkBusinessMan() === true ? (
                    <Link to={adminPanelData.listItem[3].path}>
                      <ListItem
                        className={
                          selected === 3
                            ? classes.listItemActive
                            : classes.listItem
                        }
                      >
                        <ListItemIcon>
                          {adminPanelData.listItem[3].icon}
                        </ListItemIcon>
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
                  ) : (
                    <Link to="#">
                      <ListItem
                        className={
                          selected === 3
                            ? classes.listItemActive
                            : classes.listItem
                        }
                        onClick={() =>
                          secondDropDownHandler(
                            adminPanelData.listItemClearance[1].path
                          )
                        }
                      >
                        <ListItemIcon>
                          {adminPanelData.listItemClearance[1].icon}
                        </ListItemIcon>
                        <Fade in={open}>
                          <>
                            <ListItemText
                              style={open ? null : { display: "none" }}
                              className={classes.listItemText}
                            >
                              {"لیست درخواست ها"}
                            </ListItemText>
                            <div
                              style={
                                adminPanelData.listItemClearance[1]
                                  .hasDropDown && open
                                  ? null
                                  : { display: "none" }
                              }
                            >
                              {openProposalList ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </div>
                          </>
                        </Fade>
                      </ListItem>
                      {adminPanelData.listItemClearance[1].hasDropDown ? (
                        <Collapse
                          in={openProposalList}
                          timeout={200}
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {adminPanelData.listItemClearance[1].dropDownText.map(
                              (subItem, idx) => (
                                <span
                                  onClick={() =>
                                    dropDownSelectHandler(subItem.path, idx)
                                  }
                                  key={idx}
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
                                    <ListItemText
                                      className={classes.dropDownText}
                                    >
                                      {subItem.text}
                                    </ListItemText>
                                  </ListItem>
                                </span>
                              )
                            )}
                          </List>
                        </Collapse>
                      ) : null}
                    </Link>
                  )}

                  {/* USER-INFO --------------------- */}
                  <Link to={"/Dashboard/userInfo"}>
                    <ListItem
                      className={
                        selected === 4
                          ? classes.listItemActive
                          : classes.listItem
                      }
                      onClick={userInfoHandler}
                    >
                      <ListItemIcon>
                        {adminPanelData.listItem[4].icon}
                      </ListItemIcon>
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
                        selected === 5
                          ? classes.listItemActive
                          : classes.listItem
                      }
                    >
                      <ListItemIcon>
                        {adminPanelData.listItem[5].icon}
                      </ListItemIcon>
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
                        selected === 6
                          ? classes.listItemActive
                          : classes.listItem
                      }
                    >
                      <ListItemIcon>
                        {adminPanelData.listItem[6].icon}
                      </ListItemIcon>
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
                  <Route exact path="/Dashboard/main">
                    {isLoading ? (
                      <BackDrop />
                    ) : isProfileCompleted ? (
                      <DashboardMain backToTab={selectedHandler} />
                    ) : (
                      <UserCheckBackDrop
                        setRoute="/Dashboard/userInfo"
                        severity="error"
                        reload={false}
                      />
                    )}
                  </Route>

                  <Route path="/Dashboard/tickets" component={Tickets} />
                  <Route path="/Dashboard/requestRegister">
                    {isProfileCompleted ? (
                      <RequestRegister backToTab={selectedHandler} />
                    ) : (
                      <UserCheckBackDrop
                        setRoute="/Dashboard/userInfo"
                        severity="error"
                        reload={false}
                      />
                    )}
                  </Route>

                  <Route path={"/Dashboard/userInfo"}>
                    <UserInfo backToTab={selectedHandler} />
                  </Route>

                  <Route path="/Dashboard/bankAccount">
                    <BankAccount backToTab={selectedHandler} />
                  </Route>
                  <Route path="/Dashboard/tariffCodesList">
                    <TariffCodeList backToTab={selectedHandler} />
                  </Route>

                  {/* ----- BusinessMan -------- */}
                  <Route path="/Dashboard/suggestionsList/clearance">
                    <ClearanceList backToTab={selectedHandler} />
                  </Route>
                  <Route path="/Dashboard/suggestionsList/quotationRequestList">
                    <FindPrice backToTab={selectedHandler} />
                  </Route>
                  <Route path="/Dashboard/suggestionsList/singleQuotationRequest/:id">
                    <RequestDetail userName={userName} />
                  </Route>
                  <Route path="/Dashboard/suggestionsList/quotationProposals/:id">
                    <ProposalsList backToTab={selectedHandler} />
                  </Route>
                  <Route path="/Dashboard/suggestionsList/SingleQuotationProposal/:id">
                    <ProposalDetail userName={userName} />
                  </Route>

                  {/* ----- ClearanceMan -------- */}

                  {/* ClearanceList DEMO */}
                  <Route path="/Dashboard/quotationProposalsListAsync/clearance">
                    <ClearanceList />
                  </Route>
                  <Route path="/Dashboard/getQuotationRequestList/clearance">
                    <ClearanceList />
                  </Route>
                  {/* ClearanceList : request & proposal */}

                  <Route path="/Dashboard/quotationProposalsListAsync/quotationRequestList">
                    <ClearanceProposalList backToTab={selectedHandler} />
                  </Route>
                  <Route path="/Dashboard/quotationProposalsListAsync/quotationRequestDetail/:id">
                    <ClearanceProposalDetail userName={userName} />
                  </Route>

                  <Route path="/Dashboard/getQuotationRequestList/SearchAllQuotationRequests">
                    {isProfileCompleted ? (
                      <SearchAllRequest backToTab={selectedHandler} />
                    ) : (
                      <UserCheckBackDrop
                        setRoute="/Dashboard/userInfo"
                        severity="error"
                        reload={false}
                      />
                    )}
                  </Route>

                  <Route path="/Dashboard/getQuotationRequestList/GetQuotationRequest/:id">
                    <SubmitProposalDetail userName={userName} />
                  </Route>
                </Switch>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
