import React from 'react'
import dataService from '../../untils/dataService'
const Service = () => {
  return (
    <div className=' w-screen grid grid-cols-4 gap-1 overflow-hidden'>
        {dataService.map(el => {
            return <div key={el.id} className='w-[85%] h-[80px] 
            flex-col justify-center items-center text-center pt-[5px] px-[10px] bg-colorCyan rounded-lg'>
                <p>{el.title}</p>
                <p>{el.desc}</p>
            </div>
        })}
    </div>
  )
}

export default Service