import React from "react";
import { NavLink } from "react-router-dom";
import dataTopHeader from "../../untils/dataTopHeader";
const TopNavigate = () => {
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
            {item.value}
          </NavLink>
        );
      })}
    </div>
  );
};

export default TopNavigate;
