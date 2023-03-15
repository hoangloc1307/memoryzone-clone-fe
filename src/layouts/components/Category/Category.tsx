import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { categoryData, HeaderCategory } from '~/assets/data'
import useViewport from '~/hooks/useViewport'
import Popover from '../../../components/Popover'

export default function Category() {
  const width = useViewport()
  const [currentCategory, setCurrentCategory] = useState(-1)

  const renderCategoryMobile = (listCategory: HeaderCategory[], level: number) => (
    <ul
      className={classNames({
        'divide-y divide-dashed text-sm text-link': level === 0,
        'max-h-0 overflow-hidden transition-all duration-1000 group-data-[active=true]:max-h-[999px] group-data-[active=false]:duration-500':
          level === 1,
      })}
    >
      {listCategory &&
        listCategory.length > 0 &&
        listCategory.map((item: HeaderCategory, index: number) => (
          <li
            key={index}
            className='group'
            onClick={() => {
              if (level === 0) {
                if (currentCategory !== index) {
                  setCurrentCategory(index)
                } else {
                  setCurrentCategory(-1)
                }
              }
            }}
            data-active={index === currentCategory}
          >
            {level === 0 ? (
              <div className='relative'>
                <a
                  href='#'
                  className='inline-block py-1 font-semibold hover:underline group-hover:text-primary'
                >
                  {item.title}
                </a>
                <span className='absolute right-0 top-1/2 -translate-y-1/2 font-semibold transition-transform duration-500 group-data-[active=true]:rotate-180'>
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
              </div>
            ) : level === 1 ? (
              <a
                href='#'
                className='flex items-center gap-1 py-1 pl-2 hover:text-primary hover:underline'
              >
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-3 w-3'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                <span>{item.title}</span>
              </a>
            ) : (
              <a
                href='#'
                className='block py-1 pl-10 hover:text-primary hover:underline'
              >
                {item.title}
              </a>
            )}
            {item.children && item.children.length > 0 && renderCategoryMobile(item.children, level + 1)}
          </li>
        ))}
    </ul>
  )

  const renderSubCategoryComputer = (currentChildrenList: HeaderCategory[], level: number) => (
    <ul className=''>
      {currentChildrenList &&
        currentChildrenList.length > 0 &&
        currentChildrenList.map((item: HeaderCategory, index: number) => (
          <li key={index}>
            <a href='#'>{item.title}</a>
            {item.children && item.children.length > 0 && renderSubCategoryComputer(item.children, level + 1)}
          </li>
        ))}
    </ul>
  )

  const renderCategoryComputer = (listCategory: HeaderCategory[]) => (
    <Popover
      placement='right-start'
      offsetOption={{ mainAxis: 20, crossAxis: -8 }}
      floatingClassName='bg-blue-200 w-[988px] h-max'
      floatingElement={renderSubCategoryComputer(listCategory[0].children as HeaderCategory[], 0)}
    >
      <ul className=''>
        {listCategory &&
          listCategory.length > 0 &&
          listCategory.map((item: HeaderCategory, index: number) => (
            <li key={index}>
              <a href='#'>{item.title}</a>
            </li>
          ))}
      </ul>
    </Popover>
  )

  return (
    <Popover
      placement='bottom-start'
      referenceClassName='flex flex-grow items-center gap-3 bg-second py-2 px-5 font-semibold uppercase lg:flex-grow-0'
      floatingClassName={classNames('shadow-2xl py-2 px-5 shadow-slate-400 bg-white text-black h-max', {
        'w-full': width < 1024,
        'w-[228px]': width >= 1024,
      })}
      floatingElement={width < 1024 ? renderCategoryMobile(categoryData, 0) : renderCategoryComputer(categoryData)}
    >
      <span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-6 w-6'
        >
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
