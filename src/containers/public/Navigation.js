import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { path } from "../../ultils/constant";

const notActive =
  "hover:text-gray-500 px-4 h-full flex items-center py-1 sm:py-0";
const active =
  "hover:text-gray-500 px-4 h-full text-gray-800 flex items-center py-1 sm:py-0";

const Navigation = ({ isAdmin }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div
      className={`w-full flex ${
        isAdmin ? "justify-start" : "justify-center"
      } items-center sm:h-[40px] bg-[#f5f5f5] m-auto  text-gray-400`}
    >
      <div className="w-full sm:w-5/6 flex items-center text-sm font-medium">
        <div className="block sm:flex justify-center items-center h-full">
          <NavLink
            to={path.HOME}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            Trang chủ
          </NavLink>
          {isLoggedIn && (
            <>
              <NavLink
                to={path.KHACH_HANG_TIEM_NANG}
                className={({ isActive }) => (isActive ? active : notActive)}
              >
                Khách hàng tiềm năng
              </NavLink>
              {/* <NavLink
            to={path.TIEN_DO_CONG_VIEC}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            Tiến độ công việc
          </NavLink> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
