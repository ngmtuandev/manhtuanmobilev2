import React from "react";
import { Spinner } from "@material-tailwind/react";

const Button = ({ style, text, onSubmit, isLoading }) => {
  return (
    <div className="flex w-[150px] h-[30px] rounded-2xl justify-center items-center font-semibold bg-colorCyan text-gray-100">
      <button onClick={onSubmit} className={`${isLoading && "mr-3"}`}>
        {text}
      </button>
      {isLoading ? <Spinner /> : ""}
    </div>
  );
};

export default Button;
