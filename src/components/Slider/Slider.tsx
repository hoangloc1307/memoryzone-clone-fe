import classNames from 'classnames'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { sliderData } from '~/assets/datas/sliderData'

const AUTO_PLAY_TIME = 3000

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const autoPlay = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1))
    }, AUTO_PLAY_TIME)

    return () => {
      window.clearInterval(autoPlay)
    }
  }, [currentIndex])

  return (
    <div className='w-full shadow'>
      {/* Image */}
      <div className='relative aspect-[2/1] w-full'>
        {sliderData.map((slide, index) => (
          <a
            href={slide.url}
            key={index}
            className={classNames(
              'absolute top-0 left-0 block h-full w-full transition-opacity duration-1000 ease-in-out',
              {
                'pointer-events-auto opacity-100': currentIndex === index,
                'pointer-events-none opacity-0': currentIndex !== index,
              }
            )}
          >
            <Image
              src={`/images/banners/${slide.image}`}
              alt={slide.title}
              fill
              priority
              sizes='(max-width: 1023px) 100vw, 75vw'
              className='object-cover'
            />
          </a>
        ))}
      </div>
      {/* Title list*/}
      <ul className={`grid grid-cols-${sliderData.length}`}>
        {sliderData.map((slide, index) => (
          <li key={index}>
            <p
              className={classNames(
                'flex h-full cursor-pointer flex-col items-center border-t-4 p-1 text-center text-[8px] md:text-[10px] lg:text-xs xl:text-sm',
                {
                  'border-primary bg-[#f8f8f8] font-medium': currentIndex === index,
                  'border-transparent': currentIndex !== index,
                }
              )}
              onClick={() => setCurrentIndex(index)}
            >
              {slide.title.split('_').map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
