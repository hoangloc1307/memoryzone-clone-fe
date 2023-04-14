import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Popover from '~/components/Popover'
import { HeaderCategory, categoryData } from '~/datas/categoryData'
import useViewport from '~/hooks/useViewport'

export default function Category() {
  const width = useViewport()
  const [currentCategory, setCurrentCategory] = useState(-1)

  const renderCategoryMobile = (listCategory: HeaderCategory[], level: number) => (
    <ul
      className={classNames({
        'divide-y divide-dashed text-sm text-link': level === 0,
        'max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-[999px]': level === 1,
      })}
    >
      {listCategory &&
        listCategory.length > 0 &&
        listCategory.map((item: HeaderCategory, index: number) => (
          <li key={index} className='group'>
            {level === 0 ? (
              <>
                <input type='checkbox' className='peer' hidden id={`item-${index}`} />
                <label className='group relative block' htmlFor={`item-${index}`}>
                  <Link
                    href={item.url}
                    className='inline-block py-2 font-semibold hover:underline group-hover:text-primary'
                  >
                    {item.title}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <span className='absolute right-0 top-1/2 -translate-y-1/2 font-semibold transition-transform duration-500 peer-checked:group-first-of-type:rotate-180'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='h-4 w-4 group-hover:text-primary'
                      >
                        <path
                          fillRule='evenodd'
                          d='M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                  )}
                </label>
              </>
            ) : level === 1 ? (
              <Link href={item.url} className='flex items-center gap-1 py-1 pl-2 hover:text-primary hover:underline'>
                <span>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-3 w-3'>
                    <path
                      fillRule='evenodd'
                      d='M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                <span>{item.title}</span>
              </Link>
            ) : (
              <Link href={item.url} className='block py-1 pl-10 hover:text-primary hover:underline'>
                {item.title}
              </Link>
            )}
            {item.children && item.children.length > 0 && renderCategoryMobile(item.children, level + 1)}
          </li>
        ))}
    </ul>
  )

  const renderSubCategoryComputer = (currentChildrenList: HeaderCategory[] | undefined, level: number) => (
    <>
      {currentChildrenList && currentChildrenList.length > 0 && (
        <ul
          className={classNames({
            'grid grid-cols-4 gap-5': level === 0,
          })}
        >
          {currentChildrenList.map((item: HeaderCategory, index: number) => (
            <li key={index}>
              <Link
                href={item.url}
                className={classNames('block hover:text-primary hover:underline', {
                  'pb-1 text-sm': level === 0,
                  'text-[13px] text-gray': level === 1,
                })}
              >
                {item.title}
              </Link>
              {item.children && item.children.length > 0 && renderSubCategoryComputer(item.children, level + 1)}
            </li>
          ))}
        </ul>
      )}
    </>
  )

  const renderCategoryComputer = (listCategory: HeaderCategory[]) => (
    <Popover
      placement='right-start'
      offsetOption={{ mainAxis: 0, crossAxis: 0 }}
      floatingElement={
        <div className='min-h-[440px] bg-white p-6 shadow-2xl empty:hidden'>
          {renderSubCategoryComputer(listCategory[currentCategory]?.children, 0)}
        </div>
      }
      //screen width - level 0 category width - padding both side
      floatingElementWidth={width - 64 - 270}
      //max width - category width
      floatingElementMaxWidth={1280 - 64 - 270}
    >
      <ul>
        {listCategory &&
          listCategory.length > 0 &&
          listCategory.map((item: HeaderCategory, index: number) => (
            <li
              key={index}
              onMouseEnter={() => setCurrentCategory(index)}
              className={classNames('group relative hover:bg-primary hover:text-white', {
                'bg-primary text-white': index === currentCategory,
              })}
              data-active={index === currentCategory}
            >
              <Image
                src={`/images/icons/${item.icon}`}
                alt={item.title}
                width={20}
                height={20}
                className='absolute top-1/2 left-4 -translate-y-1/2 group-data-[active=true]:invert'
              />
              <Link href={item.url} className='relative block py-2.5 pl-12 pr-9'>
                {item.title}
              </Link>
              {item.children && item.children.length > 0 && (
                <span className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                    <path
                      fillRule='evenodd'
                      d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              )}
              {index === currentCategory && item.children && item.children.length > 0 && (
                <span className='pointer-events-none absolute top-0 left-full z-10 border-[20px] border-transparent border-l-primary'></span>
              )}
            </li>
          ))}
      </ul>
    </Popover>
  )

  return (
    <Popover
      placement='bottom-start'
      className='flex w-full items-center gap-3 bg-warn py-2 px-5 font-semibold uppercase lg:w-[270px] lg:flex-grow-0'
      floatingElement={
        <div
          className={classNames('h-max bg-white text-black shadow-2xl shadow-slate-400', {
            'w-full py-2 px-5': width < 1024,
            'w-[270px]': width >= 1024,
          })}
        >
          {width < 1024 ? renderCategoryMobile(categoryData, 0) : renderCategoryComputer(categoryData)}
        </div>
      }
      floatingElementWidth={width < 1024 ? '100%' : undefined}
      onMouseEnter={() => setCurrentCategory(-1)}
    >
      <span>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
          <path
            fillRule='evenodd'
            d='M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z'
            clipRule='evenodd'
          />
        </svg>
      </span>
      <span>Danh mục sản phẩm</span>
    </Popover>
  )
}
