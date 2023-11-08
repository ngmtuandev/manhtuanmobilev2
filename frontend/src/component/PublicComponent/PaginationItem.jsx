import React from "react";

const PaginationItem = ({ page, pageCurrent }) => {
  return (
    <div
      className={`cursor-pointer hover:text-red-500 ${
        +pageCurrent === +page && "text-red-600"
      }`}
    >
      {page}
    </div>
  );
};

export default PaginationItem;
