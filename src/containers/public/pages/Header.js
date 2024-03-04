import React, { useCallback, useState } from "react";
import logo from "../../../assets/Logo.png";
import { Button, User } from "../../../components";
import icons from "../../../ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../../ultils/constant";
import * as actions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import memuSidebar from "../../../ultils/memuSidebar";
import menuSidebarAdmin from "../../../ultils/menuSidebarAdmin";
import Navigation from "../Navigation";

const { AiOutlinePlusCircle, AiOutlineLogin } = icons;

const Header = () => {
  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowMenuAdmin, setIsShowMenuAdmin] = useState(false);
  const navigate = useNavigate();
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  }, [navigate]);

  const goRegister = useCallback(() => {
    navigate(path.REGISTER);
  }, [navigate]);
  console.log(isShowMenuAdmin);

  return (
    <header className="relative z-50 w-screen bg-[#f5f5f5] shadow-md">
      <nav className="flex flex-wrap md:w-5/6 w-full m-auto items-center border-b-2 border-gray-200 justify-between p-4">
        <div className="flex items-center">
          <a href="/" className="text-xl font-semibold">
            <img src={logo} className="h-10" alt="BLUEBOLT SOFTWARE" />
          </a>
          <div className="ml-4">
            <span className="text-sm text-[#154e8d]">
              Đối Tác Công Nghệ Tin Cậy Của Mọi Doanh Nghiệp
            </span>
          </div>
        </div>
        <div className="ml-auto">
          {!isLoggedIn && (
            <div className=" flex items-end gap-3">
              <Button
                text={"Đăng nhập"}
                textColor="text-[#3961fb]"
                bgColor="bg-white"
                hover={
                  "hover:border-gray-500 hover:bg-[#3961fb] hover:text-white"
                }
                onClick={goLogin}
                IcAfter={AiOutlineLogin}
              />
              <Button
                text={"Đăng ký"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                hover={
                  "hover:border-gray-500 hover:bg-white hover:text-[#3961fb]"
                }
                onClick={goRegister}
                IcAfter={AiOutlinePlusCircle}
              />
            </div>
          )}
          {isLoggedIn && (
            <div className="flex justify-between items-center gap-3 relative">
              <User />
              <Button
                text="Quản lý tài khoản"
                textColor="text-white"
                bgColor="bg-blue-500"
                px="px-4"
                onClick={() => {
                  setIsShowMenu((prev) => !prev);
                  setIsShowMenuAdmin(false);
                }}
              />
              {isShowMenu && (
                <div className="absolute min-w-[200px] top-full bg-white right-10 shadow-md rounded-md p-4 flex flex-col">
                  {memuSidebar.map((item) => {
                    return (
                      <Link
                        className="hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2"
                        key={item.id}
                        to={item?.path}
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    );
                  })}
                  <span
                    className="cursor-pointer hover:text-orange-500 text-blue-500 py-2 flex items-center gap-2"
                    onClick={() => {
                      setIsShowMenu(false);
                      dispatch(actions.logout());
                    }}
                  >
                    <AiOutlineLogin />
                    Đăng xuất
                  </span>
                </div>
              )}
              {currentData?.roleId === "r1" && (
                <Button
                  text="Quản trị"
                  textColor="text-white"
                  bgColor="bg-blue-500"
                  px="px-4"
                  onClick={() => {
                    setIsShowMenuAdmin((prev) => !prev);
                    setIsShowMenu(false);
                  }}
                />
              )}
              {isShowMenuAdmin && (
                <div className="absolute min-w-[200px] top-full bg-white right-0 shadow-md rounded-md p-4 flex flex-col">
                  {menuSidebarAdmin.map((item) => {
                    return (
                      <Link
                        className="hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2"
                        key={item.id}
                        to={item?.path}
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <Navigation />
    </header>
  );
};

export default Header;
