import React, { useState } from "react";
import { renderStarProduct, formatMoney } from "../../untils/fnSuppport";
import HoverSelectProduct from "../../component/PublicComponent/product/HoverSelectProduct";

const ProductCardTab = ({ product }) => {
  // console.log('product >>>>', product)
  const [showSelect, setShowSelect] = useState(true);
  return (
    <div
      onMouseEnter={() => {
        setShowSelect(false);
        // console.log('set showwww >>>', showSelect)
      }}
      onMouseLeave={() => {
        setShowSelect(true);
        // console.log('set showwww out>>>', showSelect)
      }}
      className="mx-5 flex w-[100%] hover:scale-105 transition-all h-[100%]  flex-col mt-[40px]  justify-center relative items-center"
    >
      <img
        className="w-[200px] h-[250px] object-contain "
        src={
          product?.img.length > 0
            ? product?.img[0]
            : "https://i.pinimg.com/originals/8a/b2/1b/8ab21b1edaa6d6d3405af14cd018a91b.jpg"
        }
      ></img>
      {/* {!showSelect && <HoverSelectProduct></HoverSelectProduct>} */}
      <div className="">
        <h3 className="font-serif text-gray-900 text-[20px] ">
          {product?.title}
        </h3>
        <span className="font-serif text-red-600 uppercase font-semibold text-[20px] ">
          {formatMoney(product?.price)} VNĐ
        </span>
      </div>
    </div>
  );
};

export default ProductCardTab;
