import { memo, useId, useState } from 'react'
import { numberAsCurrency } from '~/utils/utils'

export interface Props {
  label?: string
  value?: number
  errorMessage?: string
  classNameWrapper?: string
  onChange?: (value: number) => void
}

const InputNumber = ({ label, value, errorMessage, classNameWrapper, onChange }: Props) => {
  const id = useId()
  const [localValue, setLocalValue] = useState(value || 0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replaceAll('.', '')
    if (value === '') {
      value = '0'
    }
    const valueAsNumber = Number(value)
    setLocalValue(valueAsNumber)
    onChange && onChange(valueAsNumber)
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
      {/* Label */}
      <label className='block text-sm font-semibold empty:hidden' htmlFor={id}>
        {label}
      </label>

      {/* Input */}
      <input
        id={id}
        value={numberAsCurrency(Number(value ?? localValue))}
        autoComplete='off'
        className='mt-2 h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:ring-1 focus:ring-primary'
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />

      {/* Error message */}
      <p className='mt-2 text-xs italic text-red-500 empty:hidden'>{errorMessage}</p>
    </div>
  )
}

export default memo(InputNumber)
