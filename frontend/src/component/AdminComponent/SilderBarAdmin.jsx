import React, { Fragment, useState } from "react";
import path from "../../untils/path";
import icons from "../../untils/icons";
import { NavLink } from "react-router-dom";
const dataSideBar = [
  {
    id: 1,
    type: "single",
    text: "Thống kê",
    path: `${path.PUBLIC_ADMIN}${path.DASBOARD_ADMIN}`,
  },
  {
    id: 2,
    type: "single",
    text: "Quản lý người dùng",
    path: `${path.PUBLIC_ADMIN}${path.MANAGE_USER_ADMIN}`,
  },
  {
    id: 3,
    type: "single",
    text: "Quán lý đơn hàng",
    path: `${path.PUBLIC_ADMIN}${path.MANAGE_ORDER}`,
  },
  {
    id: 4,
    type: "parent",
    text: "Hàng hóa",
    submenu: [
      {
        text: "Tạo sản phẩm",
        path: `${path.PUBLIC_ADMIN}${path.CREATE_PRODUCT_ADMIN}`,
      },
      {
        text: "Quản lý sản phẩm",
        path: `${path.PUBLIC_ADMIN}${path.MANAGE_PRODUCT_ADMIN}`,
      },
    ],
  },
];

const SilderBarAdmin = () => {
  const [isShowManageProduct, setIsShowManageProduct] = useState(false);
  const { BiSolidDownArrow, BiSolidRightArrow } = icons;
  return (
    <div className="w-full h-full shadow-2xl bg-colorCyanDark text-white">
      <div>
        <span className="font-bold uppercase text-[25px] text-colorCyan flex justify-center pt-[16px]">
          Mạnh Tuấn Shop
        </span>
      </div>
      <div className="px-[8px]">
        {dataSideBar.map((el) => {
          return (
            <Fragment>
              {el.type === "single" ? (
                <div
                  key={el.id}
                  className="w-[96%] cursor-pointer bg-gray-200 my-2 h-[40px] flex items-center"
                >
                  <NavLink to={el.path}>
                    <span className="pl-[8px] font-semibold text-gray-600">
                      {el.text}
                    </span>
                  </NavLink>
                </div>
              ) : (
                <div
                  onClick={() => setIsShowManageProduct(!isShowManageProduct)}
                  key={el.id}
                  className="w-[96%] bg-gray-200 relative cursor-pointer my-2 h-[40px] flex items-center"
                >
                  <div className="flex w-full items-center justify-between pr-[8px]">
                    <span className="pl-[8px] font-semibold text-gray-600 ">
                      {el.text}
                    </span>
                    <div>
                      {isShowManageProduct ? (
                        <BiSolidDownArrow color="black"></BiSolidDownArrow>
                      ) : (
                        <BiSolidRightArrow color="black"></BiSolidRightArrow>
                      )}
                    </div>
                  </div>
                  {!!isShowManageProduct && (
                    <div className="absolute inset-0 mt-12">
                      {el.submenu.map((item) => {
                        return (
                          <NavLink
                            to={item.path}
                            key={Math.random()}
                            className="w-[100%] pl-[16px] bg-gray-400 mb-2 hover:bg-opacity-80 cursor-pointer h-[30px] flex items-center"
                          >
                            <span className="text-white">{item.text}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SilderBarAdmin;
