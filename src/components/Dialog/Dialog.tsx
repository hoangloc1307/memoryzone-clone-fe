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
import Button from '../Button'

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
          <FloatingOverlay className='z-50 grid place-items-center bg-black/20' lockScroll>
            <FloatingFocusManager context={context}>
              <div
                className='max-w-[300px] rounded bg-white p-4 shadow-xl'
                ref={refs.setFloating}
                {...getFloatingProps()}
              >
                <h3 className='font-medium'>{heading ?? 'Heading'}</h3>
                <p className='mt-2 text-sm'>{content ?? 'Content'}</p>
                <div className='mt-5 flex justify-around gap-3'>
                  <Button
                    outline
                    onClick={(e) => {
                      onConfirm && onConfirm(e)
                      setIsOpen(false)
                    }}
                  >
                    Confirm
                  </Button>
                  <Button outline color='red' onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  )
}
