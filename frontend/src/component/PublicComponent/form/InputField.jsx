import React, { useState } from "react";

const InputField = ({ value, setValue, nameKey, type }) => {
  const [isLabel, setIsLabel] = useState(false);
  return (
    <div className="relative">
      {isLabel && (
        <div className="absolute font-serif left-4 -top-1 bg-white px-[5px]">
          <label>{nameKey}</label>
        </div>
      )}
      <input
        type={type || "text"}
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onFocus={() => {
          setIsLabel(true);
        }}
        onBlur={() => setIsLabel(false)}
        className="focus:outline-none placeholder:text-gray-500 w-[75%] border-[1px] font-serif h-[35px] rounded-md px-[15px] my-2"
        onChange={(e) =>
          setValue((data) => ({ ...data, [nameKey]: e.target.value }))
        }
      ></input>
    </div>
  );
};

export default InputField;
