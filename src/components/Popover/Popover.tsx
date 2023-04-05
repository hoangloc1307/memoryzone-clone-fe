import {
  Placement,
  offset,
  safePolygon,
  useClick,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react'
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
  showOnHover?: boolean
  showOnFocus?: boolean
  showOnClick?: boolean
  onMouseEnter?: () => void
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
  showOnHover = true,
  showOnFocus = false,
  showOnClick = false,
  onMouseEnter,
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
    enabled: showOnHover,
    handleClose: safePolygon(),
  })
  const focus = useFocus(context, {
    enabled: showOnFocus,
    keyboardOnly: false,
  })
  const click = useClick(context, {
    enabled: showOnClick,
    ignoreMouse: false,
    toggle: true,
    event: 'click',
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, click])

  const handleChangeOpen = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <Element
        ref={refs.setReference}
        className={className}
        onClick={showOnClick || showOnFocus ? undefined : handleChangeOpen}
        {...getReferenceProps()}
        onMouseEnter={onMouseEnter}
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
