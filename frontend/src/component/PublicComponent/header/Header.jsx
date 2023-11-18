import React, { useState, useEffect } from "react";
import icons from "../../../untils/icons";
import { useSelector } from "react-redux";
import { logout } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MenuSetting from "./MenuSetting";
import { useNavigate } from "react-router-dom";
import path from "../../../untils/path";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, dataUser } = useSelector((state) => state.user);
  const [isSetting, setIsSetting] = useState(false);
  const {
    BsSearch,
    AiOutlineShoppingCart,
    CiDeliveryTruck,
    FiPhone,
    AiOutlineFileProtect,
    CiShoppingCart,
    CiSettings,
  } = icons;
  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <div className="flex mt-9 bg-colorCyanMain justify-between items-center">
      <div>
        <span className="text-white text-[35px] font-serif uppercase font-bold">
          Mạnh Tuấn
        </span>
      </div>
      <div className="relative shadow-lg">
        <input
          className="w-[500px] h-[40px] placeholder:font-serif rounded-md outline-none px-[12px] text-colorBlackDark text-[14px]"
          placeholder="Bạn muốn tìm sản phẩm gì ?"
        ></input>
        <div
          className="absolute top-0 right-0 w-[50px] cursor-pointer h-[40px] bg-colorCyanMain bg-opacity-60
          flex justify-center items-center shadow-2xl"
        >
          <BsSearch size={16} color="white"></BsSearch>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        {!isLogin && (
          <div className="flex gap-2 justify-center items-center">
            <div className="w-[40px] h-[40px] border-[1px] rounded-md flex justify-center items-center">
              <FiPhone size={20}></FiPhone>
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-medium font-serif">
                Gọi mua hàng
              </span>
              <span className="text-[13px] font-medium font-serif">
                036.307.3476
              </span>
            </div>
          </div>
        )}
        {!isLogin && (
          <div className="flex gap-2 justify-center items-center">
            <div className="w-[40px] h-[40px] border-[1px] rounded-md flex justify-center items-center">
              <AiOutlineFileProtect size={20}></AiOutlineFileProtect>
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-medium font-serif">
                Chích sách bảo hành
              </span>
              <span className="text-[13px] font-medium font-serif">
                Dịch vụ khách hàng
              </span>
            </div>
          </div>
        )}
        {isLogin && (
          <div className="flex gap-2 justify-center items-center">
            <div className="w-[40px] h-[40px] border-[1px] rounded-md flex justify-center items-center">
              <CiDeliveryTruck size={20}></CiDeliveryTruck>
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-medium font-serif">
                Kiểm tra
              </span>
              <span className="text-[15px] font-medium font-serif">
                đơn hàng
              </span>
            </div>
          </div>
        )}
        {isLogin && (
          <div
            onClick={() =>
              navigate(`${path.PUBLIC_MEMBER}${path.MANAGE_CART_MEMBER}`)
            }
            className="flex gap-2 justify-center items-center"
          >
            <div className="w-[40px] h-[40px] border-[1px] rounded-md flex justify-center items-center">
              <CiShoppingCart size={20}></CiShoppingCart>
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-medium font-serif">
                Giỏ hàng
              </span>
              <span className="text-[15px] font-medium font-serif">
                {dataUser?.cart?.length > 0
                  ? `Số lượng ${dataUser?.cart?.length}`
                  : "giỏ hàng trống"}
              </span>
            </div>
          </div>
        )}
        {isLogin && (
          <div
            onClick={() => setIsSetting(!isSetting)}
            id="setting"
            className="flex cursor-pointer relative gap-2 justify-center items-center"
          >
            <div className="w-[40px] h-[40px] border-[1px] rounded-md flex justify-center items-center">
              <CiSettings size={20}></CiSettings>
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-medium font-serif">
                Tùy chọn
              </span>
            </div>
            {isSetting && (
              <MenuSetting setIsSetting={setIsSetting}></MenuSetting>
            )}
          </div>
        )}
        {/* {isLogin && (
          <div
            id="setting"
            onClick={() => setIsSetting(!isSetting)}
            className="flex relative cursor-pointer items-center p-[6px] px-[10px] bg-colorCyan mr-3 rounded-xl"
          >
            Tùy chọn
            {isSetting && (
              <MenuSetting setIsSetting={setIsSetting}></MenuSetting>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

// <Link
//   onClick={handleLogout}
//   className=" cursor-pointer w-[60px] text-[12px] block ml-2"
// >
//   Đăng xuất
// </Link>;

export default Header;
