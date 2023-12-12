import React from "react";
import anonAvatar from "../../assets/anon-avatar.png";
import { useSelector } from "react-redux";
import menuSidebar from "../../ultils/memuSidebar";
import menuSidebarAdmin from "../../ultils/menuSidebarAdmin";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const activeStyle =
    "hover:bg-gray-200 flex  rounded-md items-center gap-2 py-2 font-bold bg-gray-200";
  const notActiceStyle =
    "hover:bg-gray-200 flex  rounded-md items-center gap-2 py-2 cursor-pointer";

  const { currentData } = useSelector((state) => state.user);
  // console.log(currentData);
  return (
    <div className="w-1/6 flex-none p-4 flex flex-col gap-6">
      <div>
        <div>
          <img
            src={anonAvatar}
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full border-2 border-white"
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{currentData?.name}</span>
            <small>{currentData?.phone}</small>
          </div>
        </div>
        <span>
          Mã thành viên:{" "}
          <small className="font-medium">
            {currentData?.id?.match(/\d/g).join("")?.slice(0, 6)}
          </small>
        </span>
      </div>
      <div>
         

        {menuSidebar.map((item) => 
            <NavLink
              className={({ isActive }) =>
                isActive ? activeStyle : notActiceStyle
              }
              key={item.id}
              to={item?.path}
            >
              {item?.icon}
              {item.text}
            </NavLink>
          )} 
        
        { currentData.roleId === 'r1' && menuSidebarAdmin.map((item) => ( 
         
            <NavLink
              className={({ isActive }) =>
                isActive ? activeStyle : notActiceStyle
              }
              key={item.id}
              to={item?.path}
            >
              {item?.icon}
              {item.text}
            </NavLink>
          
          )
         )}
      </div>
    </div>
  );
};

export default Sidebar;
