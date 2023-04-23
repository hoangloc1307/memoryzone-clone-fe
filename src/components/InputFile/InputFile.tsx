import { memo, useRef, useState } from 'react'

interface Props {
  label?: string
  defaultValue?: string[]
  classNameWrapper?: string
  onChange?: (files: File[]) => void
}

const InputFile = ({ label, defaultValue, classNameWrapper, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])

  const handleAdd = () => {
    inputRef.current?.click()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files
    const values = [...files, ...Array.from(images as FileList)]
    setFiles(values)
    onChange && onChange(values)
  }

  const handleDelete = (index: number) => () => {
    const images = files.filter((_, i) => index !== i)
    setFiles(images)
    onChange && onChange(images)
  }

  return (
    <div className={classNameWrapper}>
      {/* Label */}
      <label className='block text-sm font-semibold empty:hidden'>{label}</label>

      {/* Images */}
      <div className='mt-2 flex flex-wrap gap-2'>
        {files.length > 0 &&
          files.map((file, index) => (
            <div key={index} className='group relative h-[100px] w-[100px] rounded border border-slate-300 p-1'>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img src={URL.createObjectURL(file)} alt={file.name} className='aspect-square w-full object-contain' />
              }
              {/* Delete button */}
              <button
                className='pointer-events-none absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 text-white opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
                type='button'
                onClick={handleDelete(index)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='pointer-events-none h-10 w-10'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
          ))}

        {/* Add button */}
        <input type='file' hidden ref={inputRef} multiple onChange={handleChange} />
        <button
          type='button'
          className='flex h-[100px] w-[100px] flex-col items-center justify-center gap-2 rounded border border-slate-300'
          onClick={handleAdd}
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
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
              />
            </svg>
          </span>
          <span>Tải ảnh lên</span>
        </button>
      </div>
    </div>
  )
}

export default memo(InputFile)
