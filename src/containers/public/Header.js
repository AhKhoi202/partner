import React, { useCallback, useState } from "react";
import logo from "../../assets/Logo.png";
import { Button, User } from "../../components";
import icons from "../../ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import memuSidebar from "../../ultils/memuSidebar"
import Navigation from "./Navigation";

const { AiOutlinePlusCircle, AiOutlineLogin } = icons;

const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const navigate = useNavigate();
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  }, [navigate]);

  const goRegister = useCallback(() => {
    navigate(path.REGISTER);
  }, [navigate]);

  return (
    <header className="fixed w- z-50 fled top-0 w-full bg-[#f5f5f5] shadow-md">
      <nav className="flex flex-wrap w-5/6 m-auto items-center border-b-2 border-gray-200 justify-between p-4">
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
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <div className=" flex items-center gap-1">
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
            <div className=" flex items-center gap-1 relative">
              <User />
              <Button
                text={"Quan ly tai khoan"}
                textColor="text-white"
                bgColor="bg-blue-500"
                px="px-4"
                onClick={() => setIsShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div className="absolute min-w-[200px] top-full bg-white right-0 shadow-md rounded-md p-4 flex flex-col">
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
                    Dang xuat
                  </span>
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
