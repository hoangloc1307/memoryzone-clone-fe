import type { Placement } from '@floating-ui/react'
import { offset, safePolygon, useFloating, useHover, useInteractions } from '@floating-ui/react'
import isNil from 'lodash/isNil'
import omitBy from 'lodash/omitBy'
import { ElementType, ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
  as?: ElementType
  placement?: Placement
  className?: string
  floatingElement?: ReactNode
  floatingElementWidth?: number | string
  floatingElementMaxWidth?: number
  offsetOption?: { mainAxis?: number; crossAxis?: number }
}

export default function Popover({
  children,
  as: Element = 'div',
  placement = 'bottom-start',
  className,
  floatingElement,
  offsetOption,
  floatingElementWidth,
  floatingElementMaxWidth,
}: Props) {
  const [isOpen, setIsOpen] = useState(true)
  const { x, y, refs, context, strategy } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset({
        mainAxis: offsetOption?.mainAxis || 0,
        crossAxis: offsetOption?.crossAxis || 0,
      }),
    ],
  })
  const hover = useHover(context, {
    handleClose: safePolygon(),
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  const handleChangeOpen = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <Element
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
        onClick={handleChangeOpen}
      >
        {children}
      </Element>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={omitBy(
            {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: floatingElementWidth,
              maxWidth: floatingElementMaxWidth,
            },
            isNil
          )}
          {...getFloatingProps()}
        >
          {floatingElement || null}
        </div>
      )}
    </>
  )
}
