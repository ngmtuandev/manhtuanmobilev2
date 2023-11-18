import React, { useState } from "react";
import InputField from "../../component/PublicComponent/form/InputField";
import Button from "../../component/PublicComponent/Button";
import fetchApiRegister from "../../api/fetchApiRegister";
import path from "../../untils/path";
import { Link } from "react-router-dom";
import ErrText from "../../component/PublicComponent/ErrText";
import { validateEmail } from "../../untils/fnSuppport";
import imgregister from "../../asset/register.svg";

const Register = () => {
  const [statusRegister, setStatusRegister] = useState(null);
  const [checkFieldInput, setCheckFieldInput] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkMatchPassword, setCheckMatchPassword] = useState(false);
  const [checkLengthPassword, setCheckLengthPassword] = useState(false);
  const [value, setValue] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    confirmpassword: "",
  });

  const fetchRegister = async () => {
    const dataRegister = await fetchApiRegister(value);
    console.log("dataRegister >>>", dataRegister);
    if (+dataRegister?.status === 0)
      alert("Vui lòng kiểm tra email của bạn !") + dataRegister?.status === 0
        ? setStatusRegister(true)
        : setStatusRegister(false);
  };

  const handleSubmit = React.useCallback(() => {
    if (
      value.email === "" ||
      value.password === "" ||
      value.confirmpassword === ""
    ) {
      setCheckFieldInput(true);
      setCheckEmail(false);
      setTimeout(() => {
        setCheckFieldInput(false);
      }, 5000);
    } else if (!validateEmail(value.email)) {
      setCheckFieldInput(false);
      setCheckEmail(true);
      setTimeout(() => {
        setCheckEmail(false);
      }, 5000);
    } else if (value.confirmpassword !== value.password) {
      setCheckFieldInput(false);
      setCheckEmail(false);
      setCheckMatchPassword(true);
      setTimeout(() => {
        setCheckMatchPassword(false);
      }, 5000);
    } else if (value.password.length < 6) {
      setCheckLengthPassword(true);
      setTimeout(() => {
        setCheckLengthPassword(false);
      }, 5000);
    } else {
      fetchRegister();
      setTimeout(() => {
        setValue({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
        });
      }, 2000);
    }
  }, [value]);

  return (
    <div className="px-main]">
      <div className="w-[100%] gap-10 flex justify-between h-screen bg-white">
        <div className="w-[45%] ml-10">
          <img className="object-cover " src={imgregister}></img>
        </div>
        <div className="w-[55%] ml-20 mt-10">
          <h2 className="font-serif uppercase text-[30px] font-semibold">
            Đăng ký
          </h2>
          <span className="text-gray-700 text-[14px] font-serif">
            Chào bạn, nếu bạn chưa có tài khoản hãy thực hiện đăng kí phía
            dưới...
          </span>
          <InputField
            nameKey={"firstName"}
            value={value.firstName}
            setValue={setValue}
          ></InputField>
          <InputField
            nameKey={"lastName"}
            value={value.lastName}
            setValue={setValue}
          ></InputField>
          <InputField
            nameKey={"email"}
            value={value.email}
            setValue={setValue}
          ></InputField>
          {checkEmail && (
            <ErrText err={"Thông tin bạn nhập phải là email"}></ErrText>
          )}
          <InputField
            nameKey={"phone"}
            type={"number"}
            value={value.phone}
            setValue={setValue}
          ></InputField>
          <InputField
            nameKey={"password"}
            value={value.password}
            type={"password"}
            setValue={setValue}
          ></InputField>
          {checkLengthPassword && (
            <ErrText err={"Mật khẩu phải nhiều hơn 6 ký tự"}></ErrText>
          )}
          <InputField
            nameKey={"confirmpassword"}
            value={value.confirmpassword}
            type={"password"}
            setValue={setValue}
          ></InputField>
          <small>{statusRegister && "Tạo tài khoản thành công"}</small>
          {checkFieldInput && (
            <ErrText err={"Trường thông tin bạn không được bỏ trống"}></ErrText>
          )}
          {checkMatchPassword && (
            <ErrText err={"Mật khẩu xác nhận không đúng"}></ErrText>
          )}
          <Button
            onSubmit={handleSubmit}
            type={"register"}
            text={"Đăng ký"}
          ></Button>
          <div className="flex mt-2 gap-2">
            <div>
              <Link to={path.LOGIN}>
                <span className="font-serif font-medium text-gray-700 text-[15px]">
                  Quay lại đăng nhập
                </span>
              </Link>
            </div>
            <div>
              <Link to={path.HOME}>
                <span className="font-serif font-medium text-colorCyanMain font-semibold text-[15px]">
                  Quay lại trang chủ...
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
