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
import useCart from "../../hook/hook-cart/useCart";
import apiAddCart from "../../api/apicart/apiAddCart";
import withHocBase from "../../hocs/withHocBase";
import swal from "sweetalert";
import actionTypeAsyncLogin from "../../store/actionTypeAsyncLogin";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const useApiCounter = create((set) => ({
  apiCallCount: 0,
  incrementApiCallCount: () =>
    set((state) => ({ apiCallCount: state.apiCallCount + 1 })),
}));

const DetailProduct = ({ dispatch }) => {
  const [product, setProduct] = useState([]);
  const [imgCurrent, setImgCurrent] = useState(product?.thumb);
  const [priceCurrent, setPriceCurrent] = useState(undefined);
  const [titleCurrent, setTitleCurrent] = useState(undefined);
  const [colorCurrent, setColorCurrent] = useState(undefined);
  const [showMore, setShowMore] = useState(false);
  const [listImgs, setListImgs] = useState([]);
  const [quality, setQuality] = useState(1);
  const [productCategory, setProductCategory] = useState([]);
  const [submitReiew, setSubmitReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isShowModel } = useSelector((state) => state.model);
  const { id, name, category } = useParams();
  const { apiCallCount, incrementApiCallCount } = useApiCounter();

  const { addCart } = useCart();

  useEffect(() => {
    (async () => {
      const dataProduct = await getApiDetailProduct(id);
      incrementApiCallCount();
      setProduct(dataProduct?.data);
      setLoading(false);
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

  const handleAddCart = async () => {
    if (colorCurrent || titleCurrent) {
      const dataProduct = {
        quanlity: quality || 1,
        color: colorCurrent,
        price: priceCurrent ? priceCurrent : product.price,
        thumb: imgCurrent,
        title: titleCurrent,
      };
      const rs = await apiAddCart(dataProduct, product?._id);
      console.log("rs add cart", rs);
      if (+rs.status === 0) {
        dispatch(actionTypeAsyncLogin());
        swal("Thêm sản phẩm vào giỏ hàng thành công");
      }
    } else {
      const dataProduct = {
        quanlity: quality || 1,
        color: product.color,
        price: product.price,
        thumb: product.thumb,
        title: product.title,
      };

      const rs = await apiAddCart(dataProduct, product?._id);
      if (+rs.status === 0) {
        dispatch(actionTypeAsyncLogin());
        swal("Thêm sản phẩm vào giỏ hàng thành công");
      }
    }
  };

  return (
    <div className="px-main relative h-[100%]">
      <div>
        {product?.title}
        <BreadCumbs title={name} category={category}></BreadCumbs>
      </div>
      {/* {loading && <Skeleton />} */}
      <div className="flex mt-5 justify-center text-gray-900 font-serif gap-14">
        <div className="w-[35%] h-screen">
          <div className="w-[100%] border-[3px] p-[8px] rounded-md border-colorCyanLV6 h-[500px] z-50 flex justify-center items-center">
            {loading ? (
              <Skeleton width={"400px"} height={"480px"} />
            ) : (
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
            )}
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
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <img
                            className="object-cover skeleton mx-4"
                            src={el}
                          ></img>
                        )}
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
        <div className="w-[40%] -mt-2 h-screen ">
          <div>
            <h3 className={`font-semibold text-gray-600 text-[35px]`}>
              {loading ? <Skeleton /> : product?.title}
            </h3>
          </div>
          <div className="mb-2 flex justify-between text-gray-600">
            <p>Lượt xem : {loading ? <Skeleton /> : product?.see}</p>
            <p className="mr-8">Đã bán : {product?.selled}</p>
          </div>
          <div>
            {loading ? (
              <Skeleton />
            ) : (
              <div className="flex w-[95%] px-[8px] bg-gray-100 bg-opacity-80 rounded-md items-center">
                <span className="font-bold text-red-500 text-[32px]">
                  {priceCurrent
                    ? formatMoney(priceCurrent)
                    : formatMoney(product?.price)}{" "}
                  VNĐ
                </span>
                <span className="border-l-[1px] border-gray-600 ml-3 pl-[10px]">
                  Giá đã bao gồm VAT
                </span>
              </div>
            )}
            <div className="mt-2">
              {product?.discount > 0 ? (
                <div className="flex items-center">
                  {" "}
                  <span className="text-[20px] mr-2 text-gray-700 font-semibold">
                    Giảm còn:{" "}
                  </span>
                  <span className="text-[20px] text-red-600 font-bold">
                    {formatMoney(
                      (+product.price * product?.discount ||
                        +priceCurrent * product?.discount) / 100
                    )}{" "}
                    {"VNĐ"}
                  </span>
                  <div className="w-[40px] ml-3 h-[20px] flex justify-center items-center border-[1px] rounded-md border-red-500">
                    <span className="text-[12px] text-red-600">
                      - {product?.discount} %
                    </span>
                  </div>
                </div>
              ) : (
                "Sản phẩm không thuộc chương trình khuyến mãi"
              )}
            </div>
          </div>
          <div className="flex mt-2 gap-2">
            {renderStarProduct(product?.ratings?.length || 3)}
          </div>
          {loading ? (
            <Skeleton height={"100px"} />
          ) : (
            <div className="mt-2">
              {product?.introProducts && (
                <div>
                  {product?.introProducts?.length > 200 ? (
                    <div>
                      {showMore ? (
                        <span className="text-[15px] text-gray-700">
                          {product?.introProducts}
                        </span>
                      ) : (
                        <span className="text-[15px] text-gray-700">
                          {product?.introProducts.slice(0, 200)}...
                        </span>
                      )}
                      <div
                        onClick={() => setShowMore(!showMore)}
                        className="w-[80px] h-[30px] cursor-pointer hover:bg-opacity-75 flex justify-center items-center bg-colorCyanMain
                    my-2 text-gray-100 rounded-sm"
                      >
                        {showMore ? "Ẩn bớt" : "Xem thêm"}
                      </div>
                    </div>
                  ) : (
                    product?.introProducts
                  )}
                </div>
              )}
            </div>
          )}
          {/* <div className="mt-2">
            {product?.desc && (
              <div dangerouslySetInnerHTML={{ __html: product?.desc[0] }} />
            )}
          </div> */}
          <div>
            <span className="font-bold text-gray-700">
              Màu : {colorCurrent ? colorCurrent : product?.color}
            </span>
          </div>
          {/* <div>
            <QualityProduct
              quality={quality}
              handleQuality={handleQuality}
            ></QualityProduct>
          </div> */}
          <div>
            {product?.variants?.length > 0 && (
              <div className="flex mt-2 flex-wrap items-center gap-4">
                {product?.variants?.map((el) => {
                  return (
                    <div
                      onClick={() => {
                        setPriceCurrent(el?.price);
                        setImgCurrent(el?.thumb);
                        setListImgs(el?.images);
                        setTitleCurrent(el?.title);
                        setColorCurrent(el?.color);
                      }}
                      className="cursor-pointer hover:bg-opacity-70 w-[200px] h-[80px] flex justify-center 
                      items-center bg-gray-200 rounded-md px-[10px]"
                      key={el?.id}
                    >
                      <img
                        className="w-[60px] h-[60px] object-contain"
                        src={el?.thumb}
                      ></img>
                      <div className="flex-col ml-2">
                        <p className="text-gray-600 text-[14px] font-bold">
                          {el?.title}
                        </p>
                        <p className="text-gray-600 text-[12px] font-bold">
                          {formatMoney(el?.price)} VNĐ
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <button
              onClick={handleAddCart}
              className="uppercase w-[300px] h-[50px] text-gray-100 text-[20px] hover:bg-opacity-90 bg-gray-800 rounded-md mt-6"
            >
              Mua ngay
            </button>
          </div>
        </div>
        <div className="w-[20%] h-screen bg-slate-600">
          <div
            className="w-[100%] rounded-md flex-col justify-center items-center h-[100px]
          pt-[4px] px-[8px] bg-colorCyanMain bg-opacity-70"
          >
            <h3 className="text-gray-50 my-2 uppercase">
              Đăng ký để được tư vấn
            </h3>
            <div>
              <div className="w-[70%] h-[40px] ">
                <input
                  className="outline-none focus:outline-none rounded-md"
                  placeholder="Tư vấn qua số điện thoại"
                ></input>
              </div>
            </div>
          </div>
          <div
            className="w-[100%] rounded-md flex-col justify-center items-center
          py-[8px] mt-9 px-[8px] border-[1px]"
          >
            <h3 className="text-colorCyanMain font-semibold my-2 uppercase">
              Chính sách bán hàng
            </h3>
            <div className="text-gray-700">
              <p>Miễn phí giao hàng cho đơn hàng từ 5 triệu</p>
              <p>Hỗ trợ trả góp lãi xuất thấp cho sinh viên</p>
              <p>Bảo hành 6 tháng đối với sản phẩm mới</p>
              <p>Bảo hành 3 tháng đối với sản phẩm cũ</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <TabDetailProduct
          submitReiew={submitReiew}
          setSubmitReview={setSubmitReview}
          product={product}
        ></TabDetailProduct>
      </div>
      {/* <div className="mt-10 h-[500px]">
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
      </div> */}
      {isShowModel && (
        <div
          onClick={handleCloseModel}
          className="w-[100%] h-[100%] p-[12px] flex justify-center items-center z-100 absolute inset-0 bg-gray-600 bg-opacity-30 -mt-[200px]"
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

export default withHocBase(DetailProduct);
