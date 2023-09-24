const Product = require("../model/product");
const asyncHandler = require("express-async-handler"); // không cần try-cath gì tự bắt lỗi
const slugify = require("slug");
const productController = {
  createProduct: asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(401).json({
        status: -1,
        mess: "Không có thông tin đơn hàng",
      });
    } else {
      const { title, slug, ...data } = req.body;
      console.log("data : ", data);
      if (req.body && title) {
        const createSlug = await slugify(title);
        console.log("create slug", createSlug);
        const newProduct = await Product.create({
          title: title,
          slug: createSlug,
          ...data,
        });
        return res.status(200).json({
          status: newProduct ? 0 : 1,
          mess: newProduct
            ? "Tạo sản phẩm thành công"
            : "Tạo sản phẩm thất bại",
          data: newProduct ? newProduct : "",
        });
      }
    }
  }),
  getOneProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const findProductCurrent = await Product.findById({ _id: id });
    if (findProductCurrent) {
      res.status(200).json({
        status: 0,
        mess: "Lấy sản phẩm thành công",
        data: findProductCurrent,
      });
    } else {
      res.status(401).json({
        status: 1,
        mess: "Lấy sản phẩm thất bại",
      });
    }
  }),
  getAllProducts: asyncHandler(async (req, res) => {
    const allProduct = await Product.find();
    const queries = { ...req.query };
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach((item) => delete queries[item]);
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (el) => `$${el}`);
    const formatQuery = JSON.parse(queryString);
    console.log("formatQuery", formatQuery);

    if (queries?.title)
      formatQuery.title = { $regex: queries.title, $options: "i" };
    let queryCommand = Product.find(formatQuery);
    if (req.query.sort) {
      const setSortBy = req.query.sort.split(",").join(" ");
      console.log("setSortBy : ", setSortBy);
      queryCommand = queryCommand.sort(setSortBy);
    }
    console.log("formatQuery 2", formatQuery);
    queryCommand
      .exec()
      .then(async (rs) => {
        const count = await Product.find(formatQuery).countDocuments();
        res.status(200).json({
          status: 0,
          mess: "Lấy tất cả sản phẩm thành công",
          data: rs,
          count,
        });
      })
      .catch((err) => {
        throw new Error(err.message);
      });

    // if (allProduct) {
    //   res.status(200).json({
    //     status: 0,
    //     mess: "Lấy tất cả sản phẩm thành công",
    //     data: allProduct,
    //   });
    // }
    //  else {
    //   res.status(401).json({
    //     status: 1,
    //     mess: "Lấy toàn bộ sản phẩm thất bại",
    //   });
  }),
  updateProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const newUpdateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: "true" }
    );
    if (newUpdateProduct) {
      res.status(201).json({
        status: 0,
        mess: "Cập nhập sản phẩm thành công",
        newData: newUpdateProduct,
      });
    }
  }),
  deleteProduct: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete({ _id: id });
    if (deleteProduct) {
      res.status(200).json({
        status: 0,
        mess: "Xóa sản phẩm thành công",
      });
    }
  }),
  uploadFileProduct: asyncHandler(async (req, res) => {
    // console.log(req.files); // file : up 1 ảnh, 1 file // files : up nhiều anh, nhiều files
    const { id } = req.params;
    if (req.files) {
      const newProduct = await Product.findByIdAndUpdate(
        id,
        {
          $push: { img: { $each: req.files.map((item) => item.path) } },
        },
        { new: true }
      );
      console.log(newProduct);
      if (newProduct) {
        return res.status(201).json({
          status: newProduct ? 0 : -1,
          mess: newProduct ? "Cập nhập thành công" : "Cập nhập thất bại",
          data: newProduct ? newProduct : "",
        });
      }
    }
  }),
};

module.exports = productController;
