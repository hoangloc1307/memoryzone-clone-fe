import { memo, useState } from 'react'
import { ProductAttribute, ProductAttributeValue } from '~/types/product.type'

interface Props {
  label?: string
  attributes: ProductAttribute[]
  defaultValue: ProductAttributeValue[]
  classNameWrapper?: string
  onChange?: (value: ProductAttributeValue[]) => void
}

const InputProductAttributeValue = ({ label, attributes, defaultValue, classNameWrapper, onChange }: Props) => {
  const [localValue, setLocalValue] = useState<ProductAttributeValue[]>(defaultValue)
  const [changeValue, setChangeValue] = useState<ProductAttributeValue[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    let value
    let cValue
    const findItem = localValue.find((i) => i.productAttributeId === id)
    if (findItem) {
      value = localValue.map((item) => {
        if (item.productAttributeId === id) {
          return { ...item, value: event.target.value }
        }
        return item
      })

      const findChangeItem = changeValue.find((i) => i.productAttributeId === id)
      if (findChangeItem) {
        cValue = changeValue.map((item) => {
          if (item.productAttributeId === id) {
            return { ...item, value: event.target.value }
          }
          return item
        })
      } else {
        cValue = [...changeValue, { productAttributeId: id, value: event.target.value }]
      }
    } else {
      value = [...localValue, { productAttributeId: id, value: event.target.value }]
      cValue = [...changeValue, { productAttributeId: id, value: event.target.value }]
    }
    setLocalValue(value)
    setChangeValue(cValue)
    onChange && onChange(cValue)
  }

  return (
    <div className={classNameWrapper}>
      <label className='block text-sm font-semibold empty:hidden'>{label}</label>
      {attributes.length > 0 && (
        <div className='mt-3 grid gap-5'>
          {attributes.map((item) => {
            const matchItem = localValue.find((i) => i.productAttributeId === item.id)
            return (
              <div key={item.id} className='group relative rounded border border-slate-300 focus-within:border-primary'>
                <p className='absolute top-0 left-2 -translate-y-1/2 bg-white px-1 text-xs font-medium italic group-focus-within:text-primary'>
                  {item.attribute}
                </p>
                <input
                  autoComplete='off'
                  className='h-10 w-full rounded px-3 text-xs outline-none focus:border-primary'
                  value={matchItem?.value ?? ''}
                  onChange={(event) => handleChange(event, item.id)}
                />
              </div>
            )
          })}
        </div>
      )}
      {attributes.length === 0 && (
        <p className='mt-2 italic text-danger'>Chưa chọn loại sản phẩm hoặc loại sản phẩm chưa có thuộc tính</p>
      )}
    </div>
  )
}

export default memo(InputProductAttributeValue)
