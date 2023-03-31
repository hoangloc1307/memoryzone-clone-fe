import Image from 'next/image'
import Link from 'next/link'
import { cartData } from '~/assets/datas/cartData'
import { generateSlug } from '~/utils/url'
import { numberAsCurrency } from '~/utils/utils'

export default function CartPage() {
  return (
    <>
      <div className='c-container'>
        <p className='font-bold uppercase text-[#444]'>Giỏ hàng của bạn</p>
        {/* Items */}
        <ul className='mt-5 space-y-5 divide-y divide-slate-300'>
          {cartData.map((item) => (
            <li key={item.id} className='pt-5 first:pt-0'>
              <Link
                href={`/products/${generateSlug(item.name, item.id)}`}
                className='flex gap-2 text-sm md:items-center'
              >
                {/* Image */}
                <div className='w-[100px] shrink-0'>
                  <Image
                    src={`/images/products/${item.image}`}
                    alt={item.name}
                    width={100}
                    height={100}
                    className='object-contain'
                  />
                </div>
                {/* Name */}
                <div className='grow items-center justify-between gap-x-10 gap-y-2 md:flex md:px-5'>
                  <p className='line-clamp-3 md:line-clamp-none'>{item.name}</p>
                  <p className='mt-2 md:mt-0'>
                    <span className='mr-1 md:hidden'>Giá:</span>
                    <span className='text-primary'>
                      {numberAsCurrency(item.price)}
                      <sup>đ</sup>
                    </span>
                  </p>
                </div>
                {/* Hidden on mobile */}
                <div className='hidden w-1/3 shrink-0 items-center justify-between gap-2 px-5 md:flex lg:px-10 xl:px-16'>
                  <div className='flex'>
                    <button className='flex w-[30px] items-center justify-center border border-slate-300'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-5 w-5'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                      </svg>
                    </button>
                    <input
                      value={item.quantity}
                      onChange={() => {}}
                      className='h-[30px] w-10 border border-slate-300 text-center outline-none'
                    />
                    <button className='flex w-[30px] items-center justify-center border border-slate-300'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-5 w-5'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                      </svg>
                    </button>
                  </div>
                  <div className='text-primary'>
                    {numberAsCurrency(item.quantity * item.price)}
                    <sup>đ</sup>
                  </div>
                </div>
                {/* Button delêt */}
                <div className='self-center md:shrink-0'>
                  <button className='w-6 rounded-full p-1 text-danger/50 ring-2 ring-inset ring-danger/50'>
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
              </Link>
            </li>
          ))}
        </ul>
        {/* Total price */}
      </div>
      <div className='mt-10 border-t border-slate-300'>
        <div className='c-container'>
          <div className='justify-around md:flex'>
            <div className='mt-5 flex items-end justify-between gap-20 md:justify-start'>
              <span className='text-sm font-medium uppercase'>Tổng tiền</span>
              <span className='text-lg font-medium text-primary'>
                {numberAsCurrency(53_560_000)}
                <sup>đ</sup>
              </span>
            </div>
            <div className='mt-5 flex flex-col gap-2 text-white md:flex-row md:justify-start'>
              <button className='rounded bg-primary px-3 py-2 text-sm font-medium uppercase'>
                Tiến hành thanh toán
              </button>
              <button className='rounded bg-[#3d4356] px-3 py-2 text-sm font-medium uppercase'>
                Tiếp tục mua hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
