import { memo, useState } from 'react'
import Popover from '../Popover'

interface Props {
  label?: string
  defaultValue?: any[]
  options: any[]
  required?: boolean
  propertyDisplay: string
  propertyValue: string
  errorMessage?: string
  classNameWrapper?: string
  onChange?: (values: any[]) => void
  render?: (options: {}[], onClick: (item: {}) => () => void) => React.ReactNode
}

const InputSelectMultiple = ({
  label,
  defaultValue,
  options,
  required,
  propertyDisplay,
  propertyValue,
  errorMessage,
  classNameWrapper,
  onChange,
  render,
}: Props) => {
  const [localValue, setLocalValue] = useState<any[]>(defaultValue ?? [])

  const handleItemClick = (item: {}) => () => {
    const isExists = localValue.some((i) => i[propertyValue] === item[propertyValue as keyof {}])
    if (!isExists) {
      const values = [...localValue, item]
      setLocalValue(values)
      onChange &&
        onChange(
          values.map((i) => {
            return i[propertyValue]
          })
        )
    }
  }

  const handleDeleteItem = (item: {}) => () => {
    const index = localValue.findIndex((i) => i[propertyValue] === item[propertyValue as keyof {}])
    const temp = [...localValue]
    temp.splice(index, 1)
    setLocalValue(temp)
    onChange &&
      onChange(
        temp.map((i) => {
          return i[propertyValue]
        })
      )
  }

  return (
    <div className={classNameWrapper}>
      {/* Label */}
      <label className='block text-sm font-semibold empty:hidden'>
        {label}
        {required && <span className='ml-0.5 text-red-500'>*</span>}
      </label>

      {/* Selected items */}
      <div className='mt-2 flex flex-wrap gap-2 rounded border border-slate-300 p-3'>
        {localValue.length > 0 &&
          localValue.map((item) => (
            <div
              key={item[propertyValue]}
              className='flex items-center gap-1 rounded border border-slate-300 px-2 py-1 text-sm'
            >
              <span>{item[propertyDisplay]}</span>
              <span className='cursor-pointer py-0.5 hover:text-danger' onClick={handleDeleteItem(item)}>
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
              </span>
            </div>
          ))}

        {localValue.length === 0 && <p className='text-sm italic text-danger'>Chưa chọn danh mục nào</p>}
      </div>

      {/* Select box */}
      <Popover
        floatingElement={
          <>
            {options && options.length > 0 && (
              <div className='c-scrollbar z-20 max-h-40 w-full overflow-auto rounded bg-white py-2 shadow ring-1 ring-black/5'>
                {render
                  ? render(options, handleItemClick)
                  : options.map((item, index) => {
                      return (
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
        {/* Input */}
        <div className='relative mt-2'>
          <span className='flex h-10 w-full cursor-pointer select-none items-center rounded border border-slate-300 px-3 text-sm outline-none focus:ring-1 focus:ring-primary'>
            {defaultValue?.[propertyDisplay as keyof {}] ?? localValue[propertyDisplay as keyof {}] ?? 'Chọn'}
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
      </Popover>

      {/* Error message */}
      <p className='mt-2 text-xs italic text-red-500 empty:hidden'>{errorMessage}</p>
    </div>
  )
}

export default memo(InputSelectMultiple)
