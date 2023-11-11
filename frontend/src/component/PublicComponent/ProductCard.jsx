import React, { useState } from "react";
import { formatMoney } from "../../untils/fnSuppport";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCard = ({ product }) => {
  const [showSelect, setShowSelect] = useState(true);
  // console.log('product >>>>>', product)
  return (
    <Link
      to={`/${product?.category.toLowerCase()}/${product?._id}/${
        product?.title
      }`}
    >
      <div className="flex-col justify-center items-center">
        <div className="relative">
          <img
            onMouseEnter={() => {
              setShowSelect(false);
            }}
            onMouseOut={() => {
              setShowSelect(true);
            }}
            src={
              product?.img.length > 0
                ? product?.thumb
                : "https://i.pinimg.com/originals/8a/b2/1b/8ab21b1edaa6d6d3405af14cd018a91b.jpg"
            }
            alt=""
          />
          <div className="absolute top-2">
            {product?.desc?.map((item, index) => {
              // 'w-[200px] hidden bg-slate-400'
              return (
                <div
                  key={index}
                  className={`w-[200px] ${showSelect && "hidden"} bg-slate-400`}
                >
                  <span className="text-[4px]">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-col justify-center items-center">
          <h3>{product?.title || <Skeleton />}</h3>
          <p>{formatMoney(product?.price) || <Skeleton />} VNĐ</p>
          <p>Đã bán : {product?.selled || <Skeleton />}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
