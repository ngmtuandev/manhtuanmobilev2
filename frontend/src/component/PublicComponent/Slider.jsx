import React, { useEffect, useState } from "react";
import SliderSlick from "react-slick";
import useProduct from "../../hook/hook-product/useProduct";
import { Spinner } from "@material-tailwind/react";
import imgBanner from "../../asset/banner";
const Slider = () => {
  const settings = {
    prevArrow: false,
    nextArrow: false,
    slidesToShow: 1,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
  };

  return (
    <div className="w-[96%] -mt-44 relative p-[10px] rounded-md ">
      <SliderSlick {...settings}>
        {imgBanner?.map((el, index) => {
          return (
            <div key={index}>
              <img className="object-fill w-full h-[400px]" src={el} alt="" />
            </div>
          );
        })}
      </SliderSlick>
    </div>
  );
};

export default Slider;
