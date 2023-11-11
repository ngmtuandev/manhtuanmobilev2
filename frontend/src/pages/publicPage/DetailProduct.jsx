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
  const [quality, setQuality] = useState(1);
  const [productCategory, setProductCategory] = useState([]);
  const [submitReiew, setSubmitReview] = useState(false);
  // const [totalView, setTotalView] = useState(0)
  const { isShowModel } = useSelector((state) => state.model);
  const { token } = useSelector((state) => state.user);
  const { id, name, category } = useParams();
  console.log("imgCurrent : ", product?.thumb);
  console.log("toekn : ", token);
  const { apiCallCount, incrementApiCallCount } = useApiCounter();
  console.log("submitReiew : ", submitReiew);
  useEffect(() => {
    (async () => {
      const dataProduct = await getApiDetailProduct(id);
      incrementApiCallCount();
      setProduct(dataProduct?.data);
      setImgCurrent(product?.thumb);
    })();
  }, [id, submitReiew]);

  const settings = {
    prevArrow: false,
    nextArrow: false,
    slidesToShow: 3,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
  };
  console.log("product current >>>>", product);

  const handleQuality = useCallback(
    (isHandle) => {
      // console.log(isHandle);
      // return;
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
    console.log("isShowModel after : ", isShowModel);
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
            {/* <img src={imgCurrent}></img> */}
          </div>
          <div className=" mt-4 ">
            <SliderSlick {...settings}>
              {product?.img?.map((el) => {
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
        </div>
        <div className="w-[23%] h-screen bg-slate-600">info shop</div>
      </div>
      <div className="mt-20">
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
                className=" w-[100px] flex justify-center items-center 
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
