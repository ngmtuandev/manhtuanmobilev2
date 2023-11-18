import React from "react";
import { Outlet } from "react-router-dom";
import { Header, TopNavigate, Navigator } from "../../component";
import { Footer } from "../../component/PublicComponent/footer/Footer";
const Public = () => {
  return (
    <div className="text-white">
      <div className="w-full bg-colorCyanMain">
        <div className="bg-colorCyanMain fixed w-[100%] z-50 h-12 px-main">
          <TopNavigate></TopNavigate>
        </div>
        <div className=" px-main py-[14px]">
          <Header></Header>
        </div>
      </div>
      <div className="bg-gray-600 py-[10px] mt-2 rounded-sm mx-2">
        <Navigator></Navigator>
      </div>
      <Outlet></Outlet>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Public;
