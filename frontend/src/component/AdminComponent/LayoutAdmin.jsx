import React, { Fragment } from "react";
import SilderBarAdmin from "./SilderBarAdmin";

const LayoutAdmin = () => {
  return (
    <div className="w-screen h-screen flex bg-gray-100">
      <div className="w-[20%] ">
        <SilderBarAdmin></SilderBarAdmin>
      </div>
      <div className="w-[80%] ">Right</div>
    </div>
  );
};

export default LayoutAdmin;
