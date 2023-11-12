import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import dataTopHeader from "../../../untils/dataTopHeader";
import { useSelector } from "react-redux";
const TopNavigate = () => {
  const [info, setInfo] = useState("");
  const { dataUser, isLoading, isLogin } = useSelector((state) => state.user);
  setTimeout(() => {
    setInfo(dataUser);
  }, 2000);
  return (
    <div className="flex flex-row justify-end gap-10 py-[10px] max-h-full">
      {dataTopHeader.map((item) => {
        return (
          <NavLink
            key={item.id}
            to={item.path}
            className="cursor-pointer hover:border-b-[1.3px]  hover:ease-in border-colorCyanDark transition 
          duration-0 hover:duration-1000"
          >
            {isLogin && item.id === 6
              ? `Xin chào ${info?.firstName} ${info?.lastName}`
              : item.value}
          </NavLink>
        );
      })}
    </div>
  );
};

export default TopNavigate;
