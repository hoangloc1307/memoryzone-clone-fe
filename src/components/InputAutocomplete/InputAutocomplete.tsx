import { memo, useId, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Popover from '../Popover'

export interface Props {
  label?: string
  suggestList: string[]
  defaultValue?: string
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  onChange?: (value: string) => void
  onClickSuggest?: (value: string) => void
}

const InputAutocomplete = ({
  label,
  suggestList,
  defaultValue,
  errorMessage,
  classNameWrapper,
  classNameInput,
  onChange,
}: Props) => {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [localValue, setLocalValue] = useState(defaultValue ?? '')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setLocalValue(value)
    onChange && onChange(value)
  }

  const handleItemClick = (item: string) => () => {
    setLocalValue(item)
    inputRef.current?.focus()
    onChange && onChange(item)
  }

  return (
    <div className={classNameWrapper}>
      <Popover
        floatingElement={
          <>
            {suggestList.length > 0 && (
              <div className='c-scrollbar z-20 max-h-40 w-full overflow-auto rounded bg-white py-2 shadow ring-1 ring-black/5'>
                {suggestList.map((item) => (
                  <p
                    key={item}
                    className='bg-white px-3 py-2 hover:bg-primary/10 hover:text-primary'
                    onClick={handleItemClick(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </>
        }
        showOnHover={false}
        showOnClick
        floatingElementWidth={'100%'}
        offsetOption={{ mainAxis: 4 }}
      >
        {/* Label */}
        <label className='block text-sm font-semibold empty:hidden' htmlFor={id}>
          {label}
        </label>

        {/* Input */}
        <input
          id={id}
          ref={inputRef}
          autoComplete='off'
          className={twMerge(
            'mt-2 h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:ring-1 focus:ring-primary',
            classNameInput
          )}
          value={localValue}
          onChange={handleChange}
        />
      </Popover>

      {/* Error message */}
      <p className='mt-2 text-xs italic text-red-500 empty:hidden'>{errorMessage}</p>
    </div>
  )
}

export default memo(InputAutocomplete)
