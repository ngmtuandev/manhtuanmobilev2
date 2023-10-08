import React from 'react'

const ProductCardTab = ({product}) => {
    console.log('product >>>>', product)
  return (
    <div className='mx-2 flex flex-col justify-center items-center'>
        <img 
        className='w-[200px]'
        src={product?.img.length > 0 
        ? product?.img[0] 
        : 'https://i.pinimg.com/originals/8a/b2/1b/8ab21b1edaa6d6d3405af14cd018a91b.jpg'}></img>
        <div>
            <h3>{product?.title}</h3>
            <span>{product?.price}</span>
        </div>
    </div>
  )
}

export default ProductCardTab