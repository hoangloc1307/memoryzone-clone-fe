import { useFloating, useHover, useInteractions, safePolygon, shift, size, FloatingPortal } from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import { ElementType, ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
  as?: ElementType
  placement?: Placement
  referenceClassName?: string
  floatingElement?: ReactNode
  floatingClassName?: string
}

export default function Popover({
  children,
  as: Element = 'div',
  placement = 'bottom-start',
  referenceClassName,
  floatingElement,
  floatingClassName = 'w-full bg-dark',
}: Props) {
  const [isOpen, setIsOpen] = useState(true)
  const { x, y, refs, context, strategy } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      shift(),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          console.log(availableWidth, availableHeight, elements)
          // Do things with the data, e.g.
          // Object.assign(elements.floating.style, {
          //   maxWidth: `${availableWidth}px`,
          //   maxHeight: `${availableHeight}px`,
          // })
        },
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
