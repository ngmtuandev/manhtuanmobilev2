import React, { useCallback, useState } from "react";
import InputField from "../../component/PublicComponent/InputField";
import Button from "../../component/PublicComponent/Button";

const Login = () => {
  const [value, setValue] = useState({
    name: '',
    useName: '',
    password: '',
  })

  const handleSubmit = useCallback(() => {
    console.log('data input >>>', value)
  }, [value])

  return (
    <div className="px-main]">
      <div className="w-[400px] h-[500px] bg-white">
        <h3>Login</h3>
        <InputField nameKey={'name'} value={value.name} setValue={setValue}></InputField>
        <InputField nameKey={'useName'} value={value.useName} setValue={setValue}></InputField>
        <InputField nameKey={'password'} value={value.password} type={'password'} setValue={setValue}></InputField>
        <Button onSubmit={handleSubmit} text={'Đăng nhập'}></Button>
      </div>
    </div>
  );
};

export default Login;
