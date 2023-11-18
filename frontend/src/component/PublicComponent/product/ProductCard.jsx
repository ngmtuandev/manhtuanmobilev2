import React, { useState } from "react";
import { formatMoney } from "../../../untils/fnSuppport";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCard = ({ product, style }) => {
  const [showSelect, setShowSelect] = useState(true);
  console.log("product >>>>>", product);
  return (
    <Link
      to={`/${product?.category.toLowerCase()}/${product?._id}/${
        product?.title
      }`}
    >
      <div
        onMouseEnter={() => {
          setShowSelect(false);
        }}
        onMouseLeave={() => {
          setShowSelect(true);
        }}
        className={`flex-col w-[100%] h-[100%] justify-center items-center `}
      >
        <div className="relative">
          <div
            className={`w-[100%] h-[400px] p-[16px] rounded-xl shadow-xl ${
              style && style
            }`}
          >
            <div className="w-[100%] h-[200px]">
              <img
                className="object-cover"
                src={
                  product?.img.length > 0
                    ? product?.thumb
                    : "https://i.pinimg.com/originals/8a/b2/1b/8ab21b1edaa6d6d3405af14cd018a91b.jpg"
                }
                alt=""
              />
            </div>
            <div className="flex-col">
              <h3
                className={`text-gray-800 text-[20px] h-[60px]  font-serif font-medium ${
                  style && "mt-16"
                }`}
              >
                {product?.title}
              </h3>
              <p className="text-red-500 text-[19px] font-serif font-bold">
                {formatMoney(product?.price)} VNĐ
              </p>
              <div className="flex items-center my-2">
                {product?.discount > 0 && (
                  <div>
                    <p className="text-gray-600 mr-5 text-[14px] font-serif font-bold">
                      {product.discount > 1 &&
                        formatMoney(
                          (product?.price * product?.discount) / 100
                        )}{" "}
                      VNĐ
                    </p>
                  </div>
                )}
                {product?.discount > 0 ? (
                  <div className="w-[50px] h-[25px] rounded-sm border-[1px] border-red-500 flex justify-center items-center">
                    <span className="text-red-500 font-serif">
                      -{product.discount}%
                    </span>
                  </div>
                ) : (
                  <span className="font-serif text-gray-800">
                    Sản phẩm không khuyến mãi
                  </span>
                )}
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-gray-600 text-[14px] font-serif font-bold">
                  Màu sắc: {product?.color}
                </p>
                <p className="text-gray-600 text-[14px] font-serif font-bold">
                  Đã bán: {product?.selled}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute w-[100%] h-[100%] top-2">
            <div
              className={`${
                showSelect && "hidden"
              } bg-slate-400 w-[100%] rounded-xl bg-opacity-90 border-[3px] border-colorCyanMain
                   p-[8px] h-[100%] bg-gray-300`}
            >
              <div className="flex my-4 justify-center">
                <span
                  className="w-[90px] h-[35px] flex justify-center items-center rounded-xl bg-colorCyanMain text-white 
                uppercase font-serif font-bold mr-3"
                >
                  KM
                </span>
                <span className="font-serif text-[14px] font-semibold text-colorCyanMain">
                  Tặng gói bảo hành rơi vỡ trong vòng 6 tháng
                </span>
              </div>
              <div className="flex my-4 justify-center">
                <span
                  className="w-[90px] h-[35px] flex justify-center items-center rounded-xl bg-colorCyanMain text-white 
                uppercase font-serif font-bold mr-3"
                >
                  KM
                </span>
                <span className="font-serif text-[14px] font-semibold text-colorCyanMain">
                  Hỗ trợ lên đời, trả góp lãi xuất 0%
                </span>
              </div>
              <div className="flex my-4 justify-center">
                <span
                  className="w-[90px] h-[35px] flex justify-center items-center rounded-xl bg-colorCyanMain text-white 
                uppercase font-serif font-bold mr-3"
                >
                  KM
                </span>
                <span className="font-serif text-[14px] font-semibold text-colorCyanMain">
                  Thua mua máy cũ giá cao, ưu đãi lớn
                </span>
              </div>
            </div>
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
