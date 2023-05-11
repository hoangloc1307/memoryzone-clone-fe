import { SignalIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

type Props = {
  children?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'black'
  outline?: boolean
  pill?: boolean
  type?: HTMLButtonElement['type']
  link?: Url
  iconButton?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & React.RefAttributes<SVGSVGElement>
  >
  leftIcon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & React.RefAttributes<SVGSVGElement>
  >
  rightIcon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & React.RefAttributes<SVGSVGElement>
  >
  target?: HTMLLinkElement['target']
  disabled?: boolean
  loading?: boolean
  classNameCustom?: string
  onClick?: () => void
} & {
  [key: string]: any
}

export default function Button({
  children,
  size = 'md',
  color = 'green',
  outline,
  pill,
  type = 'button',
  link,
  iconButton,
  leftIcon,
  rightIcon,
  target,
  disabled,
  loading,
  classNameCustom,
  onClick,
}: Props) {
  const Element: any = link ? Link : 'button'
  const LeftIcon: any = leftIcon
  const RightIcon: any = rightIcon
  const IconButton: any = iconButton

  const elementProps: { [key: string]: any } = {}

  if (link) {
    elementProps.href = link
    elementProps.target = target
  } else {
    elementProps.type = type
    elementProps.disabled = !!disabled
  }

  return (
    <Element
      {...elementProps}
      className={twMerge(
        classNames('text-center font-medium text-white outline-none', {
          // Size
          'px-3 py-2 text-xs': size === 'xs',
          'px-3 py-2 text-sm': size === 'sm',
          'px-5 py-2.5 text-sm': size === 'md',
          'px-5 py-3 text-base': size === 'lg',
          'px-6 py-3.5 text-base': size === 'xl',

          // Color solid
          'bg-blue-700 hover:bg-blue-800': color === 'blue' && !outline,
          'bg-green-700 hover:bg-green-800': color === 'green' && !outline,
          'bg-yellow-300 text-black hover:bg-yellow-400': color === 'yellow' && !outline,
          'bg-red-700 hover:bg-red-800': color === 'red' && !outline,
          'bg-gray-800 hover:bg-gray-900': color === 'black' && !outline,

          // Color outline
          'border hover:text-white': outline,
          'border-blue-700 text-blue-700 hover:bg-blue-800': color === 'blue' && outline,
          'border-green-700 text-green-700 hover:bg-green-800': color === 'green' && outline,
          'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black': color === 'yellow' && outline,
          'border-red-700 text-red-700 hover:bg-red-800': color === 'red' && outline,
          'border-gray-800 text-gray-900 hover:bg-gray-900': color === 'black' && outline,

          // Border radius
          'rounded-full': pill,
          'rounded-lg': !pill,

          // Icon
          'inline-flex items-center justify-center': leftIcon || rightIcon || loading,

          // Icon button
          'p-2.5': !!iconButton,

          // Disabled
          'cursor-not-allowed opacity-70': disabled,
          'pointer-events-none': disabled && !!link,
        }),
        classNameCustom
      )}
      onClick={onClick}
    >
      {!iconButton && loading && <SignalIcon className='mr-2 -ml-1 h-5 w-5 animate-spin' />}
      {!loading && leftIcon && <LeftIcon className='mr-2 -ml-1 h-5 w-5' />}
      {iconButton ? (
        loading ? (
          <SignalIcon className='h-5 w-5 animate-spin' />
        ) : (
          <IconButton className='h-5 w-5' />
        )
      ) : (
        children
      )}
      {!loading && rightIcon && <RightIcon className='ml-2 -mr-1 h-5 w-5' />}
    </Element>
  )
}
