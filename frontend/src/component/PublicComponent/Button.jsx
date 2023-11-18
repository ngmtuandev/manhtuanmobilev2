import React from "react";
import { Spinner } from "@material-tailwind/react";

const Button = ({ style, text, onSubmit, isLoading, type }) => {
  return (
    <div
      className={`flex ${
        type === "login" || "register"
          ? " w-[75%] rounded-md shadow-lg"
          : " w-[150px] rounded-2xl "
      } h-[35px] rounded-2xl justify-center hover:bg-opacity-90
      font-serif items-center font-medium bg-bgColorDark text-gray-100`}
    >
      <button onClick={onSubmit} className={`${isLoading && "mr-3"}`}>
        {text}
      </button>
      {isLoading ? <Spinner className="h-4 w-4" /> : ""}
    </div>
  );
};

export default Button;
