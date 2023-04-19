import type { FieldArrayWithId, UseFormRegister } from 'react-hook-form'

interface Props {
  label?: string
  name: string
  fields: FieldArrayWithId[]
  register: UseFormRegister<any>
}

export default function InputProductAttributeValue({ label, fields, name, register }: Props) {
  return (
    <>
      <label className='block text-sm font-semibold empty:hidden'>{label}</label>
      {fields.length > 0 && (
        <div className='mt-2 grid grid-cols-2 gap-5'>
          {fields.map((field, index) => (
            <div key={field.id} className='flex flex-col gap-0.5'>
              <input {...register(`${name}.${index}.attribute`)} tabIndex={-1} className='outline-none' readOnly />
              <input
                {...register(`${name}.${index}.value`)}
                autoComplete='off'
                className='h-10 rounded border border-slate-300 px-3 text-xs outline-none focus:border-primary'
              />
            </div>
          ))}
        </div>
      )}
      {fields.length === 0 && (
        <p className='mt-2 italic text-danger'>Chưa chọn loại sản phẩm hoặc loại sản phẩm chưa có thuộc tính</p>
      )}
    </>
  )
}
