import { yupResolver } from '@hookform/resolvers/yup'
import debounce from 'lodash/debounce'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { searchSchema, SearchSchema } from '~/utils/rules'

export default function SearchBox() {
  const [keyword, setKeyword] = useState('')
  const [visible, setVisible] = useState(false)
  const { handleSubmit, register } = useForm<SearchSchema>({ resolver: yupResolver(searchSchema) })

  const debounceCallApi = useRef(
    debounce((keyword: string) => {
      if (keyword) {
        console.log(`Call API with keyword: ${keyword}`)
      }
    }, 500)
  ).current

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setKeyword(value)
    debounceCallApi(value)
  }

  const handleSearchBoxSubmit: SubmitHandler<SearchSchema> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <form className='relative flex rounded-sm bg-white p-0.5' onSubmit={handleSubmit(handleSearchBoxSubmit)}>
        <input
          type='text'
          value={keyword}
          className='flex-1 rounded-sm px-3 text-black outline-none'
          placeholder='Sản phẩm bạn muốn tìm...'
          {...register('keyword')}
          onChange={handleInputChange}
        />
        <button className='shrink-0 rounded-sm bg-warn px-6 py-2' type='submit'>
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
        </button>
      </form>
    </div>
  )
}
