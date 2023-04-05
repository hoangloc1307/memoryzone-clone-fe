import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cartData } from '~/datas/cartData'
import QuantityController from '~/components/QuantityController'
import { generateSlug } from '~/utils/url'
import { numberAsCurrency } from '~/utils/utils'

export default function CartPage() {
  const [quantity, setQuantity] = useState(cartData.map((item) => item.quantity))

  const handleQuantityChange = (value: number, index: number, enable: boolean) => {
    if (enable) {
      const temp = [...quantity]
      temp[index] = value
      setQuantity(temp)
    }
  }

  return (
    <>
      <div className='c-container'>
        <p className='mb-10 text-lg font-bold text-[#444]'>Giỏ hàng của bạn</p>
        <div className='hidden font-semibold text-[#444] lg:flex'>
          <div className='w-[150px] shrink-0 text-center'>Ảnh sản phẩm</div>
          <div className='grid flex-grow grid-cols-12'>
            <div className='col-span-4 text-center'>Tên sản phẩm</div>
            <div className='col-span-8 grid grid-cols-3'>
              <div className='text-center'>Đơn giá</div>
              <div className='text-center'>Số lượng</div>
              <div className='text-center'>Thành tiền</div>
            </div>
          </div>
          <div className='w-10 shrink-0'></div>
        </div>
        {/* Items */}
        <ul className='space-y-5 divide-y divide-slate-300'>
          {cartData.map((item, index) => (
            <li key={item.id} className='flex items-center gap-5 pt-5 text-sm first:pt-0 lg:gap-0'>
              {/* Image */}
              <Link
                href={`/products/${generateSlug(item.image, item.id)}`}
                className='relative aspect-square w-[100px] shrink-0 md:w-[150px]'
              >
                <Image src={`/images/products/${item.image}`} alt={item.name} fill className='object-contain' />
              </Link>
              {/* Name ad price */}
              <div className='flex-grow lg:grid lg:grid-cols-12'>
                <Link
                  href={`/products/${generateSlug(item.image, item.id)}`}
                  className='line-clamp-3 lg:col-span-4 lg:px-3'
                >
                  {item.name}
                </Link>
                <div className='mt-4 items-center space-y-1.5 lg:col-span-8 lg:mt-0 lg:grid lg:grid-cols-3 lg:space-y-0'>
                  <p className='space-x-1 lg:space-x-0 lg:text-center'>
                    <span className='lg:hidden'>Đơn giá:</span>
                    <span className='font-medium text-primary'>
                      {numberAsCurrency(item.price)}
                      <sup>đ</sup>
                    </span>
                  </p>
                  <div className='lg:text-center'>
                    <QuantityController
                      value={quantity[index]}
                      max={100}
                      onDecrease={(value) => handleQuantityChange(value, index, quantity[index] > 1)}
                      onIncrease={(value) => handleQuantityChange(value, index, quantity[index] < 100)}
                      onFocusOut={(value) => handleQuantityChange(value, index, value !== quantity[index])}
                    />
                  </div>
                  <p className='space-x-1 lg:space-x-0 lg:text-center'>
                    <span className='lg:hidden'>Thành tiền:</span>
                    <span className='font-medium text-primary'>
                      {numberAsCurrency(item.price * quantity[index])}
                      <sup>đ</sup>
                    </span>
                  </p>
                </div>
              </div>
              {/* Delete */}
              <div className='w-10 shrink-0 text-center'>
                <button className='rounded-full border border-slate-300 p-2 text-slate-500 outline-none'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Total price */}
      <div className='mt-10 border-t border-slate-300'>
        <div className='c-container'>
          <div className='justify-around'>
            <div className='mt-5 flex items-end justify-between gap-20 lg:justify-end lg:pr-20'>
              <span className='text-sm font-medium uppercase lg:text-base'>Tổng tiền</span>
              <span className='text-lg font-medium text-primary'>
                {numberAsCurrency(cartData.reduce((total, item, index) => (total += item.price * quantity[index]), 0))}
                <sup>đ</sup>
              </span>
            </div>
            <div className='mt-5 flex flex-col justify-end gap-2 text-white lg:flex-row'>
              <button className='rounded bg-primary/90 px-3 py-2 text-sm font-medium uppercase hover:bg-primary lg:px-5 lg:text-base'>
                Tiến hành thanh toán
              </button>
              <button className='rounded bg-[#3d4356]/80 px-3 py-2 text-sm font-medium uppercase hover:bg-[#3d4356] lg:px-5 lg:text-base'>
                Tiếp tục mua hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
