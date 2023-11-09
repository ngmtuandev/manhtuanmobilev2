import React, { Fragment, useState } from "react";
import path from "../../untils/path";
import icons from "../../untils/icons";
import { NavLink } from "react-router-dom";
const dataSideBar = [
  {
    id: 1,
    type: "single",
    text: "Dashboard",
    path: `${path.PUBLIC_ADMIN}${path.DASBOARD_ADMIN}`,
  },
  {
    id: 2,
    type: "single",
    text: "Manage user",
    path: `${path.PUBLIC_ADMIN}${path.MANAGE_USER_ADMIN}`,
  },
  {
    id: 3,
    type: "single",
    text: "Manage order",
    path: `${path.PUBLIC_ADMIN}${path.MANAGE_ORDER}`,
  },
  {
    id: 4,
    type: "parent",
    text: "Manage Product",
    submenu: [
      {
        text: "Create Product",
        path: `${path.PUBLIC_ADMIN}${path.CREATE_PRODUCT_ADMIN}`,
      },
      {
        text: "Manage Product",
        path: `${path.PUBLIC_ADMIN}${path.MANAGE_PRODUCT_ADMIN}`,
      },
    ],
  },
];

const SilderBarAdmin = () => {
  const [isShowManageProduct, setIsShowManageProduct] = useState(false);
  const { BiSolidDownArrow, BiSolidRightArrow } = icons;
  return (
    <div className="w-full h-full shadow-2xl bg-white">
      <div>
        <span className="font-bold text-[28px] text-colorCyan flex justify-center pt-[16px]">
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
                        <BiSolidDownArrow></BiSolidDownArrow>
                      ) : (
                        <BiSolidRightArrow></BiSolidRightArrow>
                      )}
                    </div>
                  </div>
                  {!!isShowManageProduct && (
                    <div className="absolute inset-0 mt-12 ">
                      {el.submenu.map((item) => {
                        return (
                          <div
                            key={Math.random()}
                            className="w-[100%] pl-[16px] cursor-pointer h-[30px] flex items-center"
                          >
                            <span className="text-black">{item.text}</span>
                          </div>
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
