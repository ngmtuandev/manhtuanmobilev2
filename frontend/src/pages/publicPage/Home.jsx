import React, { useEffect } from "react";
import { Slider } from "../../component";
// import Service from "./Service";
import TabProduct from "./TabProduct";
import ProductNewMyShop from "../../component/PublicComponent/product/ProductNewMyShop";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { messExpiToken } = useSelector((state) => state.user);
  const navigation = useNavigate();
  useEffect(() => {
    if (messExpiToken !== "") {
      swal({
        title: "Phiên đăng nhập hết hạn !",
        text: "Vui lòng quay lại đăng nhập để tiếp tục sử dụng dịch vụ",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          navigation("/login");
        }
      });
    }
  });
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
      <div>
        <ProductNewMyShop></ProductNewMyShop>
      </div>
    </div>
  );
};

export default Home;
