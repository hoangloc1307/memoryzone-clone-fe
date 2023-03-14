import { useFloating, useHover, useInteractions, safePolygon, shift } from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import { ElementType, ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
  as?: ElementType
  placement?: Placement
}

export default function Popover({ children, as: Element = 'div', placement = 'bottom' }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [shift()],
  })
  const hover = useHover(context, {
    handleClose: safePolygon(),
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <>
      <Element
        ref={refs.setReference}
        {...getReferenceProps()}
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
          className='block h-80 w-80 bg-dark'
        >
          Floating element
        </div>
      )}
    </>
  )
}
