import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Slider, { Settings } from 'react-slick'
import { productData } from '~/assets/datas/productData'
import { productDetailData } from '~/assets/datas/productDetailData'
import { Product as ProductType } from '~/types/product.type'
import { generateSlug } from '~/utils/utils'

interface Product {
  name: string
  images: string[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const products: ProductType[] = await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(productData)
  //   }, 1000)
  // })

  const paths = productData.map((product) => ({ params: { slug: generateSlug(product.name, product.id) } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ product: Product }> = async ({ params }) => {
  // const product: Product = await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(productDetailData)
  //   }, 1000)
  // })

  return {
    props: {
      product: productDetailData,
    },
  }
}

export default function ProductDetail({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
  // const sliderSettings: Settings = {}

  return (
    <div className='c-container'>
      {/* Image */}
      <div>
        <div className='relative aspect-square'>
          <Image
            src='/images/products/laptop-gaming-asus-rog-flow-x16-gv601vv-nl016w.jpg'
            alt=''
            fill
            priority
            className='object-contain'
          />
        </div>
        <div>
          {/* <Slider {...sliderSettings}>
            {productDetailData.images.map(i)}
          </Slider> */}
        </div>
      </div>
    </div>
  )
}
