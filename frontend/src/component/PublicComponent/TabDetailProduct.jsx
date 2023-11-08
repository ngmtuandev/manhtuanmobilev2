import React, { useState, memo } from "react";
import dataTabDetail from "../../untils/dataTabDetail";
import JudgeProduct from "./JudgeProduct";
const TabDetailProduct = ({ product, submitReiew, setSubmitReview }) => {
  console.log("dataService", dataTabDetail);
  const [tabCurrent, setTabCurrent] = useState(1);
  const handleSetTab = (id) => {
    setTabCurrent(id);
  };
  return (
    <div className="flex-col justify-center items-center text-center pb-[20px] mt-2">
      <div className="flex justify-center items-center">
        {dataTabDetail?.map((item) => {
          return (
            <div
              className={`mr-4 ${
                tabCurrent === item?.id ? "text-colorCyan" : "text-white"
              } cursor-pointer`}
              onClick={() => handleSetTab(item?.id)}
              key={item?.id}
            >
              <p>{item?.name}</p>
            </div>
          );
        })}
      </div>
      <div className="bg-gray-800 mt-4 min-h-[200px]">
        <span className="text-gray-900">
          {tabCurrent === 6 ? (
            <JudgeProduct
              setSubmitReview={setSubmitReview}
              submitReiew={submitReiew}
              product={product}
            ></JudgeProduct>
          ) : (
            dataTabDetail.filter((item) => item?.id === tabCurrent)[0].data
          )}
        </span>
      </div>
    </div>
  );
};

export default memo(TabDetailProduct);
