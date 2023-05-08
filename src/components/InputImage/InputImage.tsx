import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { memo, useRef, useState } from 'react'
import { ProductImage } from '~/types/product.type'

interface Props {
  label?: string
  value?: ProductImage[]
  classNameWrapper?: string
  onChange?: (files: FileWithPreview[]) => void
  onDelete?: (images: ProductImage[]) => void
}

export type FileWithPreview = File & { preview?: string }

const InputImage = ({ label, value, classNameWrapper, onChange, onDelete }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [imagesCheck, setImagesCheck] = useState<(ProductImage | FileWithPreview)[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files as FileList

    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })

    const imagesWithPreview = [...files, ...Array.from(images)].map((file: FileWithPreview) => {
      file.preview = URL.createObjectURL(file)
      return file
    })

    setFiles(imagesWithPreview)
    onChange && onChange(imagesWithPreview)
  }

  // Function to find index if exists
  const indexExists = (item: ProductImage | FileWithPreview) => {
    const index =
      item.constructor.name === 'File'
        ? imagesCheck.findIndex((i) => (i as FileWithPreview).preview === (item as FileWithPreview).preview)
        : imagesCheck.findIndex((i) => (i as ProductImage).id === (item as ProductImage).id)
    return index
  }

  const handleCheck = (item: ProductImage | FileWithPreview) => () => {
    const index = indexExists(item)
    setImagesCheck((prev) => {
      if (index === -1) {
        return [...prev, item]
      } else {
        return prev.filter((_, i) => i !== index)
      }
    })
  }

  const handleDelete = () => {
    const remoteImages: ProductImage[] = []
    const localImages = imagesCheck.reduce((result: string[], current) => {
      if (current.constructor.name === 'File') {
        URL.revokeObjectURL((current as FileWithPreview).preview as string)
        return [...result, (current as FileWithPreview).preview as string]
      }
      remoteImages.push(current as ProductImage)
      return [...result]
    }, [])

    setFiles(files.filter((item) => !localImages.includes(item.preview ?? '')))
    setImagesCheck([])
    onDelete && onDelete(remoteImages)
  }

  return (
    <div className={classNameWrapper}>
      {/* Label */}
      {label && <label className='block text-sm font-semibold empty:hidden'>{label}</label>}

      {/* Images */}
      <div className='mt-2 flex flex-wrap gap-5'>
        {value &&
          value.length > 0 &&
          value.map((image) => (
            <div key={image.id} className='relative w-[166px] overflow-hidden rounded border border-blue-500 p-2'>
              <Image
                alt={image.alt}
                src={image.link}
                width={150}
                height={150}
                className='mx-auto block aspect-square h-auto w-[150px] rounded object-contain'
              />
              <p
                className='mt-2 cursor-default overflow-hidden text-ellipsis whitespace-nowrap border-t border-blue-500 pt-2 text-left [direction:rtl]'
                title={image.name}
              >
                {image.name}
              </p>
              <input
                type='checkbox'
                className='absolute top-1 right-1 cursor-pointer outline-none'
                checked={indexExists(image) > -1}
                onChange={handleCheck(image)}
              />
            </div>
          ))}
        {files.length > 0 &&
          files.map((file, index) => (
            <div key={index} className='relative w-[166px] overflow-hidden rounded border border-blue-500 p-2'>
              <Image
                alt={file.name}
                src={file.preview as string}
                width={150}
                height={150}
                className='mx-auto block aspect-square h-auto w-[150px] rounded object-contain'
              />
              <p
                className='mt-2 cursor-default overflow-hidden text-ellipsis whitespace-nowrap border-t border-blue-500 pt-2 text-left [direction:rtl]'
                title={file.name}
              >
                {file.name}
              </p>
              <input
                type='checkbox'
                className='absolute top-1 right-1 cursor-pointer outline-none'
                checked={indexExists(file) > -1}
                onChange={handleCheck(file)}
              />
            </div>
          ))}

        {/* Add button */}
        <input type='file' hidden ref={inputRef} multiple onChange={handleChange} />
        <div className='flex h-[207px] w-[160px] flex-col items-center justify-center gap-2 '>
          <button
            type='button'
            className='mt-2 flex w-full items-center justify-center rounded-lg border border-green-700 px-5 py-2.5 text-center text-sm font-medium text-green-700 outline-none hover:bg-green-800 hover:text-white'
            onClick={() => inputRef.current?.click()}
          >
            <ArrowUpTrayIcon className='h-5 w-5' />
            <span>Tải ảnh lên</span>
          </button>
          <button
            type='button'
            className='mt-2 flex w-full items-center justify-center rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 outline-none hover:bg-red-800 hover:text-white'
            onClick={handleDelete}
          >
            <TrashIcon className='h-5 w-5' />
            <span>Xoá</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(InputImage)
