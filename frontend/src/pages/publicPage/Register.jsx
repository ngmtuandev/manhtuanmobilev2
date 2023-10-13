import React, { useState } from 'react'
import InputField from '../../component/PublicComponent/InputField'
import Button from '../../component/PublicComponent/Button'
import fetchApiRegister from '../../api/fetchApiRegister'
import path from '../../untils/path'
import { Link } from 'react-router-dom'
const Register = () => {
    const [statusRegister, setStatusRegister] = useState(null)
    const [value, setValue] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
      })
      
      const fetchRegister = async () => {
        // console.log(value)
        const dataRegister = await fetchApiRegister(value)
        console.log('dataRegister >>>', dataRegister)
        if (+dataRegister?.status === 0) alert('Vui lòng kiểm tra email của bạn !')
        +dataRegister?.status === 0 ? setStatusRegister(true) : setStatusRegister(false)
    }

      const handleSubmit = React.useCallback(() => {
        fetchRegister()
        setTimeout(() => {
          setValue({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: ''
          })
        }, 2000)
      }, [value])
  return (
    <div className="px-main]">
      <div className="w-[400px] h-[500px] bg-white">
        <h3>Login</h3>
        <InputField nameKey={'firstName'} value={value.firstName} setValue={setValue}></InputField>
        <InputField nameKey={'lastName'} value={value.lastName} setValue={setValue}></InputField>
        <InputField nameKey={'email'} value={value.email} setValue={setValue}></InputField>
        <InputField nameKey={'phone'} value={value.phone} setValue={setValue}></InputField>
        <InputField nameKey={'password'} value={value.password} type={'password'} setValue={setValue}></InputField>
        <small>{statusRegister && 'Tạo tài khoản thành công'}</small>
        <Button onSubmit={handleSubmit} text={'Đăng ký'}></Button>
        <div>
          <Link to={path.LOGIN}>
            <small>Quay lại đăng nhập</small>
          </Link>
          <Link to={path.HOME}>
            <small>Quay lại trang chủ</small>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register