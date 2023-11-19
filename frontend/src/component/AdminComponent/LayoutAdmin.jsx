import React, { Fragment } from "react";
import SilderBarAdmin from "./SilderBarAdmin";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="w-screen h-[1000px] font-serif flex bg-gray-100">
      <div className="w-[20%] ">
        <SilderBarAdmin></SilderBarAdmin>
      </div>
      <div className="w-[80%] ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default LayoutAdmin;
