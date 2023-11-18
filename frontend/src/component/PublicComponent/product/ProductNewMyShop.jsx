import React, { useEffect, useState } from "react";
import getApiProduct from "../../../api/getApiProduct";
import TitleTop from "../header/TitleTop";
import ProductCard from "./ProductCard";
import Paginations from "../pagination/Paginations";

const ProductNewMyShop = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [dataProductInPage, setDataProductInPage] = useState([]);
  const getProducts = async () => {
    const rs = await getApiProduct({ limit: 55 });
    if (rs?.data.length > 0) {
      let startPage = (pageCurrent - 1) * 10 + 1;
      const dataPrdInPage = rs?.data?.slice(startPage, startPage + 10);
      setDataProductInPage(dataPrdInPage);
      console.log(dataProductInPage);
      setProduct(rs?.data);
    }
  };

  useEffect(() => {
    setLoading(true);
    getProducts();
    setLoading(false);
  }, [pageCurrent]);
  console.log("products >>>>", products);

  const paginate = (pageNumberChoose) => {
    setPageCurrent(pageNumberChoose);
  };

  console.log(pageCurrent);

  return (
    <div className="px-main">
      <div>
        <TitleTop text={"Sản phẩm mới"}></TitleTop>
      </div>
      {loading ? (
        <div>
          <span>loading....</span>
        </div>
      ) : (
        <div className="grid-cols-5 grid gap-4 mt-4">
          {dataProductInPage?.map((el) => {
            return (
              <div key={el?._id} className="w-[100%] h-[100%]">
                <ProductCard product={el}></ProductCard>
              </div>
            );
          })}
        </div>
      )}
      <div>
        <Paginations
          pageCurrent={pageCurrent}
          onChangePage={paginate}
          totalPrds={products?.length}
          prdsPerPage={10}
        ></Paginations>
      </div>
    </div>
  );
};

export default ProductNewMyShop;
