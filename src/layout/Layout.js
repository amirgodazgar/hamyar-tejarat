import React, { useState } from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import classes from "./layout.module.css";
const Layout = ({ children }) => {
  const [navbar, setNavbar] = useState(false);
  const fixedNavbar = () => {
    if (window.pageYOffset > 300) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", fixedNavbar);
  console.log(navbar);

  return (
    <div className={classes.container}>
      <Navbar />
      <main
        className={
          navbar ? `${classes.main} ${classes.fixedNav}` : classes.main
        }
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
