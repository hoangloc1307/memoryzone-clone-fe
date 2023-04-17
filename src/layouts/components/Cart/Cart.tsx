import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Popover from '~/components/Popover'
import QuantityController from '~/components/QuantityController'
import path from '~/constants/path'
import { cartData } from '~/datas/cartData'
import useViewport from '~/hooks/useViewport'
import { generateSlug } from '~/utils/url'
import { numberAsCurrency } from '~/utils/utils'

export default function Cart() {
  const width = useViewport()
  const [quantity, setQuantity] = useState(cartData.map((item) => item.quantity))

  const handleQuantityChange = (value: number, index: number, enable: boolean) => {
    if (enable) {
      const temp = [...quantity]
      temp[index] = value
      setQuantity(temp)
    }
  }
  return (
    <Popover
      floatingElement={
        <div className='relative z-10 w-[500px] rounded bg-white p-5 text-[#444] shadow-md'>
          {/* Items */}
          <ul className='space-y-2 divide-y divide-slate-300'>
            {cartData.map((item, index) => (
              <li key={item.id} className='flex items-center gap-2 pt-2 text-xs first:pt-0'>
                {/* Image */}
                <Link
                  href={`/products/${generateSlug(item.image, item.id)}`}
                  className='relative aspect-square w-[100px] shrink-0'
                >
                  <Image
                    src={`/images/products/${item.image}`}
                    alt={item.name}
                    fill
                    sizes='100px'
                    className='object-contain'
                  />
                </Link>
                {/* Name ad price */}
                <div className='flex-grow'>
                  <Link href={`/products/${generateSlug(item.image, item.id)}`} className='line-clamp-3'>
                    {item.name}
                  </Link>
                  <div className='mt-2 flex items-center justify-start gap-5'>
                    <p className='flex flex-col space-x-1'>
                      <span>Đơn giá:</span>
                      <span className='font-medium text-primary'>
                        {numberAsCurrency(item.price)}
                        <sup>đ</sup>
                      </span>
                    </p>
                    <div>
                      <QuantityController
                        value={quantity[index]}
                        max={100}
                        onDecrease={(value) => handleQuantityChange(value, index, quantity[index] > 1)}
                        onIncrease={(value) => handleQuantityChange(value, index, quantity[index] < 100)}
                        onFocusOut={(value) => handleQuantityChange(value, index, value !== quantity[index])}
                      />
                    </div>
                    <p className='flex flex-col space-x-1 '>
                      <span>Thành tiền:</span>
                      <span className='font-medium text-primary'>
                        {numberAsCurrency(item.price * quantity[index])}
                        <sup>đ</sup>
                      </span>
                    </p>
                  </div>
                </div>
                {/* Delete */}
                <div className='w-8 shrink-0 text-center'>
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
          {/* Total price */}
          <div className='mt-2 border-t border-slate-300'>
            <div className='mt-2 flex items-end justify-between'>
              <span className='text-sm font-medium uppercase'>Tổng tiền</span>
              <span className='text-lg font-medium text-primary'>
                {numberAsCurrency(cartData.reduce((total, item, index) => (total += item.price * quantity[index]), 0))}
                <sup>đ</sup>
              </span>
            </div>
            {/* Buttons */}
            <div className='mt-2 grid grid-cols-2 gap-5 text-white'>
              <button className='rounded bg-[#3d4356]/80 px-3 py-2 text-sm font-medium uppercase hover:bg-[#3d4356]'>
                Tiếp tục mua hàng
              </button>
              <button className='rounded bg-primary/90 px-3 py-2 text-sm font-medium uppercase hover:bg-primary'>
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        </div>
      }
      showArrow
      offsetOption={{ mainAxis: 8 }}
      placement='bottom-end'
      showOnHover={width >= 1024}
    >
      <Link href={path.cart} className='flex items-center justify-end gap-2'>
        <span className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white p-1'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
            <path
              fillRule='evenodd'
              d='M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z'
              clipRule='evenodd'
            />
          </svg>
        </span>
        <p className='flex flex-col'>
          <span className='font-bold'>
            (<span>{cartData.length}</span>) sản phẩm
          </span>
          <span className='text-[10px] text-[#ffdada]'>Giỏ hàng</span>
        </p>
      </Link>
    </Popover>
  )
}
