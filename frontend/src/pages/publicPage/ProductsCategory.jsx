import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getApiProduct from "../../api/getApiProduct";
import BreadCumbs from "../../component/PublicComponent/BreadCumbs";
import Masonry from "react-masonry-css";
import ProductCard from "../../component/PublicComponent/ProductCard";
import SortItem from "../../component/PublicComponent/SortItem";
import { useSearchParams } from "react-router-dom";
const ProductsCategory = () => {
  const { category } = useParams();
  const [dataProductsCategory, setDataProductsCategory] = useState([]);
  const [activeSort, setActiveSort] = useState("");

  const [colors] = useSearchParams();
  console.log(colors);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    let params = [];
    for (let i of colors.entries()) {
      params.push(i);
    }
    console.log(params);
    const queries = {};
    for (let i of params) {
      queries[i[0]] = i[1];
    }
    (async () => {
      console.log(params);
      console.log(queries);
      const dataRs = await getApiProduct({
        category: category,
        limit: 30,
        from: queries.from,
        to: queries.to,
        color: queries.color,
      });
      if (dataRs) {
        setDataProductsCategory(dataRs?.data);
      }
    })();
  }, [category, colors]);
  console.log("setDataProductsCategory >>>>>", dataProductsCategory);

  const handleSetActiveSort = useCallback(
    (text) => {
      activeSort === text ? setActiveSort("") : setActiveSort(text);
    },
    [activeSort]
  );
  return (
    <div className="px-main mt-5">
      <div>
        <div>
          <span className="uppercase font-bold text-[20px]">{category}</span>
          <BreadCumbs category={category}></BreadCumbs>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="w-4/5 h-[400px] ">
          <div>Filter by : </div>
          <div className="flex">
            <SortItem
              onSetSort={handleSetActiveSort}
              activeSort={activeSort}
              text={"Giá"}
              type={"text"}
            ></SortItem>
            <SortItem
              onSetSort={handleSetActiveSort}
              activeSort={activeSort}
              text={"Màu sắc"}
              type={"checkbox"}
            ></SortItem>
          </div>
        </div>
        <div className="w-1/5 h-[400px] ">
          <div>Sort by : </div>
        </div>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid -mt-72"
        columnClassName="my-masonry-grid_column"
      >
        {dataProductsCategory &&
          dataProductsCategory?.map((item, index) => {
            return (
              <div key={index} className="w-[200px]">
                <ProductCard product={item}></ProductCard>
              </div>
            );
          })}
      </Masonry>
    </div>
  );
};

export default ProductsCategory;
