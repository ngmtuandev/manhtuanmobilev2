const asyncHandler = require("express-async-handler"); // không cần try-cath gì tự bắt lỗi
const Order = require("../model/order");
const User = require("../model/user");
const Coupon = require("../model/coupon");
const categoryController = {
  createOrder: asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const { coupon } = req.body;
    const cartUserCurr = await User.findById(id)
      .select("cart")
      .populate("cart.product", "title price");
    // console.log("cart user current >>>>>", cartUserCurr);
    const products = cartUserCurr?.cart?.map((item) => ({
      product: item?.product,
      total: item?.quanlity,
      color: item?.color,
    }));
    console.log("products >>>>>", products);
    let totalCart = products?.reduce(
      (sum, item) => sum + item?.product?.price * item?.total,
      0
    );
    console.log("total cart not coupon >>>>>>", totalCart);
    if (coupon) {
      const findCoupon = await Coupon.findById(coupon).select("discout");
      console.log("data find coupon >>>>>", findCoupon);
      if (findCoupon) {
        totalCart =
          Math.round((totalCart * (1 - +findCoupon?.discout / 100)) / 1000) *
          1000;
      }
      console.log("cart total coupon >>>>>>>", totalCart);
    }
    const rs = await Order.create({
      products,
      total: totalCart,
      orderBy: id,
    });
    if (rs) {
      return res.status(201).json({
        status: 0,
        mess: "Đơn hàng tạo thành công",
        data: rs,
      });
    } else {
      return res.status(400).json({
        status: 1,
        mess: "Đơn hàng tạo thất bại",
      });
    }
  }),
  updateStatus: asyncHandler(async (req, res) => {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        status: -1,
        mess: "Trạng thái đơn hàng cập nhập thất bại",
      });
    } else {
      const updatedOrderStatus = await Order.findByIdAndUpdate(
        oid,
        { status },
        { new: true }
      );
      if (updatedOrderStatus) {
        return res.status(201).json({
          status: 0,
          mess: "Cập nhập trạng thái đơn hàng thành công",
          data: updatedOrderStatus,
        });
      }
    }
  }),
  getUserOrder: asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const findOrder = await Order.find({ orderBy: id });
    return res.status(200).json({
      status: 0,
      mess: "Lấy thông tin đơn hàng của bạn thành công",
      data: findOrder,
    });
  }),
  getAllOrderbyAdmin: asyncHandler(async (req, res) => {
    const findOrderAll = await Order.find();
    return res.status(200).json({
      status: 0,
      mess: "Lấy tất cả thông tin đơn hàng thành công",
      data: findOrderAll,
    });
  }),
};

module.exports = categoryController;
