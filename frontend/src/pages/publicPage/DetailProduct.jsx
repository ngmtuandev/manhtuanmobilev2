import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getApiDetailProduct from '../../api/getApiDetailProduct'
const DetailProduct = () => {
    const [product, setProduct] = useState([])
    const {id, name} = useParams()
    useEffect(() => {
      (async() => {
        const dataProduct = await getApiDetailProduct(id)
        setProduct(dataProduct?.data)
      })()
    }, [id])
    console.log('product current >>>>', product)
  return (
    <div>{product?.title}</div>
  )
}

export default DetailProduct