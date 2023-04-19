import { yupResolver } from '@hookform/resolvers/yup'
import DOMPurify from 'isomorphic-dompurify'
import debounce from 'lodash/debounce'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import Popover from '~/components/Popover'
import path from '~/constants/path'
import { productsData } from '~/datas/productData'
import useViewport from '~/hooks/useViewport'
import { ProductSearchSuggest } from '~/types/product.type'
import { SearchSchema, searchSchema } from '~/utils/rules'
import { highlightKeywordInText, numberAsCurrency } from '~/utils/utils'

export default function SearchBox() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [searchSuggest, setSearchSuggest] = useState<ProductSearchSuggest[] | []>([])
  const [loading, setLoading] = useState(false)
  const width = useViewport()
  const { handleSubmit, register } = useForm<SearchSchema>({ resolver: yupResolver(searchSchema) })
  const debounceCallApi = useRef(
    debounce((keyword: string) => {
      if (keyword) {
        const result: ProductSearchSuggest[] = productsData.filter((product) => {
          if (product.name.toLowerCase().includes(keyword.trim().toLowerCase())) {
            return {
              id: product.id,
              thumbnail: product.thumbnail,
              name: product.name,
              priceDiscount: product.priceDiscount,
              shortSpecs: product.shortSpecs,
            }
          }
        })
        setSearchSuggest(result)
      }
      setLoading(false)
    }, 800)
  ).current

  useEffect(() => {
    if (keyword.length === 0) {
      setSearchSuggest([])
      setLoading(false)
    }
  }, [keyword])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setKeyword(value)
    debounceCallApi(value)
    setLoading(true)
  }

  const handleSearchBoxSubmit: SubmitHandler<SearchSchema> = (data) => {
    router.push({
      pathname: path.search,
      query: { keyword },
    })
    setKeyword('')
  }

  return (
    <Popover
      floatingElement={
        <div className='relative z-10 rounded-sm bg-white text-black shadow-lg'>
          {keyword.length > 0 && searchSuggest.length > 0 && (
            <>
              <ul className='space-y-2.5 divide-y divide-slate-300 p-2'>
                {searchSuggest.slice(0, 4).map((product) => (
                  <li key={product.id} className='group pt-2.5 first:pt-0'>
                    <a href='#' className='flex items-center gap-2 hover:underline'>
                      <div className='relative aspect-square w-[80px] shrink-0'>
                        <Image src={`/images/products/${product.thumbnail}`} alt={product.name} fill sizes='80px' />
                      </div>
                      <div>
                        <p
                          className='font-medium line-clamp-3'
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(highlightKeywordInText(product.name, keyword)),
                          }}
                        />
                        <p className='mt-1 font-medium'>
                          Giá từ:{' '}
                          <span className='text-primary'>
                            {numberAsCurrency(product.priceDiscount)}
                            <sup>đ</sup>
                          </span>
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              {searchSuggest.length > 4 && (
                <Link
                  href={{
                    pathname: path.search,
                    query: { keyword },
                  }}
                  onClick={() => setKeyword('')}
                  className='mt-1 block border-t border-t-slate-300 py-3 text-center font-semibold hover:bg-primary hover:text-white hover:underline'
                >
                  Hiển thị tất cả kết quả cho: &apos;{keyword}&apos;
                </Link>
              )}
            </>
          )}
          {keyword.length > 0 && !loading && searchSuggest.length === 0 && (
            <p className='p-2 text-center'>Không tìm thấy kết quả cho: &apos;{keyword}&apos;</p>
          )}
        </div>
      }
      offsetOption={{ mainAxis: 4, crossAxis: 0 }}
      floatingElementWidth='100%'
      showOnHover={false}
      showOnFocus
      showOnClick={width < 1024}
    >
      <form
        autoComplete='off'
        spellCheck='false'
        className='peer relative flex rounded-sm bg-white p-0.5'
        onSubmit={handleSubmit(handleSearchBoxSubmit)}
      >
        <input
          type='text'
          value={keyword}
          className='flex-1 rounded-sm px-3 text-black outline-none'
          placeholder='Sản phẩm bạn muốn tìm...'
          {...register('keyword')}
          autoComplete='off'
          onChange={handleInputChange}
        />
        <button disabled={loading} className='shrink-0 rounded-sm bg-warn/80 px-6 py-2 hover:bg-warn' type='submit'>
          {loading && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 animate-spin'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
              />
            </svg>
          )}

          {!loading && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          )}
        </button>
      </form>
    </Popover>
  )
}
