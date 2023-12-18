import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import dataTopHeader from "../../../untils/dataTopHeader";
import { useSelector } from "react-redux";
const TopNavigate = () => {
  const { dataUser, isLoading, isLogin } = useSelector((state) => state.user);
  return (
    <div className="flex flex-row bg-colorCyanMain items-center justify-end gap-10 py-[10px] max-h-full">
      {dataTopHeader.map((item) => {
        return (
          <NavLink
            key={item.id}
            to={item.path}
            className="cursor-pointer hover:border-b-[1.7px] font-serif hover:ease-in border-gray-50 transition 
          duration-0 hover:duration-1000"
          >
            {isLogin && item.id === 6 ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center"
              >
                {dataUser?.avatar && (
                  <img
                    className="w-8 h-8 rounded-full border-white border-[1px] mr-2"
                    src={dataUser?.avatar}
                  ></img>
                )}
                <span>{`Xin chào, ${dataUser?.firstName} ${dataUser?.lastName}`}</span>
              </div>
            ) : (
              item.value
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default TopNavigate;
