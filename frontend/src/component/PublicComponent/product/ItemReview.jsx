import React, { useEffect } from "react";
import { renderStarProduct } from "../../../untils/fnSuppport";

const ItemReview = ({ review }) => {
  return (
    <div className="flex-col font-serif text-gray-800 px-[20px] pb-[24px]">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="w-[40px] h-[40px] border-[1px] rounded-full mr-2">
            {review?.voteBy?.avatar ? (
              <img
                className="w-full h-full object-cover rounded-full"
                src={review?.voteBy?.avatar}
                alt=""
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
                alt=""
              />
            )}
          </div>
          <div className="flex-col">
            <p className="text-gray-700 text-[18px] font-semibold">
              {review?.voteBy?.lastName} {review?.voteBy?.firstName}
            </p>
          </div>
        </div>
        {/* <div className="bg-red-500">time</div> */}
      </div>
      <div className="bg-gray-100 min-h-[100px] my-4 rounded-sm p-[8px] ">
        <div className="flex items-center">
          <span className="font-bold text-colorCyanMain">Đánh giá :</span>
          <div className="flex ml-2">{renderStarProduct(review?.star)}</div>
        </div>
        <div className="flex justify-start">
          <p className="justify-start mt-2">{review?.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemReview;
