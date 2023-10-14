import React, { useState } from 'react'
import { renderStarProduct, formatMoney } from '../../untils/fnSuppport'
import HoverSelectProduct from '../../component/PublicComponent/HoverSelectProduct'

const ProductCardTab = ({product}) => {
    // console.log('product >>>>', product)
    const [showSelect, setShowSelect] = useState(true)
  return (
    <div
    onMouseEnter={() => {
      setShowSelect(false)
      // console.log('set showwww >>>', showSelect)
    }} 
    onMouseOut={() => {
      setShowSelect(true)
      // console.log('set showwww out>>>', showSelect)
    }}
    className='mx-2 flex flex-col justify-center relative items-center'>
        <img 
        className='w-[200px]'
        src={product?.img.length > 0 
        ? product?.img[0] 
        : 'https://i.pinimg.com/originals/8a/b2/1b/8ab21b1edaa6d6d3405af14cd018a91b.jpg'}></img>
        {
          !showSelect && <HoverSelectProduct></HoverSelectProduct>
        }
        <div>
            <h3>{product?.title}</h3>
            <span>{formatMoney(product?.price)} VNĐ</span>
            <div className='flex'>{renderStarProduct(product?.totalRating)}</div>
        </div>
    </div>  
  )
}

export default ProductCardTab