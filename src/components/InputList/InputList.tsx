import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { memo, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'

export interface Props {
  label?: string
  value?: string[]
  errorMessage?: string
  classNameWrapper?: string
  classNameInput?: string
  onChange?: (value: string[]) => void
}

const InputList = ({ label, value, errorMessage, classNameWrapper, classNameInput, onChange }: Props) => {
  const [localValue, setLocalValue] = useState<string[]>([''])

  useEffect(() => {
    setLocalValue(value || [''])
  }, [value])

  const handleRemove = (index: number) => () => {
    const _value = localValue.filter((_, idx) => index !== idx)
    setLocalValue(_value)
    onChange && onChange(_value)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const _value = [...localValue]
    _value[index] = event.target.value
    setLocalValue(_value)
    onChange && onChange(_value)
  }

  const handleAdd = () => {
    const _value = [...localValue, '']
    setLocalValue(_value)
    onChange && onChange(_value)
  }

  return (
    <div className={classNameWrapper}>
      {/* Label */}
      {label && <label className='block text-sm font-semibold empty:hidden'>{label}</label>}

      {localValue.map((item, index) => (
        <div key={index} className='relative mt-2'>
          {/* Input */}
          <input
            className={twMerge(
              'h-10 w-full rounded border border-slate-300 pl-3 pr-[52px] text-sm outline-none focus:ring-1 focus:ring-primary',
              classNameInput
            )}
            autoComplete='off'
            value={item}
            onChange={(event) => handleChange(event, index)}
          />

          {/* Delete button */}
          <XMarkIcon
            className='absolute top-0 right-0 h-10 w-10 cursor-pointer border-l border-l-slate-300 p-2 hover:text-danger'
            onClick={handleRemove(index)}
          />
        </div>
      ))}

      {/* Add button */}
      <Button leftIcon={PlusIcon} outline size='sm' classNameCustom='w-full mt-2' onClick={handleAdd}>
        Thêm
      </Button>

      {/* Error message */}
      {errorMessage && <p className='mt-2 text-xs text-red-500 empty:hidden'>{errorMessage}</p>}
    </div>
  )
}

export default memo(InputList)
