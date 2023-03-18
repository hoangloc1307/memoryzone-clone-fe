import Image from 'next/image'

interface Props {
  image: string
  url: string
  alt?: string
  sizes: string
}

export default function Banner({ image, url, alt = 'Banner', sizes }: Props) {
  return (
    <a
      href={url}
      className='relative block h-full w-full'
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        className='object-cover'
      />
    </a>
  )
}
