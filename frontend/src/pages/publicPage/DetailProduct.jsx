import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getApiDetailProduct from '../../api/getApiDetailProduct'
import BreadCumbs from '../../component/PublicComponent/BreadCumbs'
import SliderSlick from "react-slick";
import ReactImageMagnify from 'react-image-magnify';
import {formatPrice, formatMoney, renderStarProduct} from '../../untils/fnSuppport'
import { create } from "zustand";

const useApiCounter = create((set) => ({
  apiCallCount: 0,
  incrementApiCallCount: () => set((state) => ({ apiCallCount: state.apiCallCount + 1 })),
}));

const DetailProduct = () => {
    const [product, setProduct] = useState([])
    const [imgCurrent, setImgCurrent] = useState(product?.img)
    // const [totalView, setTotalView] = useState(0)
    const {id, name, category} = useParams()
    // console.log('id >>>>', id, 'name >>>>', name, 'category >>>>', category)
    // console.log('breadcrumbs >>>>>', breadcrumbs)

    const { apiCallCount, incrementApiCallCount } = useApiCounter(); 


    useEffect(() => {
      (async() => {
        const dataProduct = await getApiDetailProduct(id)
        incrementApiCallCount();
        setProduct(dataProduct?.data)
        setImgCurrent(product?.img)
      })()
    }, [id])

    const settings = {
      prevArrow: false,
      nextArrow: false,
      slidesToShow: 3,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
    };
    console.log('product current >>>>', product)
  return (
    <div className='px-main'>
      <div>
        {product?.title}
        <BreadCumbs title = {name} category = {category}></BreadCumbs>
      </div>
      
      <div className='flex justify-center gap-8'>
        <div className='w-[33%] h-screen'>
          <div className='w-full h-[500px] border-none z-50 flex justify-center items-center'>
          <ReactImageMagnify {...{
              smallImage: {
                alt: 'product',
                isFluidWidth: true,
                src: imgCurrent || product?.img
              },
              largeImage: {
                src: imgCurrent,
                width: 800,
                height: 800
              }
            }} />
            {/* <img src={imgCurrent}></img> */}
          </div>
          <div className=' mt-4 '>
            <SliderSlick {...settings}>
            {
              product?.img?.map(el => {
                return <div 
                onClick={() => setImgCurrent(el)}
                className=' w-[150px] flex justify-center items-center 
                h-[150px] overflow-hidden'>
                  <img className='object-contain mx-4' src={el}></img>
                </div>
              })
            }
            </SliderSlick>
          </div>
        </div>
        <div className='w-[40%] h-screen '>
            <div>
              <h3 className='font-semibold text-[40px]'>{product?.title}</h3>
            </div>
            <div>
              <span>Lượt xem : {apiCallCount}</span>
            </div>
            <div>
              <div className='flex items-center'>
                <span className='font-bold text-red-600 text-[40px]'>{formatMoney(product?.price)} VNĐ</span>
                <span className='border-l-[1px] ml-3 pl-[10px]'>Giá đã bao gồm VAT</span>
              </div>
              <span>{product?.discount > 0 ? formatMoney((product?.price * product?.discount) / 100) 
              : 'Sản phẩm không thuộc chương trình khuyến mãi'}</span>
            </div>
            <div className='flex mt-2 gap-2'>
              {renderStarProduct(product?.ratings?.length || 3)}
            </div>
        </div>
        <div className='w-[23%] h-screen bg-slate-600'>info shop</div>
      </div>
    </div>
  )
}

export default DetailProduct