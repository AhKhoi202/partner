import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Sidebar } from "./";

const System = () => {
  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn || currentData.roleId !== "r1")
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex w-full flex-auto">
        <Sidebar className="h-full fixed left-0 top-0 bottom-0 overflow-y-auto" />
        <div className="flex-auto w-full bg-[#f2f6fc] shadow-md overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
