import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import DOMPurify from 'isomorphic-dompurify'
import map from 'lodash/map'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { productData, productDetailData } from '~/assets/datas/productData'
import { productDetailSlogan } from '~/assets/datas/sloganData'
import ProductItem from '~/components/ProductItem'
import RatingStars from '~/components/RatingStars'
import { Product } from '~/types/product.type'
import { generateSlug, numberAsCurrency, statusTextFromQuantity } from '~/utils/utils'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = productData.map((product) => ({ params: { slug: generateSlug(product.name, product.id) } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ product: Product }> = async ({ params }) => {
  return {
    props: {
      product: productDetailData,
    },
  }
}

export default function ProductDetail({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const refDescription = useRef<HTMLDivElement>(null)
  const [showDescription, setShowDescription] = useState(false)

  const title = `${productDetailData.name} | MemoryZone`

  const sliderSettings: Settings = {
    slidesToShow: 3,
    arrows: false,
    swipeToSlide: true,
    centerMode: true,
    infinite: productDetailData.images.length > 5 ? true : false,
    focusOnSelect: true,
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className='c-container'>
        <div className='grid grid-flow-row grid-cols-12 gap-5'>
          <section className='col-span-12 grid auto-rows-max grid-cols-1 gap-5 md:grid-cols-2 lg:col-span-9 lg:grid-cols-12'>
            {/* Image */}
            <div className='lg:col-span-5'>
              {/* Large image */}
              <div className='relative aspect-square rounded shadow'>
                <Image
                  src={`/images/product_detail/${product.images[currentIndex]}`}
                  alt=''
                  fill
                  priority
                  className='object-contain p-2'
                  sizes='(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 370px'
                />
              </div>
              {/* Thumbnail */}
              <div className='mt-2'>
                <Slider {...sliderSettings}>
                  {productDetailData.images.map((item, index) => (
                    <div key={index} className='px-1'>
                      <div
                        className={classNames('relative aspect-square cursor-pointer rounded border-2 border-dashed', {
                          'border-primary': currentIndex === index,
                          'border-slate-200': currentIndex !== index,
                        })}
                        onClick={() => setCurrentIndex(index)}
                      >
                        <Image
                          src={`/images/product_detail/${item}`}
                          alt={product.name}
                          fill
                          className='object-contain p-1'
                          sizes='(max-width: 767px) 200px, (max-width: 1023px) 120px, 55px'
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            {/* Name and price */}
            <div className='md:col-start-2 md:row-span-3 lg:col-span-7'>
              {/* Name */}
              <h1 className='text-2xl font-medium text-dark'>{product.name}</h1>
              {/* Stars */}
              <RatingStars rating={product.rating} classNameStars='w-6 h-6' classNameWrapper='mt-2' />
              {/* Brand and status */}
              <div className='mt-2 flex items-center gap-2 text-sm'>
                <p>
                  Thương hiệu: <span className='font-medium text-primary'>{product.brand}</span>
                </p>
                <span>|</span>
                <p>
                  Tình trạng:
                  <span
                    className={classNames('font-medium', {
                      'text-blue-500': product.quantity === -1,
                      'text-danger': product.quantity === 0,
                      'text-warn': product.quantity <= 5,
                      'text-primary': product.quantity > 5,
                    })}
                  >
                    {statusTextFromQuantity(product.quantity)}
                  </span>
                </p>
              </div>
              {/* Price */}
              <div className='mt-2 flex items-end gap-5'>
                <p className='text-2xl font-medium text-primary'>
                  {numberAsCurrency(product.priceDiscount)}
                  <sup>đ</sup>
                </p>
                <del className='text-gray'>
                  {numberAsCurrency(product.price)}
                  <sup>đ</sup>
                </del>
              </div>
              {/* Promotions */}
              <div
                className='mt-5 rounded border border-dashed border-primary p-3'
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.promotion) }}
              />
              {/* Buttons */}
              <div className='mt-5 grid gap-2 lg:grid-cols-2'>
                <div>
                  <button className='w-full rounded bg-primary py-2 text-white'>
                    <p className='text-sm font-medium uppercase'>Mua ngay</p>
                    <p className='text-xs'>Giao hàng miễn phí tận nơi</p>
                  </button>
                </div>
                <div>
                  <button className='w-full rounded bg-danger py-2 text-white'>
                    <p className='text-sm font-medium uppercase'>Trả góp</p>
                    <p className='text-xs'>Duyệt nhanh qua điện thoại</p>
                  </button>
                </div>
                <div className='lg:col-span-2'>
                  <button className='w-full rounded bg-warn py-2 text-white'>
                    <p className='text-sm font-medium uppercase'>Trả góp 0% qua thẻ Visa, Master, JCB</p>
                    <p className='text-xs'>
                      Áp dụng cho đơn hàng từ 3.000.000<sup>đ</sup>
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className='lg:col-span-5'>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.shortSpecs) }} />
            </div>
          </section>

          {/* Description and specifications */}
          <section className='col-span-12 lg:col-span-9'>
            <Tab.Group>
              <Tab.List className='flex flex-col gap-1 md:flex-row'>
                {['Mô tả sản phẩm', 'Thông số kỹ thuật'].map((item, index) => (
                  <Tab
                    key={index}
                    className='border border-slate-300 p-2 text-left text-sm font-bold uppercase text-[#444] outline-none data-[headlessui-state=selected]:border-b-2 data-[headlessui-state=selected]:border-b-primary data-[headlessui-state=selected]:text-primary md:rounded-t md:border-none md:bg-[#f2f2f2] md:px-4 md:data-[headlessui-state=selected]:bg-primary md:data-[headlessui-state=selected]:text-white'
                  >
                    {item}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className='mt-1 border border-[#e5e5e5] p-5 outline-none md:mt-0'>
                {/* Description */}
                <Tab.Panel className='text-sm outline-none'>
                  <div
                    className='relative max-h-[350px] overflow-hidden'
                    style={showDescription ? { maxHeight: `${(refDescription.current?.clientHeight || 0) + 1}px` } : {}}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
                      ref={refDescription}
                    />
                    {!showDescription && (
                      <span className='absolute left-0 bottom-0 h-[120px] w-full bg-gradient-to-t from-white to-transparent' />
                    )}
                  </div>
                  <div className='text-center'>
                    <button
                      className='mx-auto mt-5 rounded border border-primary px-5 py-1 text-primary'
                      onClick={() => setShowDescription((prev) => !prev)}
                    >
                      {showDescription ? 'Thu gọn' : 'Xem đầy đủ'}
                    </button>
                  </div>
                </Tab.Panel>

                {/* Specifications */}
                <Tab.Panel>
                  <table className='w-full border-collapse border border-slate-300 text-sm'>
                    <tbody>
                      {product.specifications.map((item, index) => (
                        <tr className='border border-slate-300 odd:bg-[#f9f6d1]' key={index}>
                          <th className='w-[120px] shrink-0 border border-slate-300 pr-2 text-right sm:w-[200px]'>
                            {item.name}
                          </th>
                          <td className='border border-slate-300 p-2'>
                            {typeof item.value === 'string' ? (
                              item.value
                            ) : (
                              <ul className='list-outside list-disc pl-4'>
                                {item.value.length > 0 && item.value.map((li, index) => <li key={index}>{li}</li>)}
                              </ul>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </section>

          {/* Right sidebar when min-width 1024px */}
          <aside className='col-span-3 col-start-10 row-span-3 row-start-1 hidden lg:block'>
            {/* Slogan */}
            <div className='flex flex-col gap-5 divide-y divide-slate-300 rounded-lg border border-primary px-3 py-5'>
              {productDetailSlogan.map((item, index) => (
                <div
                  className={classNames('flex gap-3', {
                    'pt-5': index !== 0,
                  })}
                  key={index}
                >
                  <div className='w-[35px] flex-shrink-0'>
                    <Image
                      src={`/images/icons/${item.icon}`}
                      alt={item.title}
                      width={35}
                      height={30}
                      className='h-auto'
                    />
                  </div>
                  <div className='text-sm text-gray'>
                    <p className='font-bold uppercase'>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* You will like */}
            <div className='mt-10'>
              <h3 className='rounded bg-primary py-2 px-5 text-lg font-bold uppercase text-white'>Có thể bạn thích</h3>
              <ul>
                {productData
                  .filter((product) => map(product.categories, 'name').includes('Laptop'))
                  .slice(0, 5)
                  .map((product) => (
                    <li key={product.id}>
                      <ProductItem
                        product={product}
                        classNameLink='flex shadow rounded p-2 gap-2'
                        classNameWrapper='my-1'
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
