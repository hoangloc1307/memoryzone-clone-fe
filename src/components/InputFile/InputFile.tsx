import Image from 'next/image'
import { memo, useEffect, useRef, useState } from 'react'
import { ProductImage } from '~/types/product.type'

interface Props {
  label?: string
  value?: (File & { preview: string })[]
  defaultValue?: ProductImage[]
  classNameWrapper?: string
  onChange?: (files: File[]) => void
  onDelete?: (imageId: number, deleteHash: string) => void
}

const InputFile = ({ label, value, defaultValue, classNameWrapper, onChange, onDelete }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<(File & { preview: string })[]>([])
  const defaultImages = defaultValue ?? []

  useEffect(() => {
    if (value) {
      setFiles(value)
    }
  }, [value])

  const handleAdd = () => {
    inputRef.current?.click()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files

    files.forEach((file) => {
      URL.revokeObjectURL(file.preview)
    })

    const imagesWithPreview = Array.from(images as FileList).map((file: any) => {
      file.preview = URL.createObjectURL(file)
      return file
    })
    const values = [...files, ...imagesWithPreview]
    setFiles(values)
    onChange && onChange(values)
  }

  const handleDelete = (index: number) => () => {
    const images = files.filter((_, i) => {
      if (index === i) {
        URL.revokeObjectURL(files[index].preview)
        return false
      }
      return true
    })
    setFiles(images)
    onChange && onChange(images)
  }

  const handleDeleteDefaultImage = (imageId: number, deleteHash: string) => () => {
    onDelete && onDelete(imageId, deleteHash)
  }

  return (
    <div className={classNameWrapper}>
      {/* Label */}
      <label className='block text-sm font-semibold empty:hidden'>{label}</label>

      {/* Images */}
      <div className='mt-2 flex flex-wrap gap-5'>
        {defaultImages.length > 0 &&
          defaultImages.map((image) => (
            <div key={image.id} className='w-[160px]'>
              <div className='group relative h-[120px] w-full overflow-hidden rounded shadow'>
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <Image
                    src={image.link}
                    alt={image.alt}
                    width={160}
                    height={120}
                    className='h-full w-full object-contain'
                  />
                }
                {/* Delete button */}
                <button
                  className='pointer-events-none absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 text-white opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
                  type='button'
                  onClick={handleDeleteDefaultImage(image.id, image.deleteHash)}
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
              <p
                className='mt-1 cursor-default overflow-hidden text-ellipsis whitespace-nowrap text-left [direction:rtl]'
                title={image.name}
              >
                {image.name}
              </p>
            </div>
          ))}

        {/* Files */}
        {files.length > 0 &&
          files.map((file, index) => (
            <div key={index} className='w-[160px]'>
              <div className='group relative h-[120px] w-full overflow-hidden rounded shadow'>
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={file.preview} alt={file.name} className='h-full w-full object-contain' />
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
              <p
                className='mt-1 cursor-default overflow-hidden text-ellipsis whitespace-nowrap text-left [direction:rtl]'
                title={file.name}
              >
                {file.name}
              </p>
            </div>
          ))}

        {/* Add button */}
        <input type='file' hidden ref={inputRef} multiple onChange={handleChange} />
        <button
          type='button'
          className='flex h-[120px] w-[160px] flex-col items-center justify-center gap-2 rounded border border-slate-300'
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
