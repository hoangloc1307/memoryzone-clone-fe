import { useEffect, useRef, useState } from 'react'

const MIN_RANGE = 0
const MAX_RANGE = 110_000_000
const STEP = 500_000

export default function PriceRange() {
  const [minMax, setMinMax] = useState([0, 110_000_000])
  const refButtons = useRef<HTMLInputElement[]>([])

  const addSlideImageRef = (e: HTMLInputElement) => {
    if (e && !refButtons.current.includes(e)) {
      refButtons.current.push(e)
    }
  }

  useEffect(() => {
    const handleSliderChange = () => {
      let minValue = Number(refButtons.current[0].value)
      let maxValue = Number(refButtons.current[1].value)
      console.log(minValue, maxValue)
    }

    const buttons = refButtons.current

    buttons.forEach((input) => {
      input.addEventListener('input', handleSliderChange)
    })

    return () => {
      buttons.forEach((input) => {
        input.removeEventListener('input', handleSliderChange)
      })
    }
  }, [])

  const handleInputChange = () => {}

  return (
    <div>
      <div className='relative mt-5 h-[5px] rounded-[5px] bg-slate-300'>
        <div className='absolute left-1/4 right-1/4 h-[5px] rounded-[5px] bg-primary'></div>
      </div>
      <div className='relative'>
        <input
          className='c-input c-input-range pointer-events-none absolute top-[-5px] h-[5px] w-full appearance-none bg-transparent'
          type='range'
          step={STEP}
          min={MIN_RANGE}
          max={MAX_RANGE}
          ref={addSlideImageRef}
        />
        <input
          className='c-input c-input-range pointer-events-none absolute top-[-5px] h-[5px] w-full appearance-none bg-transparent'
          type='range'
          step={STEP}
          min={MIN_RANGE}
          max={MAX_RANGE}
          ref={addSlideImageRef}
        />
      </div>
      <div className='mt-5 flex items-end justify-between text-sm'>
        <div className='flex flex-col items-start gap-1'>
          <span>Min</span>
          <input
            type='number'
            value={0}
            onChange={handleInputChange}
            className='c-input w-[110px] rounded border border-slate-300 py-1 px-2 text-center outline-none'
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
            type='number'
            value={500000}
            onChange={handleInputChange}
            className='c-input w-[110px] rounded border border-slate-300 py-1 px-2 text-center outline-none'
          />
        </div>
      </div>
    </div>
  )
}
