import React, { useEffect } from "react";
import { logout } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import path from "../../../untils/path";
import { NavLink } from "react-router-dom";
const MenuSetting = ({ setIsSetting }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOption = (e) => {
      const setting = document.getElementById("setting");
      if (!!setting?.contains(e.target) === false) {
        console.log("đóng");
        setIsSetting(false);
      }
    };
    document.addEventListener("click", handleClickOption);
    return () => {
      document.removeEventListener("click", handleClickOption);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute font-bold top-3 font-serif text-gray-700 z-100 rounded-sm right-0 mt-10 w-[200px] h-auto py-[12px] px-[4px]  bg-gray-200"
    >
      <div className="flex justify-center items-center h-[40px] hover:text-gray-50 hover:bg-gray-500 rounded-sm">
        <NavLink to={path.PUBLIC_MEMBER}>Quản lý tài khoản</NavLink>
      </div>
      <div
        onClick={() => handleLogout()}
        className="flex justify-center items-center h-[40px] hover:text-gray-50 hover:bg-gray-600"
      >
        Đăng xuất
      </div>
    </div>
  );
};

export default MenuSetting;
