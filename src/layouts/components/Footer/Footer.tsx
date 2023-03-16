import classNames from 'classnames'
import { footerCategoryData } from '~/assets/data'
import useViewport from '~/hooks/useViewport'

export default function Footer() {
  const width = useViewport()
  return (
    <footer>
      <div className='c-container'>
        <div className='grid grid-cols-12 gap-y-3 divide-y divide-dotted divide-slate-300 lg:divide-none'>
          {footerCategoryData.map((item, index) => (
            <div
              key={index}
              className={classNames('col-span-12', {
                'lg:col-span-3': index !== 0,
                'lg:col-span-2': index === 0,
              })}
            >
              <details className='group peer'>
                <summary className='flex items-center justify-between pb-1 pt-4'>
                  <h2 className='text-sm font-semibold uppercase'>{item.title}</h2>
                  {width < 1024 && (
                    <span className='[transition:all_0.5s_ease-in-out] group-open:rotate-[135deg]'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='h-4 w-4'
                      >
                        <path
                          fillRule='evenodd'
                          d='M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                  )}
                </summary>
              </details>
              <ul className='max-h-0 overflow-hidden [transition:all_0.5s_ease-in-out] peer-open:max-h-[500px] lg:max-h-max'>
                {item.children.map((child, index) => (
                  <li key={index}>
                    <a
                      href={child.url}
                      className='block py-2 text-xs text-gray hover:text-primary hover:underline'
                    >
                      {child.tiltle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
