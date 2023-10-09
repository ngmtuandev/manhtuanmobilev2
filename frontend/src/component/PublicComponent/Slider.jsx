import React, { useEffect, useState } from "react";
import SliderSlick from "react-slick";
// import "../styleCss/slicer.css"; 
import {Spinner} from "@material-tailwind/react"

const Slider = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [imgSliders, setImgSliders] = useState([]);
  let urlApiProduct = 'http://localhost:5000/api/product/all-product';

  const getProduct = async () => {
  setIsLoading(true)
    const rs = await fetch(urlApiProduct);
    const imgs = await rs.json();
    // console.log('data >>>', imgs)
    setImgSliders(imgs?.data);
    setIsLoading(false)
  };

  useEffect(() => {
    getProduct();
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
      {
        !isLoading ? <SliderSlick {...settings}>
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
      </SliderSlick> : <Spinner color="purple" className="h-16 w-16 text-cyan-400/50 ml-[50%]" /> 
      }
    </div> 
  
    
  );
};

export default Slider;
