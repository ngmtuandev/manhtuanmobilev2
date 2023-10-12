import React, { useState } from 'react'

const InputField = ({value, setValue, nameKey, type, invalidField, setInvalidField}) => {
    const [isLabel, setIsLabel] = useState(false)
  return (
    <div className='relative'>
        {
            isLabel && <div className='absolute left-4 -top-1 bg-white px-[5px]'>
            <label>{nameKey}</label>
        </div>
        }
        <input
        type={type || 'text'}
        placeholder={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onFocus={() => {
            setIsLabel(true)
        }}
        onBlur={() => setIsLabel(false)}
        className='outline-none w-[85%] h-[35px] rounded-xl px-[15px] border-2 my-2'
        onChange={(e) => setValue(data => ({...data, [nameKey] : e.target.value}))}
        ></input>
    </div>
  )
}

export default InputField