import React from "react";
import { Slider } from "../../component";
import TabProduct from "./TabProduct";
import ProductNewMyShop from "../../component/PublicComponent/product/ProductNewMyShop";

const Home = () => {
  return (
    <div>
      <div className="mt-4 flex mr-2 justify-center items-center h-screen">
        <Slider></Slider>
      </div>

      <div className="-mt-36">
        <TabProduct></TabProduct>
      </div>
      <div>
        <ProductNewMyShop></ProductNewMyShop>
      </div>
    </div>
  );
};

export default Home;
