import React, { useState } from 'react'
import InputField from '../../component/PublicComponent/InputField'
import Button from '../../component/PublicComponent/Button'
import fetchApiRegister from '../../api/fetchApiRegister'
import path from '../../untils/path'
import { Link } from 'react-router-dom'
import ErrText from '../../component/PublicComponent/ErrText'
import { validateEmail } from '../../untils/fnSuppport'

const Register = () => {
    const [statusRegister, setStatusRegister] = useState(null)
    const [checkFieldInput, setCheckFieldInput] = useState(false)
    const [checkEmail, setCheckEmail] = useState(false)
    const [checkMatchPassword, setCheckMatchPassword] = useState(false)
    const [checkLengthPassword, setCheckLengthPassword] = useState(false)
    const [value, setValue] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        confirmpassword: ''
      })
      
      const fetchRegister = async () => {
        const dataRegister = await fetchApiRegister(value)
        console.log('dataRegister >>>', dataRegister)
        if (+dataRegister?.status === 0) alert('Vui lòng kiểm tra email của bạn !')
        +dataRegister?.status === 0 ? setStatusRegister(true) : setStatusRegister(false)
    }

      const handleSubmit = React.useCallback(() => {
        if (value.email === '' ||value.password === '' || value.confirmpassword === '')
        {
          setCheckFieldInput(true)
          setCheckEmail(false)
          setTimeout(() => {
            setCheckFieldInput(false)
          }, 5000)
        }
        else if (!validateEmail(value.email)) {
          setCheckFieldInput(false)
          setCheckEmail(true)
          setTimeout(() => {
            setCheckEmail(false)
          }, 5000)
        }
        else if (value.confirmpassword !== value.password) {
          setCheckFieldInput(false)
          setCheckEmail(false)
          setCheckMatchPassword(true)
          setTimeout(() => {
            setCheckMatchPassword(false)
          }, 5000)
        }
        else if (value.password.length < 6) {
          setCheckLengthPassword(true)
            setTimeout(() => {
              setCheckLengthPassword(false)
            }, 5000)
        }
        else {
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
        }
      }, [value])
      
  return (
    <div className="px-main]">
      <div className="w-[400px] h-[500px] bg-white">
        <h3>Login</h3>
        <InputField nameKey={'firstName'} value={value.firstName} setValue={setValue}></InputField>
        <InputField nameKey={'lastName'} value={value.lastName} setValue={setValue}></InputField>
        <InputField nameKey={'email'} value={value.email} setValue={setValue}></InputField>
        {
          checkEmail && <ErrText err={'Thông tin bạn nhập phải là email'}></ErrText>
        }
        <InputField nameKey={'phone'}  type={'number'} value={value.phone} setValue={setValue}></InputField>
        <InputField nameKey={'password'} value={value.password} type={'password'} setValue={setValue}></InputField>
        {
          checkLengthPassword && <ErrText err={'Mật khẩu phải nhiều hơn 6 ký tự'}></ErrText>
        }
        <InputField nameKey={'confirmpassword'} value={value.confirmpassword} type={'password'} setValue={setValue}></InputField>
        <small>{statusRegister && 'Tạo tài khoản thành công'}</small>
        {
          checkFieldInput && <ErrText err={'Trường thông tin bạn không được bỏ trống'}></ErrText>
        }
        {
          checkMatchPassword && <ErrText err={'Mật khẩu xác nhận không đúng'}></ErrText>
        }
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