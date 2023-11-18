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
    <div className="text-gray-900 w-[100%] flex-col justify-center items-center h-auto shadow-lg border-[1px] mt-8 rounded-xl px-[8px] font-serif">
      <div>
        <TotalVote submitReiew={submitReiew} product={product}></TotalVote>
      </div>
      <div className="w-full h-full justify-center flex">
        <div>
          <div className="my-4 w-[300px] text-center justify-center">
            <Button onSubmit={handleReview} text={"Đánh giá sản phẩm"}></Button>
          </div>
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
