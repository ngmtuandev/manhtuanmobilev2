import React from 'react'

const Button = ({style, text, onSubmit}) => {
  return (
    <div>
        <button 
        onClick={onSubmit}
        className='w-[100px] h-[30px] bg-colorCyan text-gray-100'>{text}</button>
    </div>
  )
}

export default Button