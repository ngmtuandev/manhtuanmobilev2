import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputForm from "../AdminComponent/hook-form/InputForm";
import { useForm } from "react-hook-form";
import { getBase64 } from "../../untils/fnSuppport";
import apiUpdateUser from "../../api/fetchApiAdmin/updateUser";
import fetchApiProvince, {
  fetchApiDistrict,
  fetchApiLocation,
} from "../../api/apiAddress/apiProvince";
import { Select, Option } from "@material-tailwind/react";

const ManageUserMember = () => {
  const { dataUser } = useSelector((state) => state.user);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [location, setLocation] = useState([]);
  const [imgAvatar, setImgAvatar] = useState("");
  const [address, setAddress] = useState({
    province: {
      id: "",
      name: "",
    },
    district: {
      id: "",
      name: "",
    },
    location: {
      id: "",
      name: "",
    },
  });
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

  useEffect(() => {
    (async () => {
      const dataProvince = await fetchApiProvince();
      if (dataProvince) {
        setProvince(dataProvince);
      }
    })();
  }, []);
  useEffect(() => {
    if (address.province) {
      (async () => {
        const rs = await fetchApiDistrict(address.province.code);
        if (rs) {
          setDistrict(rs?.districts);
        }
      })();
    }
  }, [address.province]);

  useEffect(() => {
    if (address.district) {
      (async () => {
        const rs = await fetchApiLocation(address.district.code);
        if (rs) {
          setLocation(rs?.wards);
          console.log("location : ", location);
        }
      })();
    }
  }, [address.district]);

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
    const finnalData = {
      avatar: imgAvatar,
      ...data,
      id: dataUser?._id,
      addres: address && address,
    };
    const rs = await apiUpdateUser(finnalData);
    if (rs) {
      window.location.reload();
    }
  };

  const handleSelectChangeProvince = (e) => {
    console.log("province : ", e);
    setAddress({ ...address, province: e });
  };

  const handleSelectChangeDistrict = (e) => {
    console.log("district : ", e);
    setAddress({ ...address, district: e });
    console.log(address);
  };

  const handleSelectChangeLocation = (e) => {
    console.log("location : ", e);
    setAddress({ ...address, location: e });
    console.log(location, province, district);
  };

  return (
    <div className="p-[30px] text-gray-800">
      <div className="flex items-center">
        <div className="flex-col gap-5">
          <div className="flex-col">
            <div>
              <InputForm
                label={"Tên"}
                register={register}
                style={"w-[350px]"}
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
                style={"w-[350px]"}
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
                style={"w-[350px]"}
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
                style={"w-[350px]"}
                register={register}
                errors={errors}
                id={"phone"}
                validate={{
                  required: "Trường này không được bỏ trống",
                }}
              ></InputForm>
            </div>
          </div>
          <div className="">
            <div className="w-[50px] my-4">
              <Select
                label="-- Tỉnh/ thành phố --"
                onChange={handleSelectChangeProvince}
              >
                {province?.map((el) => {
                  return <Option value={el}>{el.name}</Option>;
                })}
              </Select>
            </div>
            <div className="w-[50px] my-4">
              <Select
                label="-- Quận/ huyện --"
                onChange={handleSelectChangeDistrict}
              >
                {district?.map((el) => {
                  return <Option value={el}>{el.name}</Option>;
                })}
              </Select>
            </div>
            <div className="w-[50px] my-4">
              <Select
                label="-- Xã/ phường --"
                onChange={handleSelectChangeLocation}
              >
                {location?.map((el) => {
                  return <Option value={el}>{el.name}</Option>;
                })}
              </Select>
            </div>
            <div>
              {dataUser?.addres && (
                <span className="text-colorCyanMain font-medium">
                  Địa chỉ: {dataUser?.addres[0].location.name}{" "}
                  {dataUser?.addres[0].district.name}{" "}
                  {dataUser?.addres[0].province.name}
                </span>
              )}
            </div>
            <div>
              {address.location.name !== "" && (
                <span className="text-colorCyanMain font-medium">
                  Địa chỉ mới : {address.province.name} {address.district.name}{" "}
                  {address.location.name}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="ml-20 flex-col justify-center items-center">
          {imgAvatar ? (
            <img
              className="w-[200px] mb-4 h-[200px] rounded-full border-[1px]"
              src={imgAvatar}
            ></img>
          ) : (
            <img
              src={dataUser?.avatar}
              className="w-[200px] mb-4 h-[200px] rounded-full border-[1px]"
            ></img>
          )}

          <div className="flex-col justify-center items-center">
            <input
              id="avatar"
              type="file"
              {...register("avatar-user", {
                required: "Bạn phải có hình ảnh sản phẩm",
              })}
            ></input>
          </div>
          <div className="mt-4">
            <button
              className="w-[270px] hover:bg-opacity-90 text-gray-50 text-[18px] 
          mt-8 h-[40px] bg-colorCyanMain rounded-sm flex justify-center items-center"
              onClick={handleSubmit(handleUpdatedUser)}
            >
              Cập nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUserMember;
