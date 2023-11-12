import React from "react";
import { useForm } from "react-hook-form";
import InputForm from "./hook-form/InputForm";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { getBase64 } from "../../untils/fnSuppport";
import COLORS from "../../untils/dataColor";
import addVariantApi from "../../api/fetchApiAdmin/addVariantPrd";
const ModelAddVarient = ({ addVariant, setIsShowModelAdd }) => {
  const [color, setColor] = useState("");

  const [imgPreView, setImgPreView] = useState({
    thumb: "",
    images: "",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    price: 0,
    quantity: 0,
    title: "",
  });

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
      setImgPreView((prev) => ({ ...prev, images: listDataImgs }));
    }
  };

  useEffect(() => {
    handleImgPreView(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handleImgProductsPreView(watch("img"));
  }, [watch("img")]);

  const handleSelectColor = (e) => {
    setColor(e.target.value);
  };

  const handleAddVarientProduct = async (data) => {
    const formData = new FormData();
    for (let i of Object.entries(data)) {
      formData.append(i[0], i[1]);
    }
    const dataFull = { ...data, color, ...imgPreView };

    const checkExitProduct = addVariant?.variants?.some(
      (el) => el?.color === color
    );
    if (checkExitProduct) {
      swal({
        title: "Biến thể này đã tồn tại !!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      return;
    } else {
      const rs = await addVariantApi(dataFull, addVariant?._id);
      if (rs?.status == 0) {
        swal({
          title: "Thêm biến thể thành công",
          icon: "success",
          button: "Hoàn thành",
        });
      }
    }
  };
  return (
    <div className="w-[100%] mt-10 h-[400px] absolute inset-0 bg-gray-400 z-1000 flex items-center justify-center">
      <div className="rounded-md">
        <div className="flex flex-wrap mb-4 gap-4 px-[8px] py-[4px]">
          <div>
            <InputForm
              style={"w-[530px] h-[30px]"}
              label={"Tên sản phẩm"}
              register={register}
              errors={errors}
              defaultValue={addVariant?.title}
              id={"title"}
              placeholder={"Nhập tên sản phẩm"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
          <div>
            <InputForm
              label={"Giá sản phẩm"}
              style={"w-[150px] h-[30px]"}
              register={register}
              type={"number"}
              errors={errors}
              defaultValue={addVariant?.price}
              id={"price"}
              placeholder={"Nhập tên sản phẩm"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
          <div>
            <InputForm
              label={"Số lượng"}
              style={"w-[150px] h-[30px]"}
              register={register}
              type={"number"}
              errors={errors}
              defaultValue={addVariant?.quantity}
              id={"quantity"}
              placeholder={"Nhập tên sản phẩm"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
          <div className="w-52 relative">
            <label htmlFor="">Chọn màu</label>
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
        <div className="flex mt-4 gap-4">
          <div>
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
              <img className="w-[100px] h-[100px]" src={imgPreView.thumb}></img>
            )}
          </div>
          <div>
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
            {imgPreView?.images && (
              <div className="flex">
                {imgPreView?.images?.map((el) => {
                  return <img className="w-[100px] h-[100px]" src={el}></img>;
                })}
              </div>
            )}
          </div>
        </div>

        <div className="w-[200px] text-white mt-2 rounded-lg justify-center flex items-center h-[40px] bg-red-500">
          <button onClick={handleSubmit(handleAddVarientProduct)}>Thêm</button>
        </div>
        <div className="w-[200px] text-white mt-2 rounded-lg justify-center flex items-center h-[40px] bg-blue-500">
          <button onClick={() => setIsShowModelAdd(false)}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default ModelAddVarient;
