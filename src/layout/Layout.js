import React from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import classes from "./layout.module.css";
const Layout = ({ children }) => {
  return (
    <div className={classes.container}>
      <Navbar />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
