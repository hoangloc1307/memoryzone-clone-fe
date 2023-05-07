import classNames from 'classnames'
import { memo, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Popover from '../Popover'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'

interface Props {
  label?: string
  value?: { [key: string]: any }
  options?: { [key: string]: any }[]
  disabled?: boolean
  propertyDisplay: string
  propertyValue: string
  required?: boolean
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  onChange?: (value: string | number) => void
  render?: (options: {}[], onClick: (item: {}) => () => void) => React.ReactNode
}

const InputSelect = ({
  label,
  value,
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
  const [localValue, setLocalValue] = useState<{ [key: string]: any }>(value ?? {})

  const handleItemClick = (item: { [key: string]: any }) => () => {
    setLocalValue(item)
    inputRef.current?.click()
    onChange && onChange(item[propertyValue])
  }

  return (
    <div className={classNameWrapper}>
      <Popover
        floatingElement={
          <>
            {options && options.length > 0 && (
              <div className='c-scrollbar relative z-10 max-h-40 w-full overflow-auto rounded bg-white py-2 shadow ring-1 ring-black/5'>
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
        showOnClick={!disabled}
        floatingElementWidth={'100%'}
        offsetOption={{ mainAxis: 4 }}
      >
        <div className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}>
          {/* Label */}
          {label && (
            <label className='block text-sm font-semibold empty:hidden'>
              {label}
              {required && <span className='ml-0.5 text-red-500'>*</span>}
            </label>
          )}

          {/* Input */}
          <div className='relative mt-2'>
            <span
              ref={inputRef}
              className={twMerge(
                classNames(
                  'flex h-10 w-full select-none items-center rounded border border-slate-300 px-3 text-sm outline-none focus:ring-1 focus:ring-primary'
                ),
                classNameInput
              )}
            >
              {value?.[propertyDisplay] ?? localValue[propertyDisplay] ?? 'Chọn'}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon className='h-5 w-5' />
            </span>
          </div>
        </div>
      </Popover>

      {/* Error message */}
      {errorMessage && <p className='mt-2 text-xs italic text-red-500 empty:hidden'>{errorMessage}</p>}
    </div>
  )
}

export default memo(InputSelect)
