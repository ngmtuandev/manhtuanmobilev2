import React, { useCallback, useState } from "react";
import InputField from "../../component/PublicComponent/form/InputField";
import Button from "../../component/PublicComponent/Button";
import { Link } from "react-router-dom";
import path from "../../untils/path";
import { useFetchApi } from "../../hook/useFetchApi";
import { login } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../untils/fnSuppport";
import ErrText from "../../component/PublicComponent/ErrText";
import { useLocation } from "react-router-dom";
import withHocBase from "../../hocs/withHocBase";
import imglogin from "../../asset/login.svg";

const Login = ({ dispatch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkLengthPassword, setCheckLengthPassword] = useState(false);
  const [checkFieldInput, setCheckFieldInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("location : ", location?.state?.pathname);

  const [value, setValue] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { apiLogin } = useFetchApi();

  const fetchLogin = async () => {
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
    } else if (value.password.length < 6) {
      setCheckLengthPassword(true);
      setTimeout(() => {
        setCheckLengthPassword(false);
      }, 5000);
    } else {
      setIsLoading(true);
      const dataLogin = await apiLogin(value);
      setIsLoading(false);
      console.log("dataLogin >>>", dataLogin);
      if (+dataLogin?.status === 0) {
        dispatch(login({ ...value, accessToken: dataLogin?.accessToken }));
        if (location?.state) {
          navigate(`${location?.state?.pathname}`);
          return;
        }
        if (dataLogin?.data?.role === "user") {
          navigate(`${path.PUBLIC}`);
          return;
        }
        if (dataLogin?.data?.role === "admin") {
          navigate(`${path.PUBLIC_ADMIN}`);
          return;
        }
      }
    }
  };

  const handleSubmit = useCallback(() => {
    fetchLogin();
  }, [value]);

  return (
    <div className="px-main flex mt-[5%] justify-center items-center">
      <div className="w-[100%] gap-10 flex justify-between h-screen bg-white">
        <div className="w-[45%] ml-10">
          <img className=" object-cover " src={imglogin}></img>
        </div>
        <div className="w-[55%] ml-20 mt-10">
          <h2 className="font-serif uppercase text-[30px] font-semibold">
            Đăng nhập
          </h2>
          <span className="text-gray-700 text-[14px] font-serif">
            Đăng nhập để sử dụng dịch vụ của chúng tôi nhé !
          </span>
          <InputField
            nameKey={"email"}
            value={value.email}
            setValue={setValue}
          ></InputField>
          {checkEmail && (
            <ErrText err={"Thông tin bạn nhập phải là email"}></ErrText>
          )}
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
          {checkFieldInput && (
            <ErrText err={"Trường thông tin bạn không được bỏ trống"}></ErrText>
          )}
          <div className="mt-2">
            <Button
              isLoading={isLoading}
              onSubmit={handleSubmit}
              text={"Đăng nhập"}
              type={"login"}
            ></Button>
          </div>
          <div className="text-center items-center mt-4 flex">
            <span className="font-serif text-gray-700 text-[15px]">
              Bạn chưa có tài khoản ?
            </span>
            <Link to={path.REGISTER}>
              <span className="font-serif text-colorCyanMain text-[15px] ml-1 font-bold">
                Đăng ký tài khoản
              </span>
            </Link>
          </div>
          <div>
            <Link to={path.HOME}>
              <span className="font-serif font-medium text-gray-700 text-[15px]">
                Quay lại trang chủ...
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withHocBase(Login);
