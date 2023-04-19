import type { FieldArrayWithId, UseFormRegister } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export interface Props {
  label?: string
  name: string
  fields: FieldArrayWithId[]
  displayValue: string
  register: UseFormRegister<any>
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  onRemove: (index: number) => void
  onAppend: () => void
}

export default function InputList({
  label,
  name,
  fields,
  displayValue,
  register,
  errorMessage,
  classNameWrapper,
  classNameInput,
  onRemove,
  onAppend,
}: Props) {
  const handleRemove = (index: number) => () => {
    onRemove(index)
  }

  return (
    <div className={classNameWrapper}>
      <label className='block text-sm font-semibold empty:hidden'>{label}</label>
      {fields.map((field, index) => (
        <div key={field.id} className='relative mt-2'>
          <input
            {...register(`${name}.${index}.${displayValue}`)}
            className={twMerge(
              'h-10 w-full rounded border border-slate-300 pl-3 pr-[52px] text-sm outline-none focus:ring-1 focus:ring-primary',
              classNameInput
            )}
            autoComplete='off'
          />
          <button
            className='absolute top-1/2 right-0 -translate-y-1/2 border-l border-l-slate-300 p-2 hover:text-danger'
            onClick={handleRemove(index)}
            type='button'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
      ))}
      <button
        type='button'
        className='mt-2 ml-auto mr-0 flex items-center gap-2 rounded bg-primary py-1 px-3 text-white'
        onClick={onAppend}
      >
        <span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </span>
        <span>Thêm</span>
      </button>
      <p className='mt-2 text-xs text-red-500 empty:hidden'>{errorMessage}</p>
    </div>
  )
}
