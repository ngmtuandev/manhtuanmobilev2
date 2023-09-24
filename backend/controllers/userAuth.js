const User = require("../model/user.js");
const asyncHandler = require("express-async-handler"); // không cần try-cath gì tự bắt lỗi
const bcrypt = require("bcrypt");
const createAccessToken = require("../middeware/jwt.js");
const refreshToken = require("../middeware/refreshToken.js");
const jwt = require("jsonwebtoken");
const userController = {
  register: asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        status: -1,
        mess: "Trường này không được bỏ trống",
      });
    } else {
      if (!validateEmail(email)) {
        return res.status(400).json({
          success: false,
          status: -1,
          mess: "Trường bạn nhập phải là email",
        });
      } else {
        const checkUser = await User.findOne({ email: email });
        // const checkPhone = await User.find({ phone: phone });
        // console.log(checkUser);
        if (checkUser?.length > 0) {
          return res.status(400).json({
            success: false,
            status: 1,
            mess: "Tài khoản này đã tồn tại",
          });
        } else {
          let salt = await bcrypt.genSaltSync(5);
          const hasdPassword = await bcrypt.hashSync(password, salt);
          // console.log(hasdPassword);
          const newUser = await User.create({
            ...req.body,
            password: hasdPassword,
          });
          return res.status(200).json({
            success: newUser ? true : false,
            status: 0,
            mess: newUser
              ? "Tạo tài khoản thành công"
              : "Tạo tài khoản thất bại",
            data: newUser,
          });
        }
      }
    }
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password, confirmpassword } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        status: -1,
        mess: "Trường này không được bỏ trống",
      });
    } else {
      const checkUserExist = await User.findOne({ email: email });
      // console.log(checkUserExist);
      if (!checkUserExist) {
        return res.status(400).json({
          success: false,
          status: 1,
          mess: "Người dùng này không tồn tại",
        });
      } else {
        if (String(password) !== String(confirmpassword)) {
          return res.status(400).json({
            success: false,
            status: -1,
            mess: "Mật khẩu xác nhận không đúng",
          });
        } else {
          // console.log("checkUserExist.password", checkUserExist.password);
          const comparePassword = await bcrypt.compareSync(
            password,
            checkUserExist.password
          );
          // console.log(comparePassword);
          if (!comparePassword) {
            return res.status(400).json({
              success: false,
              status: 1,
              mess: "Mật khẩu bạn nhập sai !!!",
            });
          } else {
            const { password, role, ...userLogin } = checkUserExist.toObject();
            const accessToken = await createAccessToken(userLogin._id, role);
            let refreshTokenAccount = await refreshToken(userLogin._id);
            res.cookie("refreshToken", refreshTokenAccount, {
              httpOnly: "true",
              maxAge: 259200000,
            });
            // update refresh token in database
            await User.findByIdAndUpdate(
              userLogin._id,
              {
                refreshToken: refreshTokenAccount,
              },
              { new: "true" }
            );
            return res.status(200).json({
              success: false,
              status: 0,
              mess: "Đăng nhập thành công",
              data: userLogin,
              accessToken: accessToken,
            });
          }
        }
      }
    }
  }),
  getUser: asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const userCurrent = await User.findById({ _id: id }).select(
      "-password -role -refreshToken:"
    );
    console.log(userCurrent);
    return res.status(200).json({
      status: 0,
      mess: "Xác nhận người dùng thành công",
    });
  }),
  refreshAccessTokenUser: async (req, res) => {
    const tokenInCookie = req.cookies;
    if (!tokenInCookie || !tokenInCookie.refreshToken) {
      throw new Error("Token không tồn tại");
    } else {
      jwt.verify(
        tokenInCookie.refreshToken,
        process.env.JWT_SECRET,
        async (err, decode) => {
          if (err) throw new Error("Xác nhận token lỗi");
          const userTokenCurrent = await User.findOne({
            _id: decode.id,
            refreshToken: tokenInCookie.refreshToken,
          });
          if (userTokenCurrent) {
            return res.status(200).json({
              status: 0,
              accessToken: userTokenCurrent
                ? createAccessToken(decode.id, tokenInCookie.refreshToken)
                : "Tạo token mới lỗi",
            });
          }
        }
      );
    }
  },
  getAllUsers: asyncHandler(async (req, res) => {
    const allUsers = await User.find().select("-password -role -refreshToken");
    if (allUsers) {
      return res.status(200).json({
        status: 0,
        mess: "lấy tất cả thông tin người dùng thành công",
        users: allUsers,
      });
    }
  }),
  deleteUser: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (id) {
      const findUserDelete = await User.findByIdAndDelete({ _id: id });
      if (findUserDelete) {
        return res.status(200).json({
          status: 0,
          mess: "Xóa người dùng thành công",
        });
      }
    }
  }),
  updateUser: asyncHandler(async (req, res) => {
    const { id } = req.auth;
    if (id && req.body) {
      const findAndUpdated = await User.findByIdAndUpdate(id, req.body, {
        new: "true",
      });
      if (!findAndUpdated) {
        return res.status(401).json({
          status: 1,
          mess: "Cập nhập người dùng lỗi",
        });
      }
      return res.status(200).json({
        status: 0,
        mess: "Cập nhập người dùng thành công",
      });
    }
  }),
  updateAddress: asyncHandler(async (req, res) => {
    const { id } = req.auth;
    console.log("id >>>>>>>", id);
    if (req.body.address) {
      const newUserUpdated = await User.findByIdAndUpdate(
        id,
        {
          $push: { addres: req.body.address },
        },
        { new: true }
      );
      if (newUserUpdated) {
        return res.status(201).json({
          status: 0,
          mess: "Thêm địa chỉ người dùng thành công",
          data: newUserUpdated,
        });
      }
    }
  }),
  cartUser: asyncHandler(async (req, res) => {
    const { id } = req.auth;
    const { pid } = req.params;
    const { quanlity, color } = req.body;
    if (!quanlity || !color || !pid) {
      return res.status(400).json({
        status: 1,
        mess: "bạn không được để trống",
      });
    } else {
      const cartUserCurr = await User.findById(id).select("cart");
      // console.log("cart user curent >>>>", cartUserCurr.cart);
      const alreadyProduct = await cartUserCurr?.cart.find(
        (item) => item?.product?.toString() === pid?.toString()
        // console.log(
        //   "item.product.toString() === pid.toString() >>>> ",
        //   item.product.toString(),
        //   pid,
        //   item.product.toString() === pid.toString()
        // )
      );
      // console.log("alreadyProduct >>>", alreadyProduct);
      if (alreadyProduct) {
        // console.log("alreadyProduct >>>>>>>", alreadyProduct);
        // console.log(
        //   " +alreadyProduct?.quanlity + +quanlity >>>>",
        //   +alreadyProduct?.quanlity
        // );
        if (alreadyProduct?.color?.toString() === color?.toString()) {
          // console.log(
          //   "alreadyProduct?.color.toString() === color.toString()",
          //   alreadyProduct?.color.toString() === color.toString()
          // );
          // console.log(
          //   "Quanlity : >>>>>",
          //   +alreadyProduct?.quanlity + +quanlity
          // );
          const addCart = await User.findByIdAndUpdate(
            id,
            {
              cart: {
                quanlity: +alreadyProduct?.quanlity + +quanlity,
                color,
                product: pid,
              },
            },
            { new: true }
          );
          if (addCart) {
            return res.status(201).json({
              status: 0,
              mess: "Thêm giỏ hàng thành công",
              data: addCart,
            });
          }
        } else {
          const addCart = await User.findByIdAndUpdate(
            id,
            {
              $push: { cart: { product: pid, color, quanlity } },
            },
            { new: true }
          );
          if (addCart) {
            return res.status(201).json({
              status: 0,
              mess: "Thêm sản phẩm mới giỏ hàng thành công",
              data: addCart,
            });
          }
        }
      } else {
        const addCart = await User.findByIdAndUpdate(
          id,
          {
            $push: { cart: { product: pid, color, quanlity } },
          },
          { new: true }
        );
        if (addCart) {
          return res.status(201).json({
            status: 0,
            mess: "Thêm giỏ hàng thành công",
            data: addCart,
          });
        }
      }
    }
  }),
};

module.exports = userController;
