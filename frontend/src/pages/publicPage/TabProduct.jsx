import React, { useEffect, useState } from 'react'
import getApiProduct from '../../api/getApiProduct'
import Slider from "react-slick";
import '../../component/styleCss/customSlick.css'
import ProductCardTab from './ProductCardTab';

const TabProduct = () => {
    const [tabCurr, setTabCurr] = useState(1)
    const [productNew, setProductNew] = useState([])
    const [productBestSelled, setProductBestSelled] = useState([])
    const listTabProduct = [
        {
            id: 1,
            title: 'Sản phẩm phổ biến'
        }, 
        {
            id: 2,
            title: 'Sản phẩm mới'
        }
    ]
    const fetchProduct = async () => {
        const dataProduct = await Promise.all([getApiProduct({sort: '-createdAt'}), getApiProduct({sort: '-selled'})])
        setProductNew(dataProduct[0]?.data)
        setProductBestSelled(dataProduct[1]?.data)
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    // console.log('data best selled >>>>>', productBestSelled)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
      };
  return (
    <div>
        <div className='flex px-main gap-3'>
            {
                listTabProduct.map(item => {
                    return <div 
                    onClick={() => setTabCurr(item.id)}
                    key={item.id} 
                    className={`px-[10px] py-[5px]  cursor-pointer rounded-2xl
                    ${+item.id === +tabCurr ? 'bg-colorCyan' : 'border border-colorCyan' }`}>
                            <span>{item.title}</span>
                        </div>
                })
            }
        </div>
        <div className='w-[80%] ml-[10%]'>
            <Slider {...settings}>
                {
                    +tabCurr === 1 ? productBestSelled?.map(item => {
                        return <ProductCardTab key={item?._id} product = {item}></ProductCardTab>
                    }) : productNew?.map(item => {
                        return <ProductCardTab key={item?._id} product = {item}></ProductCardTab>
                    })
                }
            </Slider>
        </div>
    </div>
  )
}

export default TabProduct