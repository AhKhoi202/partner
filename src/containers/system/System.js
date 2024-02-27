import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Header } from "./";
import { Sidebar } from "./";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="w-full h-screen flex flex-col items-center">
      {/* <Header /> */}
      <div className="flex w-full flex-auto">
        <Sidebar />
        <div className="flex-auto w-full bg-[#f2f6fc] shadow-md h-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
