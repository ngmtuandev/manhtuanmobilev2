import React from "react";
import icons from "../../untils/icons";
const Header = () => {
  const { BsSearch, AiOutlineShoppingCart, BsFillCarFrontFill } = icons;
  return (
    <div className="flex justify-between items-center">
      <div>
        <span className="text-colorCyanDark text-[18px] font-semibold">
          Nhật Huy Mobile
        </span>
      </div>
      <div className="relative">
        <input
          className="w-[500px] h-[40px] rounded-3xl outline-none px-[12px] text-colorBlackDark text-[14px]"
          placeholder="Bạn muốn tìm sản phẩm gì ?"
        ></input>
        <div
          className="absolute top-0 right-0 w-[40px] cursor-pointer h-[40px] bg-colorCyan bg-opacity-60
           hover:bg-opacity-80 hover:w-[80px]
        rounded-full flex justify-center items-center shadow-2xl"
        >
          <BsSearch size={16} color="black"></BsSearch>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center p-[6px] px-[10px] bg-colorCyan mr-3 rounded-xl">
          <BsFillCarFrontFill size={33}></BsFillCarFrontFill>
          <span className="w-[60px] text-[12px] block ml-2">
            Kiểm tra đơn hàng
          </span>
        </div>
        <div>
          <AiOutlineShoppingCart size={35}></AiOutlineShoppingCart>
        </div>
      </div>
    </div>
  );
};

export default Header;
