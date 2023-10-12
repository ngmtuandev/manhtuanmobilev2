import React, { useCallback, useState } from "react";
import InputField from "../../component/PublicComponent/InputField";
import Button from "../../component/PublicComponent/Button";
import { Link } from 'react-router-dom'
import path from "../../untils/path";
import fetchApiLogin from "../../api/fetchApiLogin";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [value, setValue] = useState({
    email: '',
    password: '',
    confirmpassword: ''
  })

  const fetchLogin = async () => {
    // console.log(value)
    const dataLogin = await fetchApiLogin(value)
    console.log('dataLogin >>>', dataLogin)
    if (+dataLogin?.status === 0) {
      dispatch(login({...value, accessToken: dataLogin?.accessToken}))
      navigate(`${path.PUBLIC}`)
    }
    // +dataLogin?.status === 0 ? setStatusRegister(true) : setStatusRegister(false)
}

  const handleSubmit = useCallback(() => {
    fetchLogin()
  }, [value])

  return (
    <div className="px-main]">
      <div className="w-[400px] h-[500px] bg-white">
        <h3>Login</h3>
        <InputField nameKey={'email'} value={value.email} setValue={setValue}></InputField>
        <InputField nameKey={'password'} value={value.password} type={'password'} setValue={setValue}></InputField>
        <InputField nameKey={'confirmpassword'} value={value.confirmpassword} type={'password'} setValue={setValue}></InputField>
        <Button onSubmit={handleSubmit} text={'Đăng nhập'}></Button>
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
