import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import InputForm from "./hook-form/InputForm";
import MceTinyText from "./MceTinyText";
import { getBase64 } from "../../untils/fnSuppport";
import fetchCreateProduct from "../../api/fetchApiAdmin/createProduct";
import swal from "sweetalert";
import COLORS from "../../untils/dataColor";

const CreateProduct = () => {
  const { categories } = useSelector((state) => state.app);
  //   console.log(categories);
  const [desc, setDesc] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
    watch,
  } = useForm({
    title: "",
    brand: "",
    introProducts: "",
    price: 0,
    quantity: 0,
    selled: 0,
    discount: 0,
  });

  const [imgPreView, setImgPreView] = useState({
    thumb: "",
    img: "",
  });

  const handleCreateProduct = async () => {
    const data = getValues();
    const dataFull = { ...data, desc, category: selectedValue };
    const formData = new FormData();
    for (let i of Object.entries(dataFull)) {
      formData.append(i[0], i[1]);
    }
    for (let j of formData.entries()) {
      console.log(j[0] + "," + j[1]);
    }
    if (dataFull && imgPreView.thumb !== "" && imgPreView.img !== "") {
      setIsLoading(true);
      console.log("data create full >>>", {
        ...dataFull,
        ...imgPreView,
        color,
      });
      const rs = await fetchCreateProduct({
        ...dataFull,
        ...imgPreView,
        color,
      });
      setIsLoading(false);
      console.log(rs?.status);
      console.log("++rs.status === 0", rs?.status == 0);
      if (rs?.status == 0) {
        swal("Tạo sản phẩm mới thành công");
        reset();
        setImgPreView({
          thumb: "",
          img: "",
        });
      }
    }
  };

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setSelectedValue(e.target.value);
  };

  const handleSelectColor = (e) => {
    setColor(e.target.value);
  };

  const handleImgPreView = async (file) => {
    console.log("file : ", file);
    const imgPreviewBase64 = await getBase64(file);
    console.log("imgPreviewBase64", imgPreviewBase64);
    setImgPreView((prev) => ({ ...prev, thumb: imgPreviewBase64 }));
  };

  const handleImgProductsPreView = async (files) => {
    const listDataImgs = [];
    for (let i of files) {
      const imgBase64 = await getBase64(i);
      listDataImgs.push(imgBase64);
    }
    console.log("listDataImgs >>>>", listDataImgs);
    if (listDataImgs.length > 0) {
      setImgPreView((prev) => ({ ...prev, img: listDataImgs }));
    }
  };

  useEffect(() => {
    // console.log("thumb change");
    // console.log(watch("thumb")[0].name);
    handleImgPreView(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handleImgProductsPreView(watch("img"));
  }, [watch("img")]);

  return (
    <div className="px-main h-full font-serif">
      <div className="text-[24px] text-colorCyanMain text-center my-2 font-semibold uppercase ">
        Create Product
      </div>

      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="flex gap-4">
          <div>
            <InputForm
              style={"w-[450px] h-[30px]"}
              register={register}
              errors={errors}
              // defaultValue={editUser?.email}
              id={"title"}
              placeholder={"Nhập tên sản phẩm"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
          <div>
            <InputForm
              register={register}
              errors={errors}
              style={"w-[300px] h-[30px]"}
              // defaultValue={editUser?.email}
              id={"brand"}
              placeholder={"Nhập nhãn hiệu sản phẩm"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
        </div>
        <div className="flex gap-4 my-4">
          <div>
            <InputForm
              register={register}
              errors={errors}
              // defaultValue={editUser?.email}
              id={"price"}
              style={"w-[200px] h-[30px]"}
              placeholder={"Nhập giá sản phẩm"}
              type={"number"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
          <div>
            <InputForm
              register={register}
              errors={errors}
              // defaultValue={editUser?.email}
              id={"quantity"}
              style={"w-[235px] h-[30px]"}
              type={"number"}
              placeholder={"Nhập số lượng sản phẩm"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
          <div>
            <InputForm
              register={register}
              errors={errors}
              // defaultValue={editUser?.email}
              id={"selled"}
              placeholder={"Số lượng đã bán"}
              style={"w-[300px] h-[30px]"}
              type={"number"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <InputForm
            register={register}
            errors={errors}
            // defaultValue={editUser?.email}
            id={"discount"}
            style={"w-[200px] h-[30px]"}
            type={"number"}
            placeholder={"Nhập giảm giá cho sản phẩm"}
            validate={{
              required: "Trường này không được bỏ trống",
            }}
          ></InputForm>
          <div className="">
            <InputForm
              register={register}
              errors={errors}
              // defaultValue={editUser?.email}
              id={"introProducts"}
              placeholder={"Giới thiệu sản phẩm"}
              style={"w-[550px] h-[30px]"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
        </div>
        <div>
          <div className="w-52 relative mb-2">
            <select
              value={selectedValue}
              onChange={handleSelectChange}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8   leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="" disabled selected>
                Chọn danh mục
              </option>
              {categories?.map((el) => {
                return <option value={el.title}>{el.title}</option>;
              })}
            </select>
          </div>
          <div className="w-52 relative">
            <select
              value={color}
              onChange={handleSelectColor}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8   leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="" disabled selected>
                Chọn màu sản phẩm
              </option>
              {COLORS?.map((el) => {
                return <option value={el.color}>{el.color}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <MceTinyText
            // onCreateProduct={handleCreateProduct}
            setDesc={setDesc}
          ></MceTinyText>
        </div>
        <div className="flex justify-between mt-4 gap-4">
          <div className="flex-col justify-center items-center">
            <label htmlFor="thumb">Ảnh thumb</label>
            <input
              {...register("thumb", {
                required: "Bạn phải có hình ảnh sản phẩm",
              })}
              type="file"
              id="thumb"
            />
            {errors["thumb"] && <small>{errors["thumb"]?.message}</small>}
            {imgPreView.thumb && (
              <img
                className="w-[100px] mt-3 h-[100px]"
                src={imgPreView.thumb}
              ></img>
            )}
          </div>
          <div className="flex-col justify-center items-center">
            <label htmlFor="img">Ảnh sản phẩm</label>
            <input
              {...register("img", {
                required: "Bạn phải có hình ảnh sản phẩm",
              })}
              type="file"
              multiple
              id="img"
            />
            {errors["img"] && <small>{errors["img"]?.message}</small>}
            <div className="grid-cols-4 gap-3 grid mt-3">
              {imgPreView?.img &&
                imgPreView?.img?.map((el) => {
                  return (
                    <img
                      className="w-[100px] shadow-lg h-[100px]"
                      src={el}
                    ></img>
                  );
                })}
            </div>
            <div
              className="w-[350px] text-gray-50 font-bold rounded-lg h-[50px] mt-20 hover:opacity-75
       bg-colorCyanDark justify-center items-center flex"
            >
              <button onClick={handleCreateProduct}>Tạo sản phẩm</button>
              {isLoading ? <span>...</span> : ""}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(CreateProduct);
