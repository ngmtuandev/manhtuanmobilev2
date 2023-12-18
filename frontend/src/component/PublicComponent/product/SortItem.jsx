import React, { useEffect, useState } from "react";
import { memo } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";

const COLORS = ["Đỏ", "Vàng", "Đen", "Tím", "Nâu", "Trắng"];

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
      <div className="w-[100px] cursor-pointer text-gray-50 rounded-sm my-2 font-serif bg-colorCyanMain h-[30px] mr-2 flex justify-center items-center">
        <span>{text}</span>
      </div>
      {activeSort === text && (
        <div className="absolute w-[160px] bg-opacity-80 font-serif p-[8px] z-10 mt-1 gap-4 text-black">
          {type === "checkbox" && (
            <div className="w-[170px] shadow-sm p-[16px] bg-gray-300 rounded-sm">
              <div className="flex">
                <span>{totalSelectedColor?.length}</span>
                <span
                  className="cursor-pointer ml-2"
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
            <div
              className="flex gap-3 w-[500px] bg-gray-300 items-center rounded-sm py-[12px] px-[8px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-1 w-[300px] shadow-lg rounded-lg">
                <input
                  className="w-[100%] font-serif text-gray-700 border-none rounded-sm"
                  onChange={(e) =>
                    setRangePrice({ ...rangePrice, from: e.target.value })
                  }
                  onClick={(e) => e.stopPropagation()}
                  type="number"
                  value={rangePrice.from}
                ></input>
              </div>
              <div>
                <span className="font-serif text-gray-700 font-medium">
                  Đến
                </span>
              </div>
              <div className="mb-1 w-[300px] shadow-lg rounded-lg">
                <input
                  className="w-[100%] font-serif text-gray-700 border-none rounded-sm"
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
