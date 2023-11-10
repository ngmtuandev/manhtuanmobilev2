import React, { useCallback, useState } from "react";
import InputField from "../../component/PublicComponent/InputField";
import Button from "../../component/PublicComponent/Button";
import { Link } from "react-router-dom";
import path from "../../untils/path";
import fetchApiLogin from "../../api/fetchApiLogin";
import { useFetchApi } from "../../custom-hook/useFetchApi";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../untils/fnSuppport";
import ErrText from "../../component/PublicComponent/ErrText";
import { useLocation } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div className="px-main]">
      <div className="w-[400px] h-[500px] bg-white">
        <h3>Login</h3>
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
        <Button
          isLoading={isLoading}
          onSubmit={handleSubmit}
          text={"Đăng nhập"}
        ></Button>
        <div>
          <Link to={path.REGISTER}>
            <small>Đăng ký tài khoản</small>
          </Link>
          <Link to={path.HOME}>
            <small>Quay lại trang chủ</small>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
