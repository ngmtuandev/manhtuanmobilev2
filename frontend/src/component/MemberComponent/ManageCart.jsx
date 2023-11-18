import React from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "../../untils/fnSuppport";
import apiDeleteCart from "../../api/apicart/apiDeleteCart";
import swal from "sweetalert";
import withHocBase from "../../hocs/withHocBase";
import actionTypeAsyncLogin from "../../store/actionTypeAsyncLogin";
import { useNavigate } from "react-router-dom";

const ManageCart = ({ dispatch }) => {
  const { dataUser } = useSelector((state) => state.user);
  console.log("data user cart : ", dataUser);
  const navigate = useNavigate();

  const handleDelete = async (el) => {
    const rs = await apiDeleteCart({ pid: el.product, color: el.color });
    if (+rs.status === 0) {
      dispatch(actionTypeAsyncLogin());
      swal("Xóa sản phẩm thành công");
    } else {
      swal("Xóa sản phẩm THẤT BẠI");
    }
  };

  return (
    <div className="px-[16px] font-serif text-gray-800">
      <div className="mt-7">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Hình ảnh</th>
              <th className="text-left">Thông tin</th>
              <th className="text-center">Số lượng</th>
              <th className="text-center">Đơn giá</th>
              <th className="text-center">Hủy</th>
            </tr>
          </thead>
          <tbody>
            {dataUser?.cart?.map((el, index) => (
              <tr key={index}>
                <td>
                  <img
                    className="w-16 h-16"
                    src={el?.thumb}
                    alt={el?.title}
                  ></img>
                </td>
                <td>
                  <div className="flex flex-col">
                    <span className="font-bold">{el?.title}</span>
                    <span>Màu : {el?.color}</span>
                  </div>
                </td>
                <td className="text-center">{el?.quantity}</td>
                <td className="text-center">{formatMoney(el?.price)}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(el)}
                    className="w-24 h-10 bg-cyan rounded-lg text-gray-800"
                  >
                    Xóa sản phẩm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-16 mb-4 border w-[50%] p-[8px] rounded-sm shadow-sm">
          <div>
            <div>
              <span>
                Họ tên: {dataUser?.firstName} {dataUser?.lastName}
              </span>
            </div>
            <span>
              Giao tới: {dataUser?.addres[0]?.province.name}{" "}
              {dataUser?.addres[0]?.location.name}{" "}
              {dataUser?.addres[0]?.district.name}
            </span>
          </div>
          <div>
            <span>Địa chỉ email: {dataUser?.email}</span>
          </div>
          <div className="pb-[8px] border-b-[1px]">
            <span>Số điện thoại: {dataUser?.phone}</span>
          </div>
          <div className="mt-4 mb-2 text-red-500 font-semibold text-[24px]">
            Tổng tiền:{" "}
            {formatMoney(
              dataUser?.cart?.reduce((sum, ele) => sum + ele?.price, 0)
            )}{" "}
            VNĐ
          </div>
        </div>
        <div
          onClick={() => navigate("/payment")}
          className="w-[300px] cursor-pointer h-[40px] rounded-lg flex justify-center items-center bg-cyan-400"
        >
          <span className="text-white">Thanh toán</span>
        </div>
      </div>
    </div>
  );
};

export default withHocBase(ManageCart);
