import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Footer from './Footer.js'
import { Outlet } from "react-router-dom";

const Home = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const handleScroll = () => {
    setHeaderVisible(window.scrollY < window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[#F8F9FA]">
      {isHeaderVisible && 
      <Header className="" />
      }
      <div className="w-full flex justify-center  ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
