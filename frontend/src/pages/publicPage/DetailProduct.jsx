import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getApiDetailProduct from '../../api/getApiDetailProduct'
import BreadCumbs from '../../component/PublicComponent/BreadCumbs'
const DetailProduct = () => {
    const [product, setProduct] = useState([])
    const {id, name, category} = useParams()
    // console.log('id >>>>', id, 'name >>>>', name, 'category >>>>', category)
    // console.log('breadcrumbs >>>>>', breadcrumbs)
    useEffect(() => {
      (async() => {
        const dataProduct = await getApiDetailProduct(id)
        setProduct(dataProduct?.data)
      })()
    }, [id])
    // console.log('product current >>>>', product)
  return (
    <div>
      <BreadCumbs title = {name} category = {category}></BreadCumbs>
      {product?.title}
    </div>
  )
}

export default DetailProduct