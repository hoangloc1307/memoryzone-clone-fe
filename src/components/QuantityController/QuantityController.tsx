import { useState } from 'react'
import { Props as InputProps } from '../Input'

interface Props extends InputProps {
  max?: number
  onDecrease?: (value: number) => void
  onIncrease?: (value: number) => void
  onFocusOut?: (value: number) => void
}

export default function QuantityController({ max, value, onDecrease, onIncrease, onFocusOut }: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value) || 1)

  const hanldeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value)
    if (value < 1) {
      value = 1
    } else if (max !== undefined && value > max) {
      value = max
    }
    setLocalValue(value)
  }

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    let value = Number(event.target.value)
    onFocusOut && onFocusOut(value)
    setLocalValue(value)
  }

  const handleDecrease = () => {
    let _value = localValue - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  const handleIncrease = () => {
    let _value = localValue + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  return (
    <div className='inline-flex'>
      <button className='overflow-hidden rounded-l-lg border px-2 py-1 outline-none' onClick={handleDecrease}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='pointer-events-none h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <input
        type='number'
        className='c-input-number w-16 border-y py-1 text-center text-sm outline-none'
        value={localValue}
        onChange={hanldeInputChange}
        onBlur={handleInputBlur}
      />
      <button className='overflow-hidden rounded-r-lg border px-2 py-1 outline-none' onClick={handleIncrease}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='pointer-events-none h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
