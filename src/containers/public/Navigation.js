import React from "react";
import { NavLink } from "react-router-dom";
import { path } from "../../ultils/constant";

const notActive =
  "hover:bg-secondary2 px-4 h-full flex items-center bg-secondary1";
const active =
  "hover:bg-secondary2 px-4 h-full flex items-center bg-secondary2";

const Navigation = ({isAdmin}) => {
  return (
    <div className={`w-full flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center h-[40px] bg-secondary1 text-white`}>
      <div className="w-1100 h-full flex items-center text-sm font-medium">
        <div className=" flex justify-center items-center h-full">
          <NavLink
            to={path.HOME}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to={path.KHACH_HANG_TIEM_NANG}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            Khách hàng tiềm năng
          </NavLink>
          <NavLink
            to={path.TIEN_DO_CONG_VIEC}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            Tiến độ công việc
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
