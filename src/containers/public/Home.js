import React from "react";
import Header from "./Header.js";
import Footer from './Footer.js'
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[#F8F9FA]">
      <Header className="" />
      <div className="w-full flex justify-center  ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
