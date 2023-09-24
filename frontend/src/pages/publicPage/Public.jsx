import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigator, TopNavigate } from "../../component";
const Public = () => {
  return (
    <div className="text-white">
      <div className="w-full ">
        <div className="bg-colorCyan h-12 px-main">
          <TopNavigate></TopNavigate>
        </div>
        <div className=" px-main py-[16px]">
          <Header></Header>
        </div>
      </div>
      <div className="bg-gray-600 py-[20px] mt-2 rounded-xl shadow-md shadow-gray-700 mx-4">
        <Navigator></Navigator>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Public;
