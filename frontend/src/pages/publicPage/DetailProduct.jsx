import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getApiDetailProduct from "../../api/getApiDetailProduct";
import BreadCumbs from "../../component/PublicComponent/breadcumb/BreadCumbs";
import SliderSlick from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { formatMoney, renderStarProduct } from "../../untils/fnSuppport";
import { create } from "zustand";
import QualityProduct from "../../component/PublicComponent/product/QualityProduct";
import TabDetailProduct from "../../component/PublicComponent/product/TabDetailProduct";
import getApiProduct from "../../api/getApiProduct";
import { useSelector, useDispatch } from "react-redux";
import HandleVote from "../../component/PublicComponent/product/HandleVote";
import { acionShowModel } from "../../store/modelSlice";
const useApiCounter = create((set) => ({
  apiCallCount: 0,
  incrementApiCallCount: () =>
    set((state) => ({ apiCallCount: state.apiCallCount + 1 })),
}));

const DetailProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [imgCurrent, setImgCurrent] = useState(product?.thumb);
  const [listImgs, setListImgs] = useState([]);
  const [quality, setQuality] = useState(1);
  const [productCategory, setProductCategory] = useState([]);
  const [submitReiew, setSubmitReview] = useState(false);
  const { isShowModel } = useSelector((state) => state.model);
  const { id, name, category } = useParams();
  const { apiCallCount, incrementApiCallCount } = useApiCounter();
  useEffect(() => {
    (async () => {
      const dataProduct = await getApiDetailProduct(id);
      incrementApiCallCount();
      setProduct(dataProduct?.data);
      setTimeout(() => {
        setImgCurrent(product?.thumb);
        setListImgs(product?.img);
      }, 1000);
    })();
  }, [id, submitReiew]);

  const settings = {
    prevArrow: false,
    nextArrow: false,
    slidesToShow: 1,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
  };
  console.log("list img product current >>>>", listImgs);

  const handleQuality = useCallback(
    (isHandle) => {
      if (isHandle.toString() === "up") {
        setQuality((quality) => quality + 1);
      }
      if (isHandle === "down") {
        if (quality > 1) {
          setQuality((quality) => quality - 1);
        }
      }
    },
    [quality]
  );

  useEffect(() => {
    (async () => {
      const dataProductListCate = await getApiProduct({
        category: product?.category,
      });
      if (dataProductListCate) {
        setProductCategory(dataProductListCate?.data);
      }
    })();
    window.scrollTo(0, 0);
  }, []);

  const handleCloseModel = () => {
    dispatch(acionShowModel({ isShowModel: false }));
  };

  return (
    <div className="px-main relative h-[100%]">
      <div>
        {product?.title}
        <BreadCumbs title={name} category={category}></BreadCumbs>
      </div>

      <div className="flex mt-5 justify-center gap-8">
        <div className="w-[33%] h-screen">
          <div className="w-full p-[14px] border-gray-300 bg-slate-100 h-[500px] border-none z-50 flex justify-center items-center">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "product",
                  isFluidWidth: true,
                  src: imgCurrent || product?.thumb,
                },
                largeImage: {
                  src: imgCurrent,
                  width: 800,
                  height: 800,
                },
              }}
            />
          </div>
          <div className=" mt-4 ">
            <SliderSlick {...settings}>
              {listImgs
                ? listImgs?.map((el) => {
                    return (
                      <div
                        onClick={() => setImgCurrent(el)}
                        className=" w-[150px] flex justify-center items-center 
                h-[150px] overflow-hidden"
                      >
                        <img className="object-cover mx-4" src={el}></img>
                      </div>
                    );
                  })
                : product?.img?.map((el) => {
                    return (
                      <div
                        onClick={() => setImgCurrent(el)}
                        className=" w-[150px] flex justify-center items-center 
                h-[150px] overflow-hidden"
                      >
                        <img className="object-cover mx-4" src={el}></img>
                      </div>
                    );
                  })}
            </SliderSlick>
          </div>
        </div>
        <div className="w-[40%] h-screen ">
          <div>
            <h3 className="font-semibold text-[40px]">{product?.title}</h3>
          </div>
          <div>
            <span>Lượt xem : {apiCallCount}</span>
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-bold text-red-600 text-[40px]">
                {formatMoney(product?.price)} VNĐ
              </span>
              <span className="border-l-[1px] ml-3 pl-[10px]">
                Giá đã bao gồm VAT
              </span>
            </div>
            <span>
              {product?.discount > 0
                ? formatMoney((product?.price * product?.discount) / 100)
                : "Sản phẩm không thuộc chương trình khuyến mãi"}
            </span>
          </div>
          <div className="flex mt-2 gap-2">
            {renderStarProduct(product?.ratings?.length || 3)}
          </div>
          <div>
            {product?.desc && (
              <div dangerouslySetInnerHTML={{ __html: product?.desc[0] }} />
            )}
          </div>
          <div>
            <QualityProduct
              quality={quality}
              handleQuality={handleQuality}
            ></QualityProduct>
          </div>
          <div>
            {product?.variants?.length > 0 && (
              <div className="flex ml-4 flex-wrap items-center gap-4">
                {product?.variants?.map((el) => {
                  return (
                    <div
                      onClick={() => {
                        setImgCurrent(el?.thumb);
                        setListImgs(el?.images);
                      }}
                      className="cursor-pointer hover:bg-opacity-70 w-[200px] h-[100px] flex justify-center items-center bg-gray-300 rounded-md"
                      key={el?.id}
                    >
                      <img className="w-[50px]" src={el?.thumb}></img>
                      <span className="text-black font-bold">{el?.title}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="w-[23%] h-screen bg-slate-600">info shop</div>
      </div>
      <div className="mt-32">
        <TabDetailProduct
          submitReiew={submitReiew}
          setSubmitReview={setSubmitReview}
          product={product}
        ></TabDetailProduct>
      </div>
      <div className="mt-10 h-[500px]">
        <SliderSlick {...settings}>
          {productCategory?.map((el) => {
            return (
              <div
                key={el?._id}
                className="cursor-pointer w-[100px] flex justify-center items-center 
                h-[350px] overflow-hidden"
              >
                <img className="w-[80%]" src={el?.img[0]}></img>
                <p>{el?.title}</p>
              </div>
            );
          })}
        </SliderSlick>
      </div>
      {isShowModel && (
        <div
          onClick={handleCloseModel}
          className="w-[100%] h-[100%] flex justify-center items-center z-100 absolute inset-0 bg-gray-600 bg-opacity-30 -mt-[200px]"
        >
          <HandleVote
            submitReiew={submitReiew}
            setSubmitReview={setSubmitReview}
            pid={id}
          ></HandleVote>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
