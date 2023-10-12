import React from 'react'
import { useParams } from 'react-router-dom'
const DetailProduct = () => {
    const {id, name} = useParams()
    console.log('id ??? name ???? ', id, name)
  return (
    <div>DetailProduct</div>
  )
}

export default DetailProduct