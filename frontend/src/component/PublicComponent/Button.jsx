import React from "react";

const Button = ({ style, text, onSubmit }) => {
  return (
    <div>
      <button
        onClick={onSubmit}
        className="w-[150px] h-[30px] rounded-2xl font-semibold bg-colorCyan text-gray-100"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
