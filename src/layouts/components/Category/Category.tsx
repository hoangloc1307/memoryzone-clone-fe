import { ChevronDoubleRightIcon, ChevronDownIcon, ChevronRightIcon, ListBulletIcon } from '@heroicons/react/24/outline'
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
                      <ChevronDownIcon className='h-4 w-4 group-hover:text-primary' />
                    </span>
                  )}
                </label>
              </>
            ) : level === 1 ? (
              <Link href={item.url} className='flex items-center gap-1 py-1 pl-2 hover:text-primary hover:underline'>
                <ChevronDoubleRightIcon className='h-3 w-3' />
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
                  <ChevronRightIcon className='h-6 w-6' />
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
      clickToHide={width < 1024}
    >
      <ListBulletIcon className='h-6 w-6' />
      <span>Danh mục sản phẩm</span>
    </Popover>
  )
}
