import classNames from 'classnames'
import Image from 'next/image'
import { footerCategoryData } from '~/assets/datas/footerCategoryData'
import { footerNavigationData } from '~/assets/datas/footerNavigationData'
import useViewport from '~/hooks/useViewport'

export default function Footer() {
  const width = useViewport()

  return (
    <footer>
      {/* Top */}
      <div className='c-container pb-5'>
        <div className='grid grid-cols-12 gap-y-3 divide-y divide-dotted divide-slate-300 md:divide-none'>
          {footerNavigationData.map((item, index) => (
            <div
              key={index}
              className={classNames('col-span-12 md:col-span-6', {
                'lg:col-span-3': index !== 0,
                'lg:col-span-2': index === 0,
              })}
            >
              <details className='group peer'>
                <summary className='flex items-center justify-between pb-1 pt-4'>
                  <h2 className='text-sm font-semibold uppercase'>{item.title}</h2>
                  {width < 768 && (
                    <span className='[transition:all_0.5s_ease-in-out] group-open:rotate-[135deg]'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='h-4 w-4'
                      >
                        <path
                          fillRule='evenodd'
                          d='M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                  )}
                </summary>
              </details>
              <ul className='max-h-0 overflow-hidden [transition:all_0.5s_ease-in-out] peer-open:max-h-[500px] md:max-h-max'>
                {item.children.map((child, index) => (
                  <li key={index}>
                    <a
                      href={child.url}
                      className='block py-2 text-xs text-gray hover:text-primary hover:underline'
                    >
                      {child.tiltle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className='col-span-12 md:col-span-6 lg:col-span-4'>
            <h2 className='pb-1 pt-4 text-sm font-semibold uppercase'>CTY TNHH DỊCH VỤ TIN HỌC SIÊU TỐC</h2>
            <p className='pt-2 text-sm text-[#444]'>
              Trụ sở chính: Số 91-93 Đường số 5, Phường An Phú, Tp. Thủ Đức, Thành phố Hồ Chí Minh
              <br />
              MST: 0311427563 - Cấp ngày 22 tháng 12 năm 2011 tại Sở Kế Hoạch Và Đầu Tư Thành phố Hồ Chí Minh
            </p>
            <ul className='mt-5 flex flex-col gap-3 text-gray'>
              <li className='text-sm'>
                <p className='font-semibold uppercase text-black'>SHOWROOM HỒ CHÍ MINH:</p>
                <p>Địa chỉ: 4C Đồng Xoài, Phường 13, Quận Tân Bình</p>
                <p>
                  Điện thoại: <span className='font-medium text-black'>(028) 7301 3878</span> - DĐ:{' '}
                  <span className='font-medium text-black'>0909 305 350</span>
                </p>
                <p>Mở cửa: 8h đến 21h từ thứ 2 đến CN</p>
              </li>
              <li className='text-sm'>
                <p className='font-semibold uppercase text-black'>SHOWROOM HÀ NỘI:</p>
                <p>Địa chỉ: 60 Phố Dịch Vọng Hậu, Dịch Vọng Hậu, Quận Cầu Giấy</p>
                <p>
                  Điện thoại: <span className='font-medium text-black'>(028) 7301 3878</span> - DĐ:{' '}
                  <span className='font-medium text-black'>0909 305 350</span>
                </p>
                <p>Mở cửa: 8h đến 21h từ thứ 2 đến CN</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className='border-t border-slate-300 pb-10'>
        <div className='c-container'>
          <div className='grid grid-cols-12 lg:gap-x-10'>
            <div className='col-span-12 md:col-span-12 lg:col-span-5'>
              <h2 className='py-5 text-sm font-semibold uppercase'>Đăng ký nhận tin khuyến mãi</h2>
              <form className='flex items-stretch gap-2'>
                <input
                  type='email'
                  placeholder='Nhập email của bạn'
                  className='flex-grow rounded border border-slate-300 bg-[#f8f8f8] px-5 py-1.5 text-xs outline-none'
                />
                <button className='flex-shrink rounded bg-primary px-5 text-xs text-white'>Đăng ký</button>
              </form>
            </div>
            <div className='col-span-12 md:col-span-6 lg:col-span-4'>
              <h2 className='py-5 text-sm font-semibold uppercase'>Phương thức thanh toán</h2>
              <Image
                src='/images/payment.png'
                alt='Phương thức thanh toán'
                width={350}
                height={33}
              />
            </div>
            <div className='col-span-12 md:col-span-6 lg:col-span-3'>
              <h2 className='py-5 text-sm font-semibold uppercase'>Kết nối với chúng tôi</h2>
              <ul className='flex gap-3'>
                <li>
                  <a href='#'>
                    <Image
                      src='/images/icons/facebook.png'
                      alt='Facebook'
                      width={32}
                      height={32}
                    />
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <Image
                      src='/images/icons/lazada.png'
                      alt='Lazada'
                      width={32}
                      height={32}
                    />
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <Image
                      src='/images/icons/shopee.png'
                      alt='Shopee'
                      width={32}
                      height={32}
                    />
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <Image
                      src='/images/icons/instagram.png'
                      alt='Instagram'
                      width={32}
                      height={32}
                    />
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <Image
                      src='/images/icons/youtube.png'
                      alt='Youtube'
                      width={32}
                      height={32}
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className='col-span-12'>
              <h2 className='py-5 text-sm font-semibold uppercase'>Danh mục sản phẩm</h2>
              <ul className='grid gap-3 md:grid-cols-2 lg:grid-cols-5'>
                {footerCategoryData.map((item, index) => (
                  <li
                    key={index}
                    className='text-[#898989]'
                  >
                    <h3 className='text-sm font-bold capitalize'>{item.title}</h3>
                    {item.children && item.children.length > 0 && (
                      <ul className='flex flex-wrap'>
                        {item.children.map((child, index) => (
                          <li
                            key={index}
                            className='text-xs capitalize'
                          >
                            {index !== 0 && <span className='px-1 text-xs'>/</span>}
                            <a href={child.url}>{child.title}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
