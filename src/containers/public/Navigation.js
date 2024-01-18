import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { path } from "../../ultils/constant";
import menuNavigation from "../../ultils/menuNavigation";

const notActive =
  "hover:text-gray-500 px-4 h-full flex items-center py-1 sm:py-0";
const active =
  "hover:text-gray-500 px-4 h-full text-gray-800 flex items-center py-1 sm:py-0";

const Navigation = ({ isAdmin }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`w-full flex ${
        isAdmin ? "justify-start" : "justify-center"
      } items-center sm:h-[40px] bg-[#f5f5f5] m-auto  text-gray-400`}
    >
      <div className="w-full sm:w-5/6 flex-col text-sm font-medium">
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
        <div
          className={`sm:flex justify-start h-full  ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <NavLink
            to={path.HOME}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            Trang chủ
          </NavLink>
          {isLoggedIn && (
            <>
              {menuNavigation.map((item) => (
                <NavLink
                  className={({ isActive }) => (isActive ? active : notActive)}
                  key={item.id}
                  to={item?.path}
                >
                  <span>{item.text}</span>
                </NavLink>
              ))}
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
