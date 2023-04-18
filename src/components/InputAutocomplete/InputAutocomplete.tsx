import { useId } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form/dist/types'
import { twMerge } from 'tailwind-merge'

export interface Props {
  label?: string
  name: string
  suggestList: string[]
  register?: UseFormRegister<any>
  registerOption?: RegisterOptions
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  onChange: () => void
}

export default function Input({
  label,
  name,
  suggestList,
  register,
  registerOption,
  errorMessage,
  classNameWrapper,
  classNameInput,
  onChange,
}: Props) {
  const id = useId()
  const inputRegister = register && name ? register(name, registerOption) : null

  return (
    <div className={classNameWrapper}>
      <div className='relative'>
        <label className='block text-sm font-semibold empty:hidden' htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          className={twMerge(
            'mt-2 h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:ring-1 focus:ring-primary',
            classNameInput
          )}
          {...inputRegister}
          onChange={onChange}
        />
        {suggestList.length > 0 && <div className='absolute top-full left-0 z-10 h-12 w-full bg-primary'></div>}
      </div>
      <p className='mt-2 text-xs text-red-500 empty:hidden'>{errorMessage}</p>
    </div>
  )
}
