import classNames from 'classnames'
import { memo, useId, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export interface Props {
  label?: string
  required?: boolean
  type?: HTMLInputElement['type']
  placeholder?: string
  value?: string
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  onChange?: (value: string) => void
}

const Input = ({
  label,
  required,
  placeholder,
  errorMessage,
  classNameWrapper,
  classNameInput,
  value,
  type = 'text',
  onChange,
}: Props) => {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [visible, setVisible] = useState(false)
  const [localValue, setLocalValue] = useState<string>(value ?? '')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _value = event.target.value
    setLocalValue(_value)
    onChange && onChange(_value)
  }

  const handleVisible = (isVisible: boolean) => () => {
    inputRef.current?.focus()
    setVisible(isVisible)
  }

  return (
    <div className={classNameWrapper}>
      {/* Label */}
      {label && (
        <label className='block select-none text-sm font-semibold empty:hidden' htmlFor={id}>
          {label}
          {required && <span className='ml-0.5 text-red-500'>*</span>}
        </label>
      )}

      <div className='relative mt-2'>
        {/* Input */}
        <input
          id={id}
          ref={inputRef}
          autoComplete='off'
          className={twMerge(
            classNames(
              'h-10 w-full rounded border border-slate-300 text-sm outline-none focus:ring-1 focus:ring-primary',
              {
                'pl-3 pr-11': type === 'password',
                'px-3': type !== 'password',
              }
            ),
            classNameInput
          )}
          value={value ?? localValue}
          type={type === 'password' ? (visible ? 'text' : 'password') : type}
          placeholder={placeholder}
          onChange={handleChange}
        />

        {/* Show password button */}
        {type === 'password' && !visible && (
          <EyeSlashIcon
            className='absolute top-1/2 right-1.5 h-8 w-8 -translate-y-1/2 cursor-pointer select-none p-1.5 text-[#444]'
            onClick={handleVisible(true)}
          />
        )}

        {/* Hidden password button */}
        {type === 'password' && visible && (
          <EyeIcon
            className='absolute top-1/2 right-1.5 h-8 w-8 -translate-y-1/2 cursor-pointer select-none p-1.5 text-[#444]'
            onClick={handleVisible(false)}
          />
        )}
      </div>

      {/* Error message */}
      {errorMessage && <p className='mt-2 select-none text-xs italic text-red-500 empty:hidden'>{errorMessage}</p>}
    </div>
  )
}

export default memo(Input)
