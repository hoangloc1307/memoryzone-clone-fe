import { useEffect, useRef, useState } from 'react'
import { isBrowser } from '~/utils/utils'
import debounce from 'lodash/debounce'

export default function useViewport() {
  const [width, setWidth] = useState(0)

  const handleChangeWidth = useRef(
    debounce(() => {
      if (isBrowser) {
        setWidth(window.innerWidth)
      }
    }, 500)
  ).current

  useEffect(() => {
    if (isBrowser) {
      handleChangeWidth()

      window.addEventListener('resize', handleChangeWidth)

      return () => {
        window.removeEventListener('resize', handleChangeWidth)
      }
    }
  }, [handleChangeWidth])

  return width
}
