import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { useCallback, useState } from 'react'
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Category } from '~/types/product.type'
import { ErrorResponse, SuccessResponse } from '~/types/response.type'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Input from '~/components/Input'
import InputSelect from '~/components/InputSelect'
import nProgress from 'nprogress'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { categorySchema } from '~/utils/rules'
import { isAxiosBadRequestError } from '~/utils/utils'
import Dialog from '~/components/Dialog'
import InputNumber from '~/components/InputNumber'

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

  // Update category
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
    // Tạo một đối tượng Map để lưu trữ các danh mục con theo id
    const map = new Map<number, Category[]>()
    categories.forEach((category) => {
      // Nếu phần tử có parentId, thì thêm nó vào danh sách con của parentId đó
      const children = map.get(category.parentId) || []
      children.push(category)
      map.set(category.parentId, children)
    })

    // Hàm đệ quy để hiển thị cây từ một phần tử cha
    const renderTree = (parentId: number, level: number) => {
      // Lấy danh sách con của phần tử cha từ map
      const children = map.get(parentId) || []
      // Nếu không có danh sách con, trả về null
      if (children.length === 0) {
        return null
      }
      // Nếu có danh sách con, duyệt qua từng phần tử và gọi đệ quy để hiển thị chúng
      return (
        <ul
          className={classNames('border-l-2 border-slate-600 text-sm', {
            'ml-[29px] max-h-0 overflow-hidden peer-checked:max-h-max': level !== 0,
          })}
        >
          {children.map((item) => (
            <li key={item.id}>
              {map.get(item.id) && <input type='checkbox' className='peer' id={`children-of-${item.id}`} hidden />}
              <div className='group relative flex select-none items-center gap-1'>
                <span className={classNames('absolute top-1/2 left-0 h-0.5 w-5 -translate-y-1/2 bg-slate-600')} />
                {map.get(item.id) && (
                  <label
                    htmlFor={`children-of-${item.id}`}
                    className='absolute left-[22px] top-1/2 -translate-y-1/2 cursor-pointer border-2 border-slate-600'
                  >
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
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-5 w-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                      />
                    </svg>
                  </span>
                </Dialog>
              </div>
              {renderTree(item.id, level + 1)}
            </li>
          ))}
        </ul>
      )
    }

    // Gọi hàm đệ quy với parentId ban đầu
    return renderTree(0, 0)
  }

  const renderCategorySelect = (options: Category[], onClick: (item: {}) => () => void) => {
    // Tạo một đối tượng Map để lưu trữ các danh mục con theo id
    const map = new Map<number, Category[]>()
    options.forEach((option) => {
      // Nếu phần tử có parentId, thì thêm nó vào danh sách con của parentId đó
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

  return (
    <div className='grid h-full gap-5 sm:grid-cols-2'>
      <div className='h-full rounded border border-slate-300 p-2'>{renderCategoryTree(categories || [])}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <Input
              label='Tên danh mục'
              defaultValue={field.value}
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
              defaultValue={(function () {
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
          <button className='w-full rounded bg-primary py-2 px-4' type='submit'>
            {mode === 'ADD' ? 'Thêm danh mục' : 'Cập nhật danh mục'}
          </button>
          <button className='w-full rounded bg-danger py-2 px-4' type='reset' onClick={onReset}>
            {mode === 'ADD' ? 'Đặt lại' : 'Huỷ'}
          </button>
        </div>
      </form>
    </div>
  )
}

AdminCategoriesPage.layout = layout.admin

export default AdminCategoriesPage
