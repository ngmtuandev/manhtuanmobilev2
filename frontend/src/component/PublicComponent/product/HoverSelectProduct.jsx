import React from "react";
import icons from "../../../untils/icons";
const HoverSelectProduct = () => {
  const { AiFillHeart, FaBars, AiOutlineShoppingCart } = icons;
  return (
    <div className="absolute flex gap-5">
      <div>
        <AiFillHeart color="Red" size={25}></AiFillHeart>
      </div>
      <div>
        <FaBars color="Red" size={25}></FaBars>
      </div>
      <div>
        <AiOutlineShoppingCart color="Red" size={25}></AiOutlineShoppingCart>
      </div>
    </div>
  );
};

export default HoverSelectProduct;
