import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import logo192 from "../../assets/logo192.png";
import { path } from "../../ultils/constant";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";
import { Button } from "../../components";
import menuSidebar from "../../ultils/memuSidebar";
import menuSidebarAdmin from "../../ultils/menuSidebarAdmin";
// import icons from "../../ultils/icons";

const Header = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  // const { FaAngleLeft } = icons;
  const activeStyle =
    "hover:bg-cyan-400 flex rounded-md items-center py-2 font-bold bg-cyan-400 ";
  const notActiceStyle =
    "hover:bg-cyan-400 flex rounded-md items-center py-2 cursor-pointer";
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { currentData } = useSelector((state) => state.user);

  return (
    <header className="w-full">
      <nav className="bg-[#b3e3fe] border-gray-200 px-4 lg:px-6 rounded-br-2xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
          <NavLink
            className={"flex items-center space-x-3 rtl:space-x-reverse"}
            to={path.HOME}
          >
            <img src={logo192} className="h-20" alt="Flowbite Logo" />
          </NavLink>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className={`sm:w-auto w-full ${isMenuOpen ? "block" : "hidden"}`}>
            <ul className="font-medium flex flex-col p-4 sm:p-0 sm:flex-row sm:space-x-8 rtl:space-x-reverse sm:mt-0 ">
              {menuSidebar.map((item) => (
                <li key={item.id}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeStyle : notActiceStyle
                    }
                    to={item?.path}
                  >
                    <span className={`"text-xl" `}>{item?.icon}</span>
                    <span className={``}>{item.text}</span>
                  </NavLink>
                </li>
              ))}
              {currentData.roleId === "r1" &&
                menuSidebarAdmin.map((item) => (
                  <li key={item.id}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeStyle : notActiceStyle
                    }
                    to={item?.path}
                  >
                    <span className={`text-xl`}>{item?.icon}</span>
                    <span className={` `}>{item.text}</span>
                  </NavLink>
                  </li>
                ))}

              <li>
                <Button
                  className="pr-14 text-end hover:bg-orange-500 "
                  text={"Đăng xuất"}
                  bgColor={"bg-orange-500"}
                  textColor="text-white"
                  onClick={() => {
                    dispatch(actions.logout());
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
