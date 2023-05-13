import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import Button from '../Button'

interface Props {
  idPortal?: string
  children: React.ReactNode
  heading?: string
  content?: string
  onConfirm?: () => void
}

export default function Dialog({ idPortal = 'id-dialog', heading, content, children, onConfirm }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  })

  const click = useClick(context)
  const role = useRole(context)
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })

  const { getReferenceProps, getFloatingProps } = useInteractions([click, role, dismiss])

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal id={idPortal} root={document.body}>
        {isOpen && (
          <FloatingOverlay className='z-50 grid place-items-center bg-black/50'>
            <FloatingFocusManager context={context}>
              <div className='max-w-[300px] rounded-lg bg-white shadow' ref={refs.setFloating} {...getFloatingProps()}>
                {/* Heading */}
                <div className='flex items-start justify-between rounded-t border-b p-4'>
                  <h3 className='text-xl font-semibold text-gray-900'>{heading ?? 'Heading'}</h3>
                  <Button
                    size='xs'
                    iconButton={XMarkIcon}
                    classNameCustom='p-1.5 border-none text-gray-400 hover:bg-gray-200 hover:text-gray-900'
                    outline
                    onClick={() => setIsOpen(false)}
                  />
                </div>
                {/* Content */}
                <div className='space-y-6 p-6'>
                  <p className='text-base leading-relaxed text-gray-500 '>{content ?? 'Content'}</p>
                </div>
                {/* Buttons */}
                <div className='flex items-center justify-between rounded-b border-t border-gray-200 p-6'>
                  <Button
                    size='sm'
                    onClick={() => {
                      onConfirm && onConfirm()
                      setIsOpen(false)
                    }}
                  >
                    Confirm
                  </Button>
                  <Button size='sm' outline color='red' onClick={() => setIsOpen(false)}>
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
