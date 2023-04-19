import { useId, useState } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form/dist/types'
import { twMerge } from 'tailwind-merge'
import { numberAsCurrency } from '~/utils/utils'

export interface Props {
  label?: string
  name: string
  placeholder?: string
  defaultValue?: number
  register?: UseFormRegister<any>
  registerOption?: RegisterOptions
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
}

export default function InputNumber({
  label,
  name,
  placeholder,
  defaultValue,
  register,
  registerOption,
  errorMessage,
  classNameWrapper,
  classNameInput,
}: Props) {
  const id = useId()
  const inputRegister = register && name ? register(name, registerOption) : null
  const [localValue, setLocalValue] = useState(defaultValue || 0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replaceAll('.', '')
    if (value === '') {
      setLocalValue(0)
    } else {
      setLocalValue(Number(value))
    }
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
          placeholder={placeholder}
          {...inputRegister}
          value={numberAsCurrency(Number(localValue))}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </div>
      <p className='mt-2 text-xs text-red-500 empty:hidden'>{errorMessage}</p>
    </div>
  )
}
