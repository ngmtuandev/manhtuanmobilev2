import React, { useEffect, useState } from 'react'
import getApiProduct from '../../api/getApiProduct'
import TitleTop from './TitleTop'
import ProductCard from './ProductCard'

const ProductNewMyShop = () => {
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const getProducts = async () => {
        const rs = await getApiProduct({ limit: 10 })
        if (rs?.data.length > 0) {
            setProduct(rs?.data)
        }
    }
    useEffect(() => {
        setLoading(true)
        getProducts()
        setLoading(false)
    }, [])
    console.log('products >>>>', products)
  return (
    <div className='px-main'>
      <div>
        <TitleTop text={'Sản phẩm mới'}></TitleTop>
      </div>
      {
        loading ? 
        <div>
          <span>loading....</span>
        </div> : <div className='grid-cols-5 grid gap-4 mt-4'>
        {
          products?.map(el => {
            return <div key={el?._id}>
              <ProductCard product = {el}></ProductCard>
            </div>
          })
        }
      </div>
      }
    </div>
  )
}

export default ProductNewMyShop