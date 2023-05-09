import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { CheckIcon, TrashIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { memo, useEffect, useRef, useState } from 'react'
import { ProductImage } from '~/types/product.type'

export type FileWithPreview = File & { preview?: string; alt?: string }

interface Props {
  label?: string
  value?: ProductImage[]
  localValue?: FileWithPreview[]
  classNameWrapper?: string
  onChange?: (files: FileWithPreview[]) => void
  onDelete?: (images: ProductImage[]) => void
}

const InputImage = ({ label, value, localValue, classNameWrapper, onChange, onDelete }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<FileWithPreview[]>(localValue ?? [])
  const [imagesCheck, setImagesCheck] = useState<(ProductImage | FileWithPreview)[]>([])

  useEffect(() => {
    setFiles(localValue ?? [])
  }, [localValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files as FileList

    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })

    const imagesWithPreview = [...files, ...Array.from(images)].map((file: FileWithPreview) => {
      file.preview = URL.createObjectURL(file)
      file.alt = ''
      return file
    })

    onChange && onChange(imagesWithPreview)

    //@ts-ignore
    ;(inputRef.current as HTMLInputElement).value = null
  }

  // Function to find index if exists
  const indexExists = (item: ProductImage | FileWithPreview) => {
    const index =
      item.constructor.name === 'File'
        ? imagesCheck.findIndex((i) => (i as FileWithPreview).preview === (item as FileWithPreview).preview)
        : imagesCheck.findIndex((i) => (i as ProductImage).id === (item as ProductImage).id)
    return index
  }

  // Handle check checkbox
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

  // Handle delete images
  const handleDelete = () => {
    const localImagesDelete = imagesCheck
      .filter((item) => item.constructor.name === 'File')
      .map((item) => (item as FileWithPreview).preview)
    const serverImagesDelete = imagesCheck.filter((item) => item.constructor.name !== 'File') as ProductImage[]

    // Revoke blob
    localImagesDelete.forEach((preview) => URL.revokeObjectURL(preview as string))
    // Set local image
    const newFiles = files.filter((item) => !localImagesDelete.includes(item.preview ?? ''))
    setFiles(newFiles)
    // Clear input checkbox
    setImagesCheck([])
    // Send server images to parent to handle
    onChange && onChange(newFiles)
    onDelete && onDelete(serverImagesDelete)
  }

  // Handle change image alt
  const handleChangeAltLocal = (event: React.ChangeEvent<HTMLInputElement>, item: FileWithPreview) => {
    const indexFile = files.findIndex((i) => i.preview === item.preview)
    if (indexFile > -1) {
      const value = event.target.value
      const newFiles = [...files]
      newFiles[indexFile].alt = value
      setFiles(newFiles)
    }
  }

  const handleChangeAltServer = (item: ProductImage) => () => {
    console.log(item)
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
                className='absolute top-1 right-1 h-5 w-5 cursor-pointer outline-none'
                checked={indexExists(image) > -1}
                onChange={handleCheck(image)}
              />
              <div className='relative mt-2'>
                <input
                  type='text'
                  className='h-7 w-full rounded border border-blue-500 py-1 pl-2 pr-9 text-xs outline-none'
                  placeholder={image.alt}
                />
                <CheckIcon
                  className='absolute top-0 right-0 h-7 w-7 cursor-pointer rounded-r border border-blue-500 bg-slate-100 p-1 text-gray-400 hover:bg-primary hover:text-white'
                  onClick={handleChangeAltServer(image)}
                />
              </div>
            </div>
          ))}
        {files.length > 0 &&
          files.map((file, index) => (
            <div key={index} className='relative w-[166px] overflow-hidden rounded border border-danger p-2'>
              <Image
                alt={file.name}
                src={file.preview as string}
                width={150}
                height={150}
                className='mx-auto block aspect-square h-auto w-[150px] rounded object-contain'
              />
              <p
                className='mt-2 cursor-default overflow-hidden text-ellipsis whitespace-nowrap border-t border-danger pt-2 text-left [direction:rtl]'
                title={file.name}
              >
                {file.name}
              </p>
              <input
                type='checkbox'
                className='absolute top-1 right-1 h-5 w-5 cursor-pointer outline-none'
                checked={indexExists(file) > -1}
                onChange={handleCheck(file)}
              />
              <input
                type='text'
                className='mt-2 w-full rounded border border-danger px-2 py-1 text-xs outline-none'
                placeholder='alt'
                value={file.alt}
                onChange={(event) => handleChangeAltLocal(event, file)}
              />
            </div>
          ))}

        {/* Add button */}
        <input type='file' hidden ref={inputRef} multiple onChange={handleChange} />
        <div className='flex h-[244px] w-[160px] flex-col items-center justify-center gap-2 rounded border border-blue-500 p-2 '>
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
