import { useEffect, useState } from 'react'
import { isBrowser } from '~/utils/utils'

export default function useViewport() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isBrowser) {
      const handleChangeWidth = () => {
        setWidth(window.innerWidth)
      }

      handleChangeWidth()

      window.addEventListener('resize', handleChangeWidth)

      return () => {
        window.removeEventListener('resize', handleChangeWidth)
      }
    }
  }, [])

  return width
}
