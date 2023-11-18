import React, { memo, useEffect } from "react";
import { renderStarProduct } from "../../../untils/fnSuppport";
import icons from "../../../untils/icons";
const TotalVote = ({ product }) => {
  console.log("rating total vote  : ", product);
  const { AiFillStar } = icons;
  const fnSupportCountRating = (rating) => {
    const arrRating = product?.ratings?.filter((el) => +el.star === rating);
    // console.log("arrRating : ", arrRating);
    return arrRating?.length;
  };
  return (
    <div className="flex h-[160px]">
      <div className="w-3/6 flex justify-center flex-col items-center">
        <span className="w-[300px] text-[18px] mb-3 text-colorCyanMain font-semibold flex-wrap">
          Tổng {product?.ratings?.length} lượt đánh giá cho sản phẩm{" "}
          {product?.title}
        </span>
        <div className="flex">{renderStarProduct(4)}</div>
      </div>
      <div className="w-4/6  flex justify-center items-center">
        <div className="w-1/6 flex-col items-center justify-center mt-4">
          {Array.from(Array(5).keys()).map((el) => (
            <div key={el} className="flex items-center ml-4">
              <span className="mr-2">{el + 1}</span>
              <AiFillStar size={20} color="yellow"></AiFillStar>
            </div>
          ))}
        </div>
        <div className="w-4/6 flex-col">
          {Array.from(Array(5).keys()).map((el) => (
            <div
              key={el}
              className="relative w-[100%] mt-4 bg-gray-600 rounded-3xl h-[10px]"
            >
              <div
                className={`absolute inset-0 w-[${fnSupportCountRating(
                  el + 1
                )}0%] rounded-3xl h-[10px] bg-red-500`}
              ></div>
            </div>
          ))}
        </div>
        <div className="w-1/6 mt-3 flex-col">
          {Array.from(Array(5).keys()).map((el) => (
            <p className="mt-[2px] ">
              {fnSupportCountRating(el + 1)} lượt đánh giá
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(TotalVote);
