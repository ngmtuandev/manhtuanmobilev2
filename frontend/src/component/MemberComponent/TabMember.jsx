import React from "react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import path from "../../untils/path";
import { useSelector } from "react-redux";
const dataSideBar = [
  {
    id: 1,
    type: "single",
    text: "Cập nhập thông tin",
    path: `${path.PUBLIC_MEMBER}${path.MANAGE_USER_MEMBER}`,
  },
  {
    id: 2,
    type: "single",
    text: "Giỏ hàng",
    path: `${path.PUBLIC_MEMBER}${path.MANAGE_CART_MEMBER}`,
  },
  {
    id: 3,
    type: "single",
    text: "Lịch sử mua hàng",
    path: `${path.PUBLIC_MEMBER}${path.MANAGE_BUY_HISTORY_MEMBER}`,
  },
  {
    id: 4,
    type: "single",
    text: "Yêu thích",
    path: `${path.PUBLIC_MEMBER}${path.MANAGE_WHITELIST_MEMBER}`,
  },
];
const TabMember = () => {
  const { dataUser } = useSelector((state) => state.user);

  return (
    <div>
      <div className="flex justify-center items-center my-7">
        <div className="flex-col justify-center text-center items-center">
          {dataUser?.avatar ? (
            <img src={dataUser?.avatar}></img>
          ) : (
            <div className="w-[70px] h-[70px] bg-green-600 rounded-full"></div>
          )}
          <p>
            {dataUser?.firstName} {dataUser?.lastName}
          </p>
          <span>{!dataUser?.isBlocked ? "Đang hoạt động" : "Đã khóa"}</span>
        </div>
      </div>
      <div className="px-[8px]">
        {dataSideBar.map((el) => {
          return (
            <Fragment>
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
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default TabMember;
