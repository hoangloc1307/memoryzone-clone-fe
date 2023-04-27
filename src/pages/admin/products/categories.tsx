import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { useCallback } from 'react'
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Category } from '~/types/product.type'
import { SuccessResponse } from '~/types/response.type'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Input from '~/components/Input'
import InputSelect from '~/components/InputSelect'
import nProgress from 'nprogress'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { categorySchema } from '~/utils/rules'

interface FormType {
  name: string
  parentId: number
}

const defaultValues: FormType = {
  name: '',
  parentId: 0,
}

const AdminCategoriesPage = () => {
  const http = useAuthAxios()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(categorySchema),
  })

  // Get categories
  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => http.get<SuccessResponse<Category[]>>('/category'),
  })
  const categories = categoryQuery.data?.data.data

  const categoryMutation = useMutation({
    mutationFn: (data: FormType) => http.post<SuccessResponse<Category>>('/category', data),
  })

  // Render category tree
  const renderCategoryTree = (categories: Category[], level: number) => {
    return (
      <>
        <ul
          className={classNames('border-l-2 border-slate-600 text-sm', {
            'ml-[49px] max-h-0 overflow-hidden peer-checked:max-h-max': level !== 0,
          })}
        >
          {categories.map((category) => (
            <li key={category.id} className='mt-3'>
              {category.children && <input type='checkbox' className='peer' id={`children-of-${category.id}`} hidden />}
              <label
                className={classNames('group relative flex select-none items-center gap-1 hover:text-primary', {
                  'cursor-pointer': !!category.children,
                })}
                htmlFor={`children-of-${category.id}`}
              >
                <span className={classNames('absolute top-1/2 left-0 h-0.5 w-10 -translate-y-1/2 bg-slate-600')} />
                {category.children && (
                  <span className='absolute left-[42px] top-1/2 -translate-y-1/2 border-2 border-slate-600 group-hover:border-primary'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='h-3 w-3 peer-checked:group-first-of-type:hidden'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='hidden h-3 w-3 peer-checked:group-first-of-type:block'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                )}
                <span
                  className={classNames({
                    'pl-16': !!category.children,
                    'pl-[42px]': !category.children,
                  })}
                >
                  {category.name}
                </span>
              </label>
              {category.children && renderCategoryTree(category.children, level + 1)}
            </li>
          ))}
        </ul>
      </>
    )
  }

  const renderCategorySelect = (item: any, level: number, onClick: (item: {}) => () => void) => {
    return (
      <div
        key={item.id}
        className={classNames({
          'px-3': level === 0,
          'pl-5 pr-0': level !== 0,
        })}
      >
        <p onClick={onClick(item)} className='cursor-pointer py-1 text-sm hover:text-primary'>
          {item.name}
        </p>
        {item.children &&
          item.children.map((i: any) => {
            return <div key={i.id}>{renderCategorySelect(i, level + 1, onClick)}</div>
          })}
      </div>
    )
  }

  const handleRenderCategorySelect = useCallback((item: any, onClick: (item: {}) => () => void) => {
    return renderCategorySelect(item, 0, onClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<FormType> = (data) => {
    nProgress.start()
    categoryMutation.mutate(data, {
      onSuccess(data) {
        categoryQuery.refetch()
        toast.success(data.data.message)
      },
      onError(error) {
        console.log(error)
      },
      onSettled() {
        reset(defaultValues)
        nProgress.done()
      },
    })
  }

  return (
    <div className='grid h-full gap-5 sm:grid-cols-2'>
      <div className='h-full rounded border border-slate-300 p-2'>{renderCategoryTree(categories || [], 0)}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <Input label='Tên danh mục' required onChange={field.onChange} errorMessage={errors.name?.message} />
          )}
        />

        {/* Parent id */}
        <Controller
          control={control}
          name='parentId'
          render={({ field }) => (
            <InputSelect
              options={categories || []}
              propertyDisplay='name'
              propertyValue='id'
              label='Danh mục cha'
              required
              classNameWrapper='relative mt-5'
              onChange={field.onChange}
              render={handleRenderCategorySelect}
            />
          )}
        />

        {/* Submit */}
        <button
          className='mt-5 w-full rounded bg-primary py-2 px-4 text-sm font-medium uppercase text-white'
          type='submit'
        >
          Thêm danh mục
        </button>
      </form>
    </div>
  )
}

AdminCategoriesPage.layout = layout.admin

export default AdminCategoriesPage
