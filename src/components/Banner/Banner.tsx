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
  priority?: boolean
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
  priority,
}: Props) {
  return (
    <a title={alt} href={url} className='relative block h-full w-full select-none'>
      <Image
        src={image}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    </a>
  )
}
