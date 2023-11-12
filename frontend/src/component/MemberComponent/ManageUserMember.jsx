import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputForm from "../AdminComponent/hook-form/InputForm";
import { useForm } from "react-hook-form";
import { getBase64 } from "../../untils/fnSuppport";
import apiUpdateUser from "../../api/fetchApiAdmin/updateUser";
const ManageUserMember = () => {
  const { dataUser } = useSelector((state) => state.user);
  // console.log(dataUser);
  const [imgAvatar, setImgAvatar] = useState("");
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
  });

  const handleSetAvatar = async (file) => {
    const imgBase64 = await getBase64(file);
    if (imgBase64) {
      setImgAvatar(imgBase64);
    }
  };

  useEffect(() => {
    handleSetAvatar(watch("avatar-user")[0]);
  }, [watch("avatar-user")]);

  const handleUpdatedUser = async (data) => {
    const finnalData = { avatar: imgAvatar, ...data, id: dataUser?._id };
    const rs = await apiUpdateUser(finnalData);
    if (rs) {
      window.location.reload();
    }
  };

  return (
    <div className="p-[30px] ">
      <div className="flex gap-5">
        <div>
          <InputForm
            label={"Tên"}
            register={register}
            style={"w-[200px]"}
            errors={errors}
            id={"lastName"}
            defaultValue={dataUser?.lastName}
            validate={{
              required: "Trường này không được bỏ trống",
            }}
          ></InputForm>
        </div>
        <div>
          <InputForm
            label={"Họ"}
            style={"w-[200px]"}
            defaultValue={dataUser?.firstName}
            register={register}
            errors={errors}
            id={"firstName"}
            validate={{
              required: "Trường này không được bỏ trống",
            }}
          ></InputForm>
        </div>
        <div>
          <InputForm
            label={"Email"}
            defaultValue={dataUser?.email}
            style={"w-[200px]"}
            register={register}
            errors={errors}
            id={"email"}
            disabled={true}
          ></InputForm>
        </div>
        <div>
          <InputForm
            defaultValue={dataUser?.phone}
            label={"Số điện thoại"}
            style={"w-[200px]"}
            register={register}
            errors={errors}
            id={"phone"}
            validate={{
              required: "Trường này không được bỏ trống",
            }}
          ></InputForm>
        </div>
      </div>
      <div>
        <label htmlFor="avatar">Tải avatar</label>
        <input
          id="avatar"
          type="file"
          {...register("avatar-user", {
            required: "Bạn phải có hình ảnh sản phẩm",
          })}
        ></input>
        {imgAvatar && <img className="w-[70px]" src={imgAvatar}></img>}
      </div>
      <div>
        <button
          className="w-[100px] mt-4 h-[40px] bg-red-400 rounded-md flex justify-center items-center"
          onClick={handleSubmit(handleUpdatedUser)}
        >
          Cập nhập
        </button>
      </div>
    </div>
  );
};

export default ManageUserMember;
