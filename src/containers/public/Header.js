import React, { useCallback, useState } from "react";
import logo from "../../assets/Logo.png";
import { Button, User } from "../../components";
import icons from "../../ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import menuManage from "../../ultils/menuManage";

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
    <div className="w-1100">
      <div className="w-full flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <div className=" flex items-center gap-1">
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={goLogin}
                IcAfter={AiOutlineLogin}
              />
              <Button
                text={"Đăng ký"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={goRegister}
                IcAfter={AiOutlinePlusCircle}
              />
            </div>
          )}
          {isLoggedIn && (
            <div className=" flex items-center gap-1 relative">
              <User/>
              <Button
                text={"Quan ly tai khoan"}
                textColor="text-white"
                bgColor="bg-blue-500"
                
                px="px-4"
                onClick={() => setIsShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div className="absolute min-w-[200px] top-full bg-white right-0 shadow-md rounded-md p-4 flex flex-col">
                  {menuManage.map((item) => {
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
                    onClick={() => 
                    {
                      setIsShowMenu(false)
                      dispatch(actions.logout())
                    }}
                  >
                    <AiOutlineLogin/>
                    Dang xuat
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
