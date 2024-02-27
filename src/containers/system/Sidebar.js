import React, { useState } from "react";
import anonAvatar from "../../assets/anon-avatar.png";
import { useSelector } from "react-redux";
import menuSidebar from "../../ultils/memuSidebar";
import menuSidebarAdmin from "../../ultils/menuSidebarAdmin";
import { NavLink } from "react-router-dom";
import icons from "../../ultils/icons";
import logo192 from "../../assets/logo192.png";
import logo193 from "../../assets/logo192(1).png";
import { path } from "../../ultils/constant";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { FaAngleLeft, MdLogout } = icons;
  const activeStyle =
    "hover:bg-[#f4f4f4] flex rounded-md items-center gap-2 py-2 font-bold bg-[#f4f4f4]";
  const notActiceStyle =
    "hover:bg-[#f4f4f4] flex rounded-md items-center gap-2 py-2 cursor-pointer";
  const { currentData } = useSelector((state) => state.user);

  return (
    <div
      className={`${
        open ? "w-1/6" : "sm:w-20 w-14"
      } h-full min-w-14 pt-8 sm:p-2 p-1 relative duration-300 bg-white flex flex-col justify-between`}
    >
      <FaAngleLeft
        className={`text-3xl absolute cursor-pointer -right-3 top-9 w-7 ${
          !open && "rotate-180"
        } hidden sm:inline`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex-1">
        <div>
          <NavLink
            className={"flex items-center space-x-3 rtl:space-x-reverse"}
            to={path.HOME}
          >
            <img
              src={open ? logo192 : logo193}
              className={`mx-auto ${open ? "h-20" : "h-14 p-2"}`}
              alt="Flowbite Logo"
            />
          </NavLink>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            {menuSidebar.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : notActiceStyle
                }
                key={item.id}
                to={item.path}
              >
                <span className={`${open ? "text-2xl" : "text-2xl m-auto"}`}>
                  {item.icon}
                </span>
                <span className={`${!open && "hidden"}`}>{item.text}</span>
              </NavLink>
            ))}
            {currentData.roleId === "r1" &&
              menuSidebarAdmin.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : notActiceStyle
                  }
                  key={item.id}
                  to={item.path}
                >
                  <span className={`${open ? "text-2xl" : "text-2xl  m-auto"}`}>
                    {item.icon}
                  </span>
                  <span className={`${!open && "hidden"}`}>{item.text}</span>
                </NavLink>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between border-t-2 pt-4">
        <div className="flex">
          <img
            src={anonAvatar}
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full border-2 border-white"
          />
          <div className={`pl-2 flex flex-col ${!open ? "hidden" : ""}`}>
            <span className="font-semibold">{currentData?.name}</span>
            <span>
              <small>{currentData?.phone}</small>
            </span>
          </div>
        </div>
        <MdLogout
          onClick={() => {
            dispatch(actions.logout());
          }}
          className={` ${!open ? "hidden" : ""} text-xl my-auto`}
        />
      </div>
    </div>
  );
};

export default Sidebar;
