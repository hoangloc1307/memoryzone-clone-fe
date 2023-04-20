import React, { memo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export interface Props {
  label?: string
  defaultValue?: string[]
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
}

const InputList = ({ label, defaultValue, errorMessage, classNameWrapper, classNameInput }: Props) => {
  const [localValue, setLocalValue] = useState<string[]>(defaultValue || [])

  const handleRemove = (index: number) => () => {
    const value = localValue.filter((_, i) => index !== i)
    setLocalValue(value)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = localValue.map((item, i) => {
      if (index === i) {
        return event.target.value
      }
      return item
    })
    setLocalValue(value)
  }

  return (
    <div className={classNameWrapper}>
      <label className='block text-sm font-semibold empty:hidden'>{label}</label>
      {localValue.map((item, index) => (
        <div key={index} className='relative mt-2'>
          <input
            className={twMerge(
              'h-10 w-full rounded border border-slate-300 pl-3 pr-[52px] text-sm outline-none focus:ring-1 focus:ring-primary',
              classNameInput
            )}
            autoComplete='off'
            value={item}
            onChange={(event) => handleChange(event, index)}
          />

          {/* Delete button */}
          <button
            className='absolute top-1/2 right-0 -translate-y-1/2 border-l border-l-slate-300 p-2 hover:text-danger'
            onClick={handleRemove(index)}
            type='button'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
      ))}
      {/* <button
        type='button'
        className='mt-2 ml-auto mr-0 flex items-center gap-2 rounded bg-primary py-1 px-3 text-white'
        onClick={onAppend}
      >
        <span>
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
        </span>
        <span>Thêm</span>
      </button> */}
      <p className='mt-2 text-xs text-red-500 empty:hidden'>{errorMessage}</p>
    </div>
  )
}

export default memo(InputList)
