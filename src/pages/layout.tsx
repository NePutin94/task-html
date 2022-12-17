import React from "react";
import {Outlet} from "react-router-dom";
import Footer from "../footer";
import Navbar from "../navbar";

/* the main layout of the application */
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;