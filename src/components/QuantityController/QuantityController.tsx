import { useRef, useState } from 'react'
import { Props as InputProps } from '../Input'
import classNames from 'classnames'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

interface Props extends InputProps {
  max?: number
  onDecrease?: (value: number) => void
  onIncrease?: (value: number) => void
  onFocusOut?: (value: number) => void
}

export default function QuantityController({ max, value, onDecrease, onIncrease, onFocusOut }: Props) {
  const [localValue, setLocalValue] = useState(Number(value) || 1)
  const interval = useRef<NodeJS.Timer>()

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
    setLocalValue((prev) => {
      let _value = prev - 1
      if (_value < 1) {
        _value = 1
      }
      return _value
    })
  }

  const handleIncrease = () => {
    setLocalValue((prev) => {
      let _value = prev + 1
      if (max !== undefined && _value > max) {
        _value = max
      }
      return _value
    })
  }

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>
  ) => {
    const type = (event.target as HTMLElement).dataset.type
    interval.current = setInterval(() => {
      if (type === 'decrease') {
        handleDecrease()
      }
      if (type === 'increase') {
        handleIncrease()
      }
    }, 150)
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const type = (event.target as HTMLElement).dataset.type
    if (interval.current) {
      if (type === 'decrease') {
        onDecrease && onDecrease(localValue === 1 ? localValue : localValue - 1)
      }
      if (type === 'increase') {
        onIncrease && onIncrease(localValue === max ? localValue : localValue + 1)
      }
      clearInterval(interval.current)
      interval.current = undefined
    }
  }

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>
  ) => {
    const type = (event.target as HTMLElement).dataset.type
    if (interval.current) {
      if (type === 'decrease') {
        onDecrease && onDecrease(localValue)
      }
      if (type === 'increase') {
        onIncrease && onIncrease(localValue)
      }
      clearInterval(interval.current)
      interval.current = undefined
    }
  }

  return (
    <div className='inline-flex'>
      <button
        data-type='decrease'
        className={classNames('overflow-hidden rounded-l-lg border border-slate-600 px-1.5 py-1 outline-none', {
          'cursor-not-allowed bg-slate-100 text-slate-400': localValue === 1,
        })}
        onClick={handleDecrease}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseLeave}
        onMouseLeave={handleMouseLeave}
      >
        <MinusIcon className='pointer-events-none h-4 w-4' />
      </button>
      <input
        type='number'
        className='c-input-number w-12 border-y border-slate-600 py-1 text-center text-sm outline-none'
        value={localValue}
        autoComplete='off'
        onChange={hanldeInputChange}
        onBlur={handleInputBlur}
      />
      <button
        data-type='increase'
        className={classNames('overflow-hidden rounded-r-lg border border-slate-600 px-1.5 py-1 outline-none', {
          'cursor-not-allowed bg-slate-100 text-slate-400': localValue === max,
        })}
        onClick={handleIncrease}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseLeave}
        onMouseLeave={handleMouseLeave}
      >
        <PlusIcon className='pointer-events-none h-4 w-4' />
      </button>
    </div>
  )
}
