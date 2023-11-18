import React, { useState, memo } from "react";
import dataTabDetail from "../../../untils/dataTabDetail";
import JudgeProduct from "./JudgeProduct";
const TabDetailProduct = ({ product, submitReiew, setSubmitReview }) => {
  console.log("dataService", dataTabDetail);
  const [tabCurrent, setTabCurrent] = useState(1);
  const handleSetTab = (id) => {
    setTabCurrent(id);
  };
  return (
    <div className="flex-col justify-center items-center text-center pb-[20px] mt-2">
      <div className="flex justify-between">
        <div className="w-[65%] font-serif text-gray-800 bg-gray-50 shadow-lg border-[1px] rounded-md h-full">
          <div className="w-full flex-col justify-center items-center p-[12px]">
            <h3 className="w-[100%] rounded-lg text-[20px] mb-2 bg-colorCyanMain text-gray-100 h-[40px] flex justify-center items-center">
              Giới thiệu sản phẩm
            </h3>
            <span className="text-gray-800">{product?.introProducts}</span>
            <img
              className="w-[400px] h-[300px] object-cover  text-center m-4"
              src={product?.thumb}
            ></img>
          </div>
        </div>
        <div className="w-[33%] font-serif px-[8px] text-gray-800 bg-gray-50 shadow-lg border-[1px] rounded-md h-screen py-[12px]">
          <h3 className="w-[100%] rounded-lg text-[20px] mb-2 bg-colorCyanMain text-gray-100 h-[40px] flex justify-center items-center">
            Thông số kỹ thuật
          </h3>
          <div>
            {product?.desc && (
              <div dangerouslySetInnerHTML={{ __html: product?.desc[0] }} />
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <JudgeProduct
          setSubmitReview={setSubmitReview}
          submitReiew={submitReiew}
          product={product}
        ></JudgeProduct>
      </div>
    </div>
  );
};

export default memo(TabDetailProduct);
