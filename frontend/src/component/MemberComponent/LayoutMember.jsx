import React from "react";
import TabMember from "./TabMember";
import HomeMember from "./HomeMember.1";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const LayoutMember = () => {
  return (
    <div className="w-full flex bg-white">
      <div className="w-[25%] h-screen bg-gray-400">
        <TabMember></TabMember>
      </div>
      <div className="w-[75%] h-full ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default LayoutMember;
