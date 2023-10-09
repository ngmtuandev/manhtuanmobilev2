import React from "react";
import { Slider } from "../../component";
// import Service from "./Service";
import TabProduct from "./TabProduct";
const Home = () => {
  return (
   
    <div>
      <div className="mt-4 min-w-full flex justify-center items-center h-screen">
        <Slider></Slider>
      </div>
      {/* <div className="-mt-36 overflow-hidden w-screen px-[10px]">
       <Service></Service>
      </div> */}
      <div className="-mt-36">
        <TabProduct></TabProduct>
      </div>
    </div>
  );
};

export default Home;
