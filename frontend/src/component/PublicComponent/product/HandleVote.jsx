import React, { memo, useEffect, useRef, useState } from "react";
import icons from "../../../untils/icons";
import Button from "../Button";
import fetchApiRatingProduct from "../../../api/fetchAPIReviewProduct";
import { useSelector } from "react-redux";
import review from "../../../asset/review.svg";
const OPTION_VOTE = [
  {
    id: 1,
    option: "Rất tệ",
  },
  {
    id: 2,
    option: "Tệ",
  },
  {
    id: 3,
    option: "Bình thường",
  },
  {
    id: 4,
    option: "Tốt",
  },
  {
    id: 5,
    option: "Rất tốt",
  },
];

const HandleVote = ({ pid, setSubmitReview, submitReiew }) => {
  // const [chooseRating, setChooseRating] = useState(0);
  const [dataReview, setDataReview] = useState({
    rating: 0,
    review: "",
  });
  const refModel = useRef();
  const { token } = useSelector((state) => state.user);
  const { AiFillStar } = icons;
  useEffect(() => {
    refModel.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  const handleSubmitReview = async () => {
    try {
      const rs = await fetchApiRatingProduct(
        { star: dataReview.rating, comment: dataReview.review, pid: pid },
        token
      );
      console.log("data post comment : ", rs);
      if (+rs?.status === 0) {
        setSubmitReview(!submitReiew);
        console.log(submitReiew);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={refModel}
      onClick={(e) => e.stopPropagation()}
      className="w-[600px] rounded-md font-serif h-[400px] p-[12px] flex flex-col justify-center items-center gap-10 bg-gray-100"
    >
      <div>
        <img src={review} className="w-[120px]"></img>
      </div>
      <div className="flex gap-8">
        {OPTION_VOTE.map((el) => {
          return (
            <div
              onClick={() => setDataReview({ ...dataReview, rating: el.id })}
              className="flex justify-center flex-col items-center"
            >
              {+el.id <= +dataReview.rating ? (
                <AiFillStar size={24} color="yellow"></AiFillStar>
              ) : (
                <AiFillStar size={24} color="gray"></AiFillStar>
              )}
              <span className="text-gray-800">{el.option}</span>
            </div>
          );
        })}
      </div>
      <div className="w-full flex-col justify-center items-center">
        <textarea
          onChange={(e) =>
            setDataReview({ ...dataReview, review: e.target.value })
          }
          className="form-textarea text-gray-800 w-[100%]"
          placeholder="Xin mời bạn chia sẻ cảm nhận về sản phẩm"
        ></textarea>
        <div className="w-[50%] text-center justify-center">
          <Button onSubmit={handleSubmitReview} text={"Gửi đánh giá"}></Button>
        </div>
      </div>
    </div>
  );
};

export default memo(HandleVote);
