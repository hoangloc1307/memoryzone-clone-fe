import Image from 'next/image'

interface Props {
  image: string
  url: string
  alt?: string
  sizes?: string
  fill?: boolean
  width?: number | undefined
  height?: number | undefined
  className?: string
}

export default function Banner({
  image,
  url,
  alt = 'Banner',
  sizes,
  fill,
  width,
  height,
  className = 'object-cover',
}: Props) {
  return (
    <a
      href={url}
      className='relative block h-full w-full'
    >
      <Image
        src={image}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
      />
    </a>
  )
}
