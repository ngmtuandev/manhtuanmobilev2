import React from "react";
import { formatMoney } from "../../untils/fnSuppport";
import { useSelector } from "react-redux";
import Paypal from "../Checkout/Paypal";
import payment from "../../asset/payment.svg";
const Checkout = () => {
  const { dataUser } = useSelector((state) => state.user);
  console.log("data user cart : ", dataUser);
  console.log(
    "total : ",
    dataUser?.cart?.reduce((sum, ele) => sum + ele?.price, 0)
  );
  return (
    <div className="flex-col font-serif w-[100%] h-screen flex justify-center items-center p-[12px] bg-white">
      <h2 className="uppercase text-[30px] text-colorCyanMain">
        Thanh toán đơn hàng
      </h2>
      <div>
        <img src={payment} alt="" className="w-[200px]" />
      </div>
      <div className="w-[100%] my-4">
        <table class="w-[100%]">
          <thead>
            <tr>
              <th>Thông tin</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
            </tr>
          </thead>
          <tbody>
            {dataUser?.cart?.map((el) => {
              return (
                <tr className="text-center">
                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold">{el?.title}</span>
                    </div>
                  </td>
                  <td>{el?.quanlity}</td>
                  <td>{formatMoney(el?.price)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Paypal
          total={dataUser?.cart?.reduce((sum, ele) => sum + ele?.price, 0)}
          products={dataUser?.cart}
          amount={dataUser?.cart?.reduce((sum, ele) => sum + ele?.price, 0)} // /23500 -> đổi ra vnđ
        ></Paypal>
      </div>
    </div>
  );
};

export default Checkout;
