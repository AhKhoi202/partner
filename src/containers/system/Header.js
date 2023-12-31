import { NavLink } from "react-router-dom";
import React from "react";
import logo192 from "../../assets/logo192.png";
import { path } from "../../ultils/constant";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";
import { Button } from "../../components";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="w-full  ">
      <nav class="bg-[#b3e3fe] border-gray-200 px-4 lg:px-6 rounded-br-2xl ">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavLink className={"flex"} to={path.HOME}>
            <img src={logo192} class="h-20" alt="Flowbite Logo" />
          </NavLink>
          <Button
            className="text-end hover:bg-orange-500 "
            text={"Đăng xuất"}
            bgColor={"bg-orange-500"}
            textColor="text-white"
            onClick={() => {
              dispatch(actions.logout());
            }}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
