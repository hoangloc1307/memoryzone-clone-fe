import { useId, useState } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form/dist/types'
import { twMerge } from 'tailwind-merge'
import Popover from '../Popover'

export interface Props {
  label?: string
  name: string
  suggestList: string[]
  defaultValue?: string
  register?: UseFormRegister<any>
  registerOption?: RegisterOptions
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  onChange: (value: string) => void
  onClickSuggest: (value: string) => void
}

export default function InputAutocomplete({
  label,
  name,
  suggestList,
  defaultValue,
  register,
  registerOption,
  errorMessage,
  classNameWrapper,
  classNameInput,
  onChange,
  onClickSuggest,
}: Props) {
  const id = useId()
  const inputRegister = register && name ? register(name, registerOption) : null
  const [localValue, setLocalValue] = useState(defaultValue ?? '')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setLocalValue(value)
    onChange && onChange(value)
  }

  const handleItemClick = (item: string) => () => {
    setLocalValue(item)
    onClickSuggest && onClickSuggest(item)
  }

  return (
    <div className={classNameWrapper}>
      <Popover
        floatingElement={
          <>
            {suggestList.length > 0 && (
              <div className='c-scrollbar z-20 max-h-24 w-full overflow-auto rounded bg-white py-2 shadow ring-1 ring-black/5'>
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
        showOnFocus
        floatingElementWidth={'100%'}
        offsetOption={{ mainAxis: 4 }}
      >
        <label className='block text-sm font-semibold empty:hidden' htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          autoComplete='off'
          className={twMerge(
            'mt-2 h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:ring-1 focus:ring-primary',
            classNameInput
          )}
          {...inputRegister}
          value={localValue}
          onChange={handleChange}
        />
      </Popover>

      <p className='mt-2 text-xs text-red-500 empty:hidden'>{errorMessage}</p>
    </div>
  )
}
