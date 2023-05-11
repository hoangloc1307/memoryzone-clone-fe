import { BarsArrowDownIcon, BarsArrowUpIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import nProgress from 'nprogress'
import React, { useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import Input from '~/components/Input'
import InputNumber from '~/components/InputNumber'
import InputSelect from '~/components/InputSelect'
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Category } from '~/types/product.type'
import { ErrorResponse, SuccessResponse } from '~/types/response.type'
import { categorySchema } from '~/utils/rules'
import { isAxiosBadRequestError } from '~/utils/utils'

interface FormType {
  id?: number
  name: string
  order: number
  parentId: number
}

const defaultValues: FormType = {
  name: '',
  order: 0,
  parentId: 0,
}

const AdminCategoriesPage = () => {
  const http = useAuthAxios()
  const [mode, setMode] = useState<'ADD' | 'MODIFY'>('ADD')

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

  // Add category
  const addCategoryMutation = useMutation({
    mutationFn: (data: FormType) => http.post<SuccessResponse<Category>>('/category', data),
  })

  // Update category
  const updateCategoryMutation = useMutation({
    mutationFn: (data: FormType) => http.patch<SuccessResponse<Category>>(`/category/${data.id}`, data),
  })

  // Delete category
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => http.delete<SuccessResponse<Category>>(`/category/${id}`),
  })

  const handleTreeItemClick = (item: Category) => () => {
    setMode('MODIFY')
    reset({ id: item.id, name: item.name, parentId: item.parentId, order: item.order })
  }

  const handleDeleteCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: Category) => {
    event.stopPropagation()
    nProgress.start()
    deleteCategoryMutation.mutate(item.id, {
      onSuccess(data) {
        categoryQuery.refetch()
        toast.success(data.data.message)
      },
      onError(error) {
        if (isAxiosBadRequestError<ErrorResponse<undefined>>(error)) {
          toast.error(error.response?.data.message)
        }
      },
      onSettled() {
        reset(defaultValues)
        nProgress.done()
      },
    })
  }

  // Render category tree
  const renderCategoryTree = (categories: Category[]) => {
    const map = new Map<number, Category[]>()
    categories.forEach((category) => {
      const children = map.get(category.parentId) || []
      children.push(category)
      map.set(category.parentId, children)
    })

    const renderTree = (parentId: number, level: number) => {
      const children = map.get(parentId) || []
      if (children.length === 0) {
        return null
      }
      return (
        <ul
          className={classNames('border-l-2 border-primary/30 text-sm', {
            'ml-[29px] max-h-0 overflow-hidden peer-checked:max-h-max': level !== 0,
          })}
        >
          {children.map((item) => (
            <li key={item.id}>
              {map.get(item.id) && <input type='checkbox' className='peer' id={`children-of-${item.id}`} hidden />}
              <div className='group relative flex select-none items-center gap-1'>
                <span
                  className={classNames(
                    'absolute top-1/2 left-0 h-0 w-5 -translate-y-1/2 border-b-2 border-primary/30'
                  )}
                />
                {map.get(item.id) && (
                  <label
                    htmlFor={`children-of-${item.id}`}
                    className='absolute left-[22px] top-1/2 -translate-y-1/2 cursor-pointer border-2 border-primary/30 peer-checked:group-first-of-type:bg-primary/30'
                  >
                    <PlusIcon className='h-3 w-3 peer-checked:group-first-of-type:hidden' />
                    <MinusIcon className='hidden h-3 w-3 peer-checked:group-first-of-type:block' />
                  </label>
                )}
                <div
                  className={classNames('relative w-full py-1 pl-1 hover:bg-primary/10 group-hover:bg-primary/10', {
                    'ml-10': map.get(item.id),
                    'ml-[20px]': !map.get(item.id),
                  })}
                  onClick={handleTreeItemClick(item)}
                >
                  {item.name}
                </div>
                <Dialog
                  onConfirm={(event) => handleDeleteCategory(event, item)}
                  heading='Xác nhận xoá'
                  content={`Bạn chắc chắn muốn xoá danh mục '${item.name}'`}
                >
                  <span className='absolute right-1 top-1/2 hidden -translate-y-1/2 cursor-pointer p-1 hover:text-danger group-hover:block'>
                    <TrashIcon className='h-5 w-5' />
                  </span>
                </Dialog>
              </div>
              {renderTree(item.id, level + 1)}
            </li>
          ))}
        </ul>
      )
    }

    return renderTree(0, 0)
  }

  const renderCategorySelect = (options: Category[], onClick: (item: {}) => () => void) => {
    const map = new Map<number, Category[]>()
    options.forEach((option) => {
      const children = map.get(option.parentId) || []
      children.push(option)
      map.set(option.parentId, children)
    })

    const renderTree = (parentId: number, level: number) => {
      const children = map.get(parentId) || []
      if (children.length === 0) {
        return null
      }
      return (
        <ul>
          {level === 0 && (
            <li>
              <p
                className='cursor-pointer py-1 px-3 hover:bg-primary/10 hover:text-primary'
                onClick={onClick({ id: 0 })}
              >
                &nbsp;
              </p>
            </li>
          )}
          {children.map((item) => {
            const itemChildren = map.get(item.id) || []
            return (
              <li key={item.id}>
                <p className='cursor-pointer py-1 px-3 hover:bg-primary/10 hover:text-primary' onClick={onClick(item)}>
                  {'__ '.repeat(level)}
                  {item.name}
                </p>
                {itemChildren.length > 0 && renderTree(item.id, level + 1)}
              </li>
            )
          })}
        </ul>
      )
    }

    return renderTree(0, 0)
  }

  const handleRenderCategorySelect = useCallback((options: any[], onClick: (item: {}) => () => void) => {
    return renderCategorySelect(options, onClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<FormType> = (data) => {
    nProgress.start()
    if (mode === 'ADD') {
      addCategoryMutation.mutate(data, {
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
    } else if (mode === 'MODIFY') {
      updateCategoryMutation.mutate(data, {
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
          setMode('ADD')
        },
      })
    }
  }

  const onReset = () => {
    reset(defaultValues)
    setMode('ADD')
  }

  const handleExpandCollapse = (type: 'expand' | 'collapse') => () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][id^="children-of-"]')
    checkboxes.forEach((checkbox) => {
      checkbox.checked = type === 'expand'
    })
  }

  return (
    <div className='grid h-full gap-5 sm:grid-cols-2'>
      <div className='c-scrollbar h-full overflow-y-auto rounded border border-slate-300 p-2'>
        <div className='flex justify-end gap-2'>
          <Button outline size='xs' rightIcon={BarsArrowDownIcon} onClick={handleExpandCollapse('expand')}>
            Mở rộng
          </Button>
          <Button outline size='xs' rightIcon={BarsArrowUpIcon} onClick={handleExpandCollapse('collapse')}>
            Thu gọn
          </Button>
        </div>
        <div className='mt-5'>{renderCategoryTree(categories || [])}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <Input
              label='Tên danh mục'
              value={field.value}
              required
              onChange={field.onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

        {/* Parent id */}
        <Controller
          control={control}
          name='parentId'
          render={({ field }) => (
            <InputSelect
              options={categories || []}
              value={(function () {
                const value = categories?.find((item) => item.id === field.value) ?? { id: 0, name: '' }
                return { id: value.id, name: value.name }
              })()}
              propertyDisplay='name'
              propertyValue='id'
              label='Danh mục cha'
              classNameWrapper='relative mt-5 z-10'
              onChange={field.onChange}
              render={handleRenderCategorySelect}
            />
          )}
        />

        {/* Order */}
        <Controller
          control={control}
          name='order'
          render={({ field }) => (
            <InputNumber label='Thứ tự' classNameWrapper='mt-5' value={field.value} onChange={field.onChange} />
          )}
        />

        {/* Submit */}
        <div className='mt-5 grid grid-cols-2 gap-5 text-sm font-medium uppercase text-white'>
          <Button type='submit'>{mode === 'ADD' ? 'Thêm danh mục' : 'Cập nhật danh mục'}</Button>
          <Button type='reset' onClick={onReset} color={mode === 'ADD' ? 'blue' : 'red'}>
            {mode === 'ADD' ? 'Đặt lại' : 'Huỷ'}
          </Button>
        </div>
      </form>
    </div>
  )
}

AdminCategoriesPage.layout = layout.admin

export default AdminCategoriesPage
