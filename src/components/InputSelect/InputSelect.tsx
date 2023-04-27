import classNames from 'classnames'
import { memo, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Popover from '../Popover'

interface Props {
  label?: string
  defaultValue?: {}
  options: {}[]
  disabled?: boolean
  propertyDisplay: string
  propertyValue: string
  required?: boolean
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  onChange?: (value: string | number) => void
  render?: (item: any, onClick: (item: {}) => () => void, index: number) => React.ReactNode
}

const InputSelect = ({
  label,
  defaultValue,
  options,
  disabled,
  errorMessage,
  classNameInput,
  classNameWrapper,
  propertyDisplay,
  propertyValue,
  required,
  onChange,
  render,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [localValue, setLocalValue] = useState<{}>(defaultValue ?? {})

  const handleItemClick = (item: {}) => () => {
    setLocalValue(item)
    inputRef.current?.click()
    onChange && onChange(item[propertyValue as keyof {}])
  }

  return (
    <div className={classNameWrapper}>
      <Popover
        floatingElement={
          <>
            {options && options.length > 0 && (
              <div className='c-scrollbar z-20 max-h-40 w-full overflow-auto rounded bg-white py-2 shadow ring-1 ring-black/5'>
                {options.map((item, index) => {
                  return render ? (
                    render(item, handleItemClick, index)
                  ) : (
                    <p
                      key={index}
                      className='bg-white px-3 py-2 hover:bg-primary/10 hover:text-primary'
                      onClick={handleItemClick(item)}
                    >
                      {item[propertyDisplay as keyof {}]}
                    </p>
                  )
                })}
              </div>
            )}
          </>
        }
        showOnHover={false}
        showOnClick
        floatingElementWidth={'100%'}
        offsetOption={{ mainAxis: 4 }}
      >
        <div className={disabled ? 'cursor-not-allowed' : ''}>
          {/* Label */}
          <label className='block text-sm font-semibold empty:hidden'>
            {label}
            {required && <span className='ml-0.5 text-red-500'>*</span>}
          </label>

          {/* Input */}
          <div className='relative mt-2'>
            <span
              ref={inputRef}
              className={twMerge(
                classNames(
                  'flex h-10 w-full select-none items-center rounded border border-slate-300 px-3 text-sm outline-none focus:ring-1 focus:ring-primary',
                  {
                    'cursor-pointer': !disabled,
                    'cursor-not-allowed': disabled,
                  }
                ),
                classNameInput
              )}
            >
              {localValue[propertyDisplay as keyof {}] ?? 'Chọn'}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='text-gray-400 h-5 w-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                />
              </svg>
            </span>
          </div>
        </div>
      </Popover>

      {/* Error message */}
      <p className='mt-2 text-xs italic text-red-500 empty:hidden'>{errorMessage}</p>
    </div>
  )
}

export default memo(InputSelect)
