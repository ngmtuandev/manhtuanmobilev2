import React, { useEffect, useState } from "react";
import SliderSlick from "react-slick";
import useProduct from "../../hook/hook-product/useProduct";
import { Spinner } from "@material-tailwind/react";
import getApiProduct from "../../api/getApiProduct";
const Slider = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgSliders, setImgSliders] = useState([]);

  const { isLoadingProduct, products } = useProduct();

  console.log("products react query >>>>>", products);

  // const getProduct = async () => {
  //   setIsLoading(true);
  //   const rs = await getApiProduct({ limit: 5 });

  //   setImgSliders(rs?.data);
  //   setIsLoading(false);
  // };

  useEffect(() => {
    setImgSliders(products);
  }, []);

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
      {!isLoadingProduct ? (
        <SliderSlick {...settings}>
          {imgSliders?.map((el, index) => {
            return (
              <div key={index}>
                <img
                  className="object-fill w-full h-[400px]"
                  src={el?.img[index]}
                  alt=""
                />
              </div>
            );
          })}
        </SliderSlick>
      ) : (
        <Spinner
          color="purple"
          className="h-16 w-16 text-cyan-400/50 ml-[50%]"
        />
      )}
    </div>
  );
};

export default Slider;
