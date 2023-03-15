import { useFloating, useHover, useInteractions, safePolygon, offset } from '@floating-ui/react'
import type { Placement, OffsetOptions } from '@floating-ui/react'
import { ElementType, ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
  as?: ElementType
  placement?: Placement
  referenceClassName?: string
  floatingElement?: ReactNode
  floatingClassName?: string
  offsetOption?: { mainAxis?: number; crossAxis?: number }
}

export default function Popover({
  children,
  as: Element = 'div',
  placement = 'bottom-start',
  referenceClassName,
  floatingElement,
  floatingClassName = 'w-full bg-dark',
  offsetOption,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
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
        className={referenceClassName}
        onClick={handleChangeOpen}
      >
        {children}
      </Element>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          {...getFloatingProps()}
          className={floatingClassName}
        >
          {floatingElement || 'Floating Element'}
        </div>
      )}
    </>
  )
}
