import React, { memo } from "react";
import TotalVote from "./TotalVote";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { acionShowModel } from "../../store/modelSlice";
const JudgeProduct = ({ product, submitReiew }) => {
  const dispatch = useDispatch();
  const handleReview = () => {
    dispatch(acionShowModel({ isShowModel: true }));
  };

  return (
    <div>
      <div>
        <TotalVote submitReiew={submitReiew} product={product}></TotalVote>
      </div>
      <div>
        <div>
          <span className="text-gray-100 font-semibold my-3">
            Bạn đánh giá sao về sản phẩm này ?
          </span>
        </div>
        <div className="my-4">
          <Button onSubmit={handleReview} text={"Đánh giá sản phẩm"}></Button>
        </div>
      </div>
      <div>reviewer</div>
    </div>
  );
};

export default memo(JudgeProduct);
