import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getApiProduct from "../../api/getApiProduct";
import BreadCumbs from "../../component/PublicComponent/breadcumb/BreadCumbs";
import Masonry from "react-masonry-css";
import ProductCard from "../../component/PublicComponent/product/ProductCard";
import SortItem from "../../component/PublicComponent/product/SortItem";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import icons from "../../untils/icons";

const ProductsCategory = () => {
  const { category } = useParams();
  const [dataProductsCategory, setDataProductsCategory] = useState([]);
  const [activeSort, setActiveSort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [colors] = useSearchParams();
  console.log(colors);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const { CiFilter } = icons;

  useEffect(() => {
    // Params want filter
    let params = [];
    for (let i of colors.entries()) {
      // entries => ['key', 'value']
      console.log(i);
      params.push(i);
    }
    console.log(params); // [[param, value], [param, value], ['color', 'đỏ']]

    // chuyển từng phẩn tử params về dạng object : {key: value}
    const queries = {};
    for (let i of params) {
      queries[i[0]] = i[1];
    }

    (async () => {
      console.log(params);
      console.log(queries);
      setIsLoading(true);
      // truyền param cho api dạng : {params : value}
      const dataRs = await getApiProduct({
        category: category,
        limit: 30,
        from: queries.from,
        to: queries.to,
        color: queries.color,
      });
      setIsLoading(false);
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
    <Fragment>
      <div className="px-main mt-5">
        <div>
          <div>
            <span className="uppercase font-serif text-colorCyanMain font-bold text-[20px]">
              {category}
            </span>
            <BreadCumbs category={category}></BreadCumbs>
          </div>
        </div>
        <div className="flex mt-2">
          <div className="w-4/5">
            <div className="text-gray-800 flex items-center font-serif">
              <span>Bộ lọc tìm kiếm </span>
              <div>
                <CiFilter size={22} color="gray"></CiFilter>
              </div>
            </div>
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
            <div className="text-gray-900 font-serif">Sort by : </div>
          </div>
        </div>

        <div className="grid-cols-4 grid -mt-[25%] gap-5">
          {dataProductsCategory &&
            dataProductsCategory?.map((item, index) => {
              return (
                <div key={index} className="">
                  <ProductCard style={"h-[450px]"} product={item}></ProductCard>
                </div>
              );
            })}
        </div>
      </div>
      {/* )} */}
    </Fragment>
  );
};

export default ProductsCategory;
