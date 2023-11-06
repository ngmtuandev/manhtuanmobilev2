import React, { useEffect, useState } from "react";
import { memo } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../../untils/fnSuppport";

const COLORS = ["red", "yellow", "white", "black", "brown", "purple"];

const SortItem = ({ text, activeSort, onSetSort, type }) => {
  const [totalSelectedColor, setTotalSelectedColor] = useState([]);
  const [rangePrice, setRangePrice] = useState({
    from: 0,
    to: 0,
  });

  const navigate = useNavigate();
  const { category } = useParams();
  const handleCheckbox = (value) => {
    const checkValueExit = totalSelectedColor.find((item) => item === value);
    if (checkValueExit) {
      console.log("tồn tại");
      setTotalSelectedColor(
        totalSelectedColor.filter((item) => item !== value)
      );
    } else {
      console.log("chưa tồn tại");
      setTotalSelectedColor([...totalSelectedColor, value]);
    }
    onSetSort(null);
  };
  console.log("totalSelectedColor", totalSelectedColor);

  useEffect(() => {
    navigate({
      pathname: `/products/${category}`,
      search: createSearchParams({
        color: totalSelectedColor,
      }).toString(),
    });
  }, [totalSelectedColor]);

  useEffect(() => {
    const price = {};
    if (rangePrice.from > 0) price.from = rangePrice.from;
    if (rangePrice.to > 0) price.to = rangePrice.to;
    navigate({
      pathname: `/products/${category}`,
      search: createSearchParams(price).toString(),
    });
  }, [rangePrice]);

  return (
    <div
      className="relative"
      onClick={() => {
        onSetSort(text);
      }}
    >
      <div className="w-[100px] cursor-pointer h-[30px] border-gray-200 border-[2px] mr-2 flex justify-center items-center">
        <span>{text}</span>
      </div>
      {activeSort === text && (
        <div className="absolute z-10 mt-1 shadow-xl w-[300px] h-[200px] bg-white text-black">
          {type === "checkbox" && (
            <div>
              <div className="flex">
                <span>{totalSelectedColor?.length}</span>
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTotalSelectedColor([]);
                  }}
                >
                  Reset
                </span>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                {COLORS.map((item, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="checkbox"
                        value={item}
                        id={item}
                        onChange={() => handleCheckbox(item)}
                        className="form-checkbox mr-2"
                        checked={totalSelectedColor?.some(
                          (value) => value === item
                        )}
                      ></input>
                      <label htmlFor={item}>{item}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {type === "text" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div>
                <label></label>
                <input
                  onChange={(e) =>
                    setRangePrice({ ...rangePrice, from: e.target.value })
                  }
                  onClick={(e) => e.stopPropagation()}
                  type="number"
                  value={rangePrice.from}
                ></input>
              </div>
              <div>
                <label></label>
                <input
                  value={rangePrice.to}
                  onChange={(e) =>
                    setRangePrice({ ...rangePrice, to: e.target.value })
                  }
                  onClick={(e) => e.stopPropagation()}
                  type="number"
                ></input>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SortItem);
