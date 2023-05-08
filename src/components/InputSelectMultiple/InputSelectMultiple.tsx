import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { memo, useState } from 'react'
import Popover from '../Popover'

interface Props {
  label?: string
  value?: { [key: string]: any }[]
  options?: { [key: string]: any }[]
  required?: boolean
  propertyDisplay: string
  propertyValue: string
  errorMessage?: string
  classNameWrapper?: string
  onChange?: (values: any[]) => void
  render?: (
    options: { [key: string]: any }[],
    handleClick: (item: { [key: string]: any }) => () => void
  ) => React.ReactNode
}

const InputSelectMultiple = ({
  label,
  value,
  options,
  required,
  propertyDisplay,
  propertyValue,
  errorMessage,
  classNameWrapper,
  onChange,
  render,
}: Props) => {
  const [localValue, setLocalValue] = useState<{ [key: string]: any }[]>(value ?? [])

  const handleItemClick = (item: { [key: string]: any }) => () => {
    const isExists = localValue.some((i) => i[propertyValue] === item[propertyValue])
    if (!isExists) {
      const values = [...localValue, item]
      setLocalValue(values)
      onChange && onChange(values.map((i) => i[propertyValue]))
    }
  }

  const handleDeleteItem = (item: { [key: string]: any }) => () => {
    const values = localValue.filter((i) => i[propertyValue] !== item[propertyValue])
    setLocalValue(values)
    onChange && onChange(values.map((i) => i[propertyValue]))
  }

  return (
    <div className={classNameWrapper}>
      {/* Label */}
      <label className='block text-sm font-semibold empty:hidden'>
        {label}
        {required && <span className='ml-0.5 text-red-500'>*</span>}
      </label>

      {/* Selected items */}
      <div className='mt-2 flex flex-wrap gap-2 empty:hidden'>
        {localValue.length > 0 &&
          localValue.map((item) => (
            <div
              key={item[propertyValue]}
              className='flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700'
            >
              <span>{item[propertyDisplay]}</span>
              <XCircleIcon
                className='h-4 w-4 cursor-pointer select-none hover:text-danger'
                onClick={handleDeleteItem(item)}
              />
            </div>
          ))}
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
                          {item[propertyDisplay]}
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
          <span className='flex h-10 w-full cursor-pointer select-none items-center rounded border border-slate-300 px-3 text-sm outline-none'>
            Chọn
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronUpDownIcon className='h-5 w-5' />
          </span>
        </div>
      </Popover>

      {/* Error message */}
      {errorMessage && <p className='mt-2 text-xs italic text-red-500 empty:hidden'>{errorMessage}</p>}
    </div>
  )
}

export default memo(InputSelectMultiple)
