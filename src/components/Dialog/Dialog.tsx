import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react'
import { useState } from 'react'

interface Props {
  idPortal?: string
  children: React.ReactNode
  heading?: string
  content?: string
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function Dialog({ idPortal = 'id-dialog', heading, content, children, onConfirm }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  })

  const click = useClick(context)
  // const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    //   role,
    dismiss,
  ])

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal id={idPortal}>
        {isOpen && (
          <FloatingOverlay className='Dialog-overlay z-50 grid place-items-center bg-black/20' lockScroll>
            <FloatingFocusManager context={context}>
              <div className='Dialog rounded bg-white p-4' ref={refs.setFloating} {...getFloatingProps()}>
                <h3>{heading ?? 'Heading'}</h3>
                <p>{content ?? 'Content'}</p>
                <button
                  onClick={(e) => {
                    onConfirm && onConfirm(e)
                    setIsOpen(false)
                  }}
                >
                  Confirm
                </button>
                <button onClick={() => setIsOpen(false)}>Cancel</button>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  )
}
