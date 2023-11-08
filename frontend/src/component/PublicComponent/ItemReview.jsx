import React, { useEffect } from "react";
import { renderStarProduct } from "../../untils/fnSuppport";

const ItemReview = ({ review }) => {
  return (
    <div className="flex-col px-[20px] pb-[24px]">
      <div className="flex justify-between">
        <div className="flex ">
          <div className="w-[20px] h-[20px] rounded-full mr-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
              alt=""
            />
          </div>
          <div>
            <span className="text-gray-50 font-semibold">
              {review?.voteBy?.lastName} {review?.voteBy?.firstName}
            </span>
          </div>
        </div>
        {/* <div className="bg-red-500">time</div> */}
      </div>
      <div className="bg-gray-400 my-4 rounded-xl p-[8px] ">
        <div className="flex items-center">
          <span className="font-bold">Đánh giá :</span>
          <div className="flex ml-2">{renderStarProduct(review?.star)}</div>
        </div>
        <span className="-ml-[880px]">{review?.comment}</span>
      </div>
    </div>
  );
};

export default ItemReview;
