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
        <span className='hidden pb-1 xl:block'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
            />
          </svg>
        </span>
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
