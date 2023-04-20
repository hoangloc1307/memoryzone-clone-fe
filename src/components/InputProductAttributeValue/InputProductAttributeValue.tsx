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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    let value
    const findItem = localValue.find((i) => i.productAttributeId === id)
    if (findItem) {
      value = localValue.map((item) => {
        if (item.productAttributeId === id) {
          return { ...item, value: event.target.value }
        }
        return item
      })
    } else {
      value = [...localValue, { productAttributeId: id, value: event.target.value }]
    }
    setLocalValue(value)
    onChange && onChange(value)
  }

  return (
    <div className={classNameWrapper}>
      <label className='block text-sm font-semibold empty:hidden'>{label}</label>
      {attributes.length > 0 && (
        <div className='mt-2 grid grid-cols-2 gap-5'>
          {attributes.map((item) => {
            const matchItem = localValue.find((i) => i.productAttributeId === item.id)
            return (
              <div key={item.id} className='flex flex-col gap-0.5'>
                <p>{item.attribute}</p>
                <input
                  autoComplete='off'
                  className='h-10 rounded border border-slate-300 px-3 text-xs outline-none focus:border-primary'
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
