import React from "react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import path from "../../untils/path";
import { useSelector } from "react-redux";
import icons from "../../untils/icons";
const { CiUser, CiBookmarkCheck, RiHistoryFill, CiShoppingCart, VscHistory } =
  icons;
const dataSideBar = [
  {
    id: 1,
    type: "single",
    text: "Cập nhập thông tin",
    path: `${path.PUBLIC_MEMBER}${path.MANAGE_USER_MEMBER}`,
    icon: <CiUser color="gray" size={25}></CiUser>,
  },
  {
    id: 2,
    type: "single",
    text: "Giỏ hàng",
    path: `${path.PUBLIC_MEMBER}${path.MANAGE_CART_MEMBER}`,
    icon: <CiShoppingCart color="gray" size={25}></CiShoppingCart>,
  },
  {
    id: 3,
    type: "single",
    text: "Lịch sử mua hàng",
    path: `${path.PUBLIC_MEMBER}${path.MANAGE_BUY_HISTORY_MEMBER}`,
    icon: <VscHistory color="gray" size={21}></VscHistory>,
  },
  {
    id: 4,
    type: "single",
    text: "Yêu thích",
    path: `${path.PUBLIC_MEMBER}${path.MANAGE_WHITELIST_MEMBER}`,
    icon: <CiBookmarkCheck color="gray" size={25}></CiBookmarkCheck>,
  },
];
const TabMember = () => {
  const { dataUser } = useSelector((state) => state.user);

  return (
    <div>
      <div className="flex justify-center items-center my-7">
        <div className="flex-col justify-center text-center items-center">
          {dataUser?.avatar ? (
            <img
              className="border-[1.4px] ml-5 mb-3 justify-center text-center w-[100px] h-[100px] rounded-full"
              src={dataUser?.avatar}
            ></img>
          ) : (
            <div className="w-[70px] ml-5 mb-3 h-[70px] bg-green-600 rounded-full"></div>
          )}
          <p className="uppercase">
            {dataUser?.firstName} {dataUser?.lastName}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-[12px] rounded-full h-[12px] bg-yellow-400"></div>
            <span>{!dataUser?.isBlocked ? "Đang hoạt động" : "Đã khóa"}</span>
          </div>
        </div>
      </div>
      <div className="px-[8px]">
        {dataSideBar.map((el) => {
          return (
            <Fragment>
              <div
                key={el.id}
                className="w-[96%] rounded-sm hover:bg-white pl-[8px] cursor-pointer bg-gray-200 my-2 h-[40px] flex items-center"
              >
                <NavLink to={el.path}>
                  <div className="flex items-center">
                    <div>{el?.icon}</div>
                    <span className="pl-[8px] font-semibold text-gray-600">
                      {el.text}
                    </span>
                  </div>
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
