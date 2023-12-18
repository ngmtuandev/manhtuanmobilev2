import React, { useState, useCallback } from "react";
import TitleTop from "../header/TitleTop";
import ProductCard from "./ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import useProduct from "../../../hook/hook-product/useProduct";
import PaginationNewVersion from "../pagination/PaginationNewVersion";
const ProductNewMyShop = () => {
  const [page, setPage] = useState(1);
  const { products: prd } = useProduct({ page, limit: 3 });
  const handlePage = useCallback(
    (cur) => {
      setPage(cur);
    },
    [page]
  );
  return (
    <div className="px-main">
      <div>
        <TitleTop text={"Sản phẩm mới"}></TitleTop>
      </div>
      <div className="grid-cols-5 grid gap-4 mt-4">
        {prd?.data?.map((el) => {
          return (
            <div key={el?._id} className="w-[100%] h-[100%]">
              <ProductCard product={el}></ProductCard>
            </div>
          );
        })}
      </div>
      <div>
        <PaginationNewVersion
          page={page}
          onPage={handlePage}
          total={Math.ceil(prd?.count / 3)}
        ></PaginationNewVersion>
      </div>
    </div>
  );
};

export default ProductNewMyShop;
