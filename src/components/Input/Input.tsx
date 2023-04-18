import classNames from 'classnames'
import { InputHTMLAttributes, useId, useState } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form/dist/types'
import { twMerge } from 'tailwind-merge'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  register?: UseFormRegister<any>
  registerOption?: RegisterOptions
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
}

export default function Input({
  label,
  name,
  register,
  registerOption,
  errorMessage,
  classNameWrapper,
  classNameInput,
  ...rest
}: Props) {
  const id = useId()
  const [visible, setVisible] = useState(false)
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
            classNames(
              'mt-2 h-10 w-full rounded border border-slate-300 text-sm outline-none focus:ring-1 focus:ring-primary',
              {
                'pl-3 pr-10': rest.type === 'password',
                'px-3': rest.type !== 'password',
              }
            ),
            classNameInput
          )}
          {...inputRegister}
          {...rest}
          type={rest.type === 'password' ? (visible ? 'text' : 'password') : rest.type}
        />
        {rest.type === 'password' && visible && (
          <span
            className='absolute top-[28px] right-0 cursor-pointer p-2.5 text-[#444]'
            onClick={() => setVisible(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
              />
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
          </span>
        )}
        {rest.type === 'password' && !visible && (
          <span
            className='absolute top-[28px] right-0 cursor-pointer p-2.5 text-[#444]'
            onClick={() => setVisible(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
              />
            </svg>
          </span>
        )}
      </div>
      <p className='mt-2 text-xs text-red-500 empty:hidden'>{errorMessage}</p>
    </div>
  )
}
