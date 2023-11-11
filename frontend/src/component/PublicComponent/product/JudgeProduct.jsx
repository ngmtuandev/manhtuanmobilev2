import React, { memo, useEffect, useState } from "react";
import TotalVote from "./TotalVote";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { acionShowModel } from "../../../store/modelSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ItemReview from "./ItemReview";
const JudgeProduct = ({ product, submitReiew, setSubmitReview }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [totalReview, setTotalReview] = useState([]);
  // console.log(product);
  useEffect(() => {
    setTotalReview(product?.ratings);
  }, [product]);
  // console.log("review : ", totalReview);
  const handleReview = () => {
    if (!token) {
      // console.log(location);
      navigate("/login", { state: location });
    } else {
      setSubmitReview(!submitReiew);
      console.log("submitReiew: ", submitReiew);
      dispatch(acionShowModel({ isShowModel: true }));
    }
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
      <div>
        {totalReview &&
          totalReview?.map((el) => {
            return (
              <div key={el?._id}>
                <ItemReview submitReiew={submitReiew} review={el}></ItemReview>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(JudgeProduct);
