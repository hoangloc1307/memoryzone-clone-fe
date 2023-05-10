import { memo, useState } from 'react'
import { Attribute, ProductAttributeValue } from '~/types/product.type'

interface Props {
  label?: string
  attributes: Attribute[]
  value?: ProductAttributeValue[]
  classNameWrapper?: string
  loading?: boolean
  onChange?: (value: ProductAttributeValue[]) => void
}

const InputProductAttributeValue = ({
  label,
  attributes,
  value,
  classNameWrapper,
  loading = false,
  onChange,
}: Props) => {
  const [localValue, setLocalValue] = useState<ProductAttributeValue[]>(value ?? [])
  const [changeValue, setChangeValue] = useState<ProductAttributeValue[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    // Update local value
    const updatedValue =
      localValue.findIndex((item) => item.id === id) > -1
        ? localValue.map((item) => (item.id === id ? { ...item, value: event.target.value } : item))
        : [...localValue, { id, value: event.target.value }]
    setLocalValue(updatedValue)

    // Update change value
    const updatedChangeValue =
      changeValue.findIndex((item) => item.id === id) > -1
        ? changeValue.map((item) => (item.id === id ? { ...item, value: event.target.value } : item))
        : [...changeValue, { id, value: event.target.value }]
    setChangeValue(updatedChangeValue)
    onChange && onChange(updatedChangeValue)
  }

  return (
    <div className={classNameWrapper}>
      {!loading && (
        <>
          {/* Label */}
          {label && <label className='block text-sm font-semibold empty:hidden'>{label}</label>}

          {/* Input array */}
          {attributes.length > 0 && (
            <div className='mt-3 grid gap-5'>
              {attributes.map((attribute) => {
                const matchItem = localValue.find((item) => item.id === attribute.id)
                return (
                  <div
                    key={attribute.id}
                    className='group relative rounded border border-slate-300 focus-within:border-primary'
                  >
                    <p className='absolute top-0 left-2 -translate-y-1/2 bg-white px-1 text-xs font-medium italic group-focus-within:text-primary'>
                      {attribute.name}
                    </p>
                    <input
                      autoComplete='off'
                      className='h-10 w-full rounded px-3 text-xs outline-none focus:border-primary'
                      value={matchItem?.value ?? ''}
                      onChange={(event) => handleChange(event, attribute.id)}
                    />
                  </div>
                )
              })}
            </div>
          )}

          {attributes.length === 0 && (
            <p className='mt-2 italic text-danger'>Chưa chọn loại sản phẩm hoặc loại sản phẩm chưa có thuộc tính</p>
          )}
        </>
      )}

      {/* Loading skeletopn */}
      {loading && (
        <div className='animate-pulse'>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div key={index} className='mt-2 h-[40px] rounded bg-gray-300' />
            ))}
        </div>
      )}
    </div>
  )
}

export default memo(InputProductAttributeValue)
