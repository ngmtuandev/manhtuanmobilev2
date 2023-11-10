import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import InputForm from "./hook-form/InputForm";
import MceTinyText from "./MceTinyText";
const CreateProduct = () => {
  const { categories } = useSelector((state) => state.app);
  //   console.log(categories);
  const [desc, setDesc] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    title: "",
    brand: "",
    price: 0,
    quantity: 0,
    selled: 0,
    discount: 0,
  });

  const handleCreateProduct = () => {
    const data = getValues();
    console.log({ ...data, desc });
  };

  return (
    <div className="px-main">
      <div>Create Product</div>
      <button onClick={handleCreateProduct}>Tạo sản phẩm</button>
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
        <div>
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
        </div>
      </form>
      <div className="mt-4">
        <MceTinyText
          // onCreateProduct={handleCreateProduct}
          setDesc={setDesc}
        ></MceTinyText>
      </div>
    </div>
  );
};

export default memo(CreateProduct);
