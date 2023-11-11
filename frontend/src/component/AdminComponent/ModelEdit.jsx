import React from "react";
import { useForm } from "react-hook-form";
import InputForm from "./hook-form/InputForm";
import MceTinyText from "./MceTinyText";
import { useState } from "react";
import fetchUpdateProduct from "../../api/fetchApiAdmin/updatedProduct";
import { useDispatch } from "react-redux";
import { acionShowModel } from "../../store/modelSlice";
import swal from "sweetalert";

const ModelEdit = ({ productEdit, setIsEdit, isEdit }) => {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
    watch,
  } = useForm({
    brand: "",
    discount: "",
    price: 0,
    quantity: 0,
    selled: 0,
    title: "",
  });
  const handleEditProduct = async () => {
    const data = getValues();
    const rs = await fetchUpdateProduct(productEdit?._id, { ...data, desc });
    console.log("rs edit", rs);
    if (rs.status == 0) {
      dispatch(acionShowModel({ isShowModel: false }));
      swal("Cập nhập sản phẩm thành công").then(() => {
        setIsEdit(!isEdit);
      });
    }
  };
  return (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div className="w-[90%] h-[80%]  rounded-md">
        <div className="flex flex-wrap mb-4 gap-4 px-[8px] py-[4px]">
          <div>
            <InputForm
              label={"Thương hiệu"}
              style={"w-[250px] h-[30px]"}
              register={register}
              errors={errors}
              defaultValue={productEdit?.brand}
              id={"brand"}
              placeholder={"Nhập tên sản phẩm"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
          <div>
            <InputForm
              label={"Giảm giá"}
              style={"w-[100px] h-[30px]"}
              register={register}
              errors={errors}
              defaultValue={productEdit?.discount}
              id={"discount"}
              placeholder={"Nhập tên sản phẩm"}
              type={"number"}
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
              defaultValue={productEdit?.price}
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
              defaultValue={productEdit?.quantity}
              id={"quantity"}
              placeholder={"Nhập tên sản phẩm"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
          <div>
            <InputForm
              label={"Đã bán"}
              style={"w-[100px] h-[30px]"}
              register={register}
              errors={errors}
              defaultValue={productEdit?.selled}
              type={"number"}
              id={"selled"}
              placeholder={"Nhập tên sản phẩm"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
          <div>
            <InputForm
              style={"w-[530px] h-[30px]"}
              label={"Tên sản phẩm"}
              register={register}
              errors={errors}
              defaultValue={productEdit?.title}
              id={"title"}
              placeholder={"Nhập tên sản phẩm"}
              validate={{
                required: "Trường này không được bỏ trống",
              }}
            ></InputForm>
          </div>
        </div>
        <div>
          <MceTinyText setDesc={setDesc}></MceTinyText>
        </div>
        <div className="w-[200px] text-white mt-2 rounded-lg justify-center flex items-center h-[40px] bg-red-500">
          <button onClick={handleSubmit(handleEditProduct)}>Chỉnh sửa</button>
        </div>
      </div>
    </div>
  );
};

export default ModelEdit;
