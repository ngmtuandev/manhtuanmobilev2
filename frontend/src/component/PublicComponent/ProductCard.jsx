import React, { useState } from 'react'
import { formatMoney } from '../../untils/fnSuppport'

const ProductCard = ({product}) => {
    const [showSelect, setShowSelect] = useState(true)
  return (
    <div className='flex-col justify-center items-center'>
        <div className='relative'>
            <img 
            onMouseEnter={() => {
                setShowSelect(false)
                console.log('set showwww >>>', showSelect)
              }} 
                onMouseOut={() => {
                setShowSelect(true)
                console.log('set showwww out>>>', showSelect)
              }}
            src={product?.img.length > 0 ? product?.img[0] : 'https://i.pinimg.com/originals/8a/b2/1b/8ab21b1edaa6d6d3405af14cd018a91b.jpg'} alt="" />
            <div className='absolute top-2'>
                {
                    product?.desc?.map((item, index) => {
                        // 'w-[200px] hidden bg-slate-400'
                        return <div key={index} className={`w-[200px] ${showSelect && 'hidden'} bg-slate-400`}>
                            <span className='text-[4px]'>{item}</span>
                        </div>
                    })
                }
            </div>
        </div>
        <div className='flex-col justify-center items-center'>
            <h3>{product?.title}</h3>
            <p>{formatMoney(product?.price)} VNĐ</p>
            <p>Đã bán : {product?.selled}</p>
        </div>
    </div>
  )
}

export default ProductCard