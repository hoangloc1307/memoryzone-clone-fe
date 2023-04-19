import { memo, useId, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { numberAsCurrency } from '~/utils/utils'

export interface Props {
  label?: string
  defaultValue?: number
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  onChange?: (value: number) => void
}

const InputNumber = ({ label, defaultValue, errorMessage, classNameWrapper, classNameInput, onChange }: Props) => {
  const id = useId()
  const [localValue, setLocalValue] = useState(defaultValue || 0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replaceAll('.', '')
    if (value === '') {
      value = '0'
    }
    setLocalValue(Number(value))
    onChange && onChange(Number(value))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(
        event.key
      )
    ) {
      event.preventDefault()
    }
  }

  return (
    <div className={classNameWrapper}>
      <div className='relative'>
        {/* Label */}
        <label className='block text-sm font-semibold empty:hidden' htmlFor={id}>
          {label}
        </label>

        {/* Input */}
        <input
          id={id}
          autoComplete='off'
          className={twMerge(
            'mt-2 h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:ring-1 focus:ring-primary',
            classNameInput
          )}
          value={numberAsCurrency(Number(localValue))}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </div>

      {/* Error message */}
      <p className='mt-2 text-xs italic text-red-500 empty:hidden'>{errorMessage}</p>
    </div>
  )
}

export default memo(InputNumber)
