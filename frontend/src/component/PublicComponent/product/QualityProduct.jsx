import React, { memo } from "react";

const QualityProduct = ({ quality, handleQuality }) => {
  return (
    <div className="flex items-center">
      <div
        className="text-[35px] mr-3 cursor-pointer"
        onClick={() => handleQuality("down")}
      ></div>
      <div>
        <input
          className="w-[40px] text-black flex justify-center outline-none items-center"
          value={quality}
        ></input>
      </div>
      <div
        className="text-[35px] ml-3 cursor-pointer"
        onClick={() => handleQuality("up")}
      >
        +
      </div>
    </div>
  );
};

export default memo(QualityProduct);
