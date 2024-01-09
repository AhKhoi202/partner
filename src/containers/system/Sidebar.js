import React, { useState } from "react";
import anonAvatar from "../../assets/anon-avatar.png";
import { useSelector } from "react-redux";
import menuSidebar from "../../ultils/memuSidebar";
import menuSidebarAdmin from "../../ultils/menuSidebarAdmin";
import { NavLink } from "react-router-dom";
import icons from "../../ultils/icons";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { FaAngleLeft } = icons;
  const activeStyle =
    "hover:bg-cyan-400 flex rounded-md items-center gap-2 py-2 font-bold bg-cyan-400 ";
  const notActiceStyle =
    "hover:bg-cyan-400 flex rounded-md items-center gap-2 py-2 cursor-pointer";
  const { currentData } = useSelector((state) => state.user);
  return (
    <div
      className={`${
        open ? "w-1/6" : "sm:w-20 w-14"
      }  h-full min-w-14 pt-8 sm:p-2 p-1 relative duration-300 bg-blue-300`}
    >
      <FaAngleLeft
        className={`text-3xl absolute cursor-pointer -right-3 top-9 w-7   ${
          !open && "rotate-180"
        } hidden sm:inline`}
        onClick={() => setOpen(!open)}
      />
      <div className="font-medium">
        <img
          src={anonAvatar}
          alt="avatar"
          className="w-12 h-12 object-cover rounded-full border-2 border-white"
        />
        <div className="pt-2 flex flex-col justify-center">
          <span className="font-semibold">{currentData?.name}</span>
          <span>
            <span className={`${!open && "hidden"} `}>Sđt:</span>
            <small> {currentData?.phone}</small>
          </span>
          <span>
            <span className={`${!open && "hidden"} `}>Mã thành viên: </span>
            <small className="font-medium">
              {currentData?.id?.match(/\d/g).join("")?.slice(0, 6)}
            </small>
          </span>
        </div>
      </div>
      <div>
        {menuSidebar.map((item) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? activeStyle : notActiceStyle
            }
            key={item.id}
            to={item?.path}
          >
            <span className={`${open ? "text-2xl" : "text-4xl"} `}>
              {item?.icon}
            </span>
            <span className={`${!open && "hidden"} `}>{item.text}</span>
          </NavLink>
        ))}
        {currentData.roleId === "r1" &&
          menuSidebarAdmin.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? activeStyle : notActiceStyle
              }
              key={item.id}
              to={item?.path}
            >
              <span className={`${open ? "text-2xl" : "text-4xl"}`}>
                {item?.icon}
              </span>
              <span className={`${!open && "hidden"} `}>{item.text}</span>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
