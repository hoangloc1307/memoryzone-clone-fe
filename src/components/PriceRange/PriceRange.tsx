import { BanknotesIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { numberAsCurrency } from '~/utils/utils'
interface Props {
  minRange: number
  maxRange: number
  minValue?: number
  maxValue?: number
  step?: number
  gap?: number
  onSubmit?: (min: number, max: number) => void
}

export default function PriceRange({
  minRange,
  maxRange,
  minValue = minRange,
  maxValue = maxRange,
  step = (maxRange - minRange) / 100,
  gap = 0,
  onSubmit,
}: Props) {
  const [minMax, setMinMax] = useState<{ min: number; max: number }>({ min: minValue, max: maxValue })

  const handleRangeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = Number((event.target as HTMLInputElement).value)
    const type = (event.target as HTMLInputElement).dataset.type as string
    if ((type === 'min' && value <= maxRange - gap) || (type === 'max' && value >= minRange + gap)) {
      if (type === 'min' && value + gap >= minMax.max) {
        setMinMax({ ...minMax, min: value, max: value + gap })
      } else if (type === 'max' && value - gap <= minMax.min) {
        setMinMax({ ...minMax, min: value - gap, max: value })
      } else {
        setMinMax({ ...minMax, [type]: value })
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number((event.target as HTMLInputElement).value)
    const type = (event.target as HTMLInputElement).dataset.type as string
  }

  const handleSubmit = () => {
    onSubmit && onSubmit(minMax.min, minMax.max)
  }

  return (
    <div className='px-1'>
      {/* Slider */}
      <div className='relative mt-5 h-[5px] rounded-[5px] bg-slate-300'>
        <div
          className='absolute h-[5px] rounded-[5px] bg-primary'
          style={{
            left: `${(minMax.min - minRange) / ((maxRange - minRange) / 100)}%`,
            right: `${(maxRange - minMax.max) / ((maxRange - minRange) / 100)}%`,
          }}
        />
      </div>
      <div className='relative'>
        <input
          className='c-input-range pointer-events-none absolute top-[-5px] h-[5px] w-full appearance-none bg-transparent'
          type='range'
          data-type='min'
          value={minMax.min}
          step={step}
          min={minRange}
          max={maxRange}
          autoComplete='off'
          onInput={handleRangeChange}
        />
        <input
          className='c-input-range pointer-events-none absolute top-[-5px] h-[5px] w-full appearance-none bg-transparent'
          type='range'
          data-type='max'
          value={minMax.max}
          step={step}
          min={minRange}
          max={maxRange}
          autoComplete='off'
          onInput={handleRangeChange}
        />
      </div>

      {/* Input */}
      <div className='mt-5 flex items-end justify-between text-sm'>
        <div className='flex flex-col items-start gap-1'>
          <span>Min</span>
          <input
            type='text'
            readOnly
            data-type='min'
            value={numberAsCurrency(minMax.min)}
            autoComplete='off'
            className='pointer-events-none w-[110px] rounded border border-slate-300 bg-slate-100 py-1 px-2 text-center outline-none'
            onChange={handleInputChange}
          />
        </div>
        <BanknotesIcon className='hidden h-7 w-6 pb-1 xl:block' />
        <div className='flex flex-col items-start gap-1'>
          <span>Max</span>
          <input
            type='text'
            readOnly
            data-type='max'
            value={numberAsCurrency(minMax.max)}
            autoComplete='off'
            className='pointer-events-none w-[110px] rounded border border-slate-300 bg-slate-100 py-1 px-2 text-center outline-none'
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Button */}
      <button className='mx-auto mt-5 block w-full rounded bg-primary px-5 py-1 text-white' onClick={handleSubmit}>
        Lọc giá
      </button>
    </div>
  )
}
