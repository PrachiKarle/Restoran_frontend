import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footers from "./Footers";

const Headers = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
      <Footers/>
    </>
  );
};

export default Headers;
