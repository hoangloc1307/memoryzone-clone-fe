import { ArrowPathIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import nProgress from 'nprogress'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '~/components/Button'
import Input from '~/components/Input'
import InputList from '~/components/InputList'
import InputSelect from '~/components/InputSelect'
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Attribute, ProductType } from '~/types/product.type'
import { ErrorResponse, SuccessResponse } from '~/types/response.type'
import { isAxiosError } from '~/utils/utils'

interface AddTypeForm {
  id?: number
  type: string
}

interface SetTypeAttributeForm {
  type?: ProductType
  attributes?: string[]
}

const defaultValueAddType: AddTypeForm = {
  id: undefined,
  type: '',
}

const AdminTypesPage = () => {
  const http = useAuthAxios()

  // Add/update/delete type form
  const addTypeForm = useForm<AddTypeForm>({
    defaultValues: defaultValueAddType,
  })
  const editTypeId = addTypeForm.watch('id')
  const currentTypeInputValue = addTypeForm.watch('type')

  // Set attributes for type form
  const setTypeAttributeForm = useForm<SetTypeAttributeForm>({
    defaultValues: { type: undefined, attributes: undefined },
  })
  const currentType = setTypeAttributeForm.watch('type')

  // Get types
  const typesQuery = useQuery({
    queryKey: ['types'],
    queryFn: () => http.get<SuccessResponse<ProductType[]>>('/type'),
    staleTime: Infinity,
    onError(err) {
      if (isAxiosError<ErrorResponse<undefined>>(err)) {
        toast.error(err.response?.data.message || err.message)
      }
    },
  })
  const types = typesQuery.data?.data.data

  // Get attributes
  const attributesQuery = useQuery({
    queryKey: ['attributes', currentType?.id],
    queryFn: () => http.get<SuccessResponse<Attribute[]>>(`/products/attributes/${currentType?.id}`),
    enabled: !!currentType?.id,
    staleTime: Infinity,
    onError(err) {
      if (isAxiosError<ErrorResponse<undefined>>(err)) {
        toast.error(err.response?.data.message || err.message)
      }
    },
  })
  const attributes = attributesQuery.data?.data.data.map((i) => i.name)

  //  Add type mutation
  const addTypeMutation = useMutation({
    mutationFn: ({ type }: { type: string }) => http.post<SuccessResponse<undefined>>('/type', { type }),
    onMutate() {
      nProgress.start()
    },
    onSuccess(data) {
      toast.success(data.data.message)
      typesQuery.refetch()
      addTypeForm.reset(defaultValueAddType)
    },
    onError(err) {
      if (isAxiosError<ErrorResponse<undefined>>(err)) {
        toast.error(err.response?.data.message || err.message)
      }
    },
    onSettled() {
      nProgress.done()
    },
  })

  // Update type mutation
  const updateTypeMutation = useMutation({
    mutationFn: ({ id, type, attributes }: { id: number; type?: string; attributes?: string[] }) =>
      http.patch<SuccessResponse<undefined>>(`/type/${id}`, { type, attributes }),
    onMutate() {
      nProgress.start()
    },
    onSuccess(data) {
      toast.success(data.data.message)
    },
    onError(err) {
      if (isAxiosError<ErrorResponse<undefined>>(err)) {
        toast.error(err.response?.data.message || err.message)
      }
    },
    onSettled() {
      nProgress.done()
    },
  })

  // Delete type mutation
  const deleteTypeMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => http.delete<SuccessResponse<undefined>>(`/type/${id}`),
    onMutate() {
      nProgress.start()
    },
    onSuccess(data) {
      toast.success(data.data.message)
      typesQuery.refetch()
      addTypeForm.reset(defaultValueAddType)
    },
    onError(err) {
      if (isAxiosError<ErrorResponse<undefined>>(err)) {
        toast.error(err.response?.data.message || err.message)
      }
    },
    onSettled() {
      nProgress.done()
    },
  })

  // Handle submit add/update/delete product type
  const handleSubmitProductType: SubmitHandler<AddTypeForm> = async (data) => {
    if (editTypeId) {
      if (data.type) {
        updateTypeMutation.mutate(
          { id: data.id as number, type: data.type },
          {
            onSuccess() {
              typesQuery.refetch()
              addTypeForm.reset(defaultValueAddType)
            },
          }
        )
      } else {
        deleteTypeMutation.mutate({ id: data.id as number })
      }
    } else {
      addTypeMutation.mutate(data)
    }
  }

  const handleSubmitSetProductType: SubmitHandler<SetTypeAttributeForm> = (data) => {
    if (data.type) {
      const payload = { id: data.type.id, attributes: data.attributes }
      updateTypeMutation.mutate(payload, {
        onSuccess() {
          attributesQuery.refetch()
          setTypeAttributeForm.reset({ type: undefined, attributes: undefined })
        },
      })
    } else {
      toast.error('Chưa chọn loại sản phẩm')
    }
  }

  const handleClickType = (type: ProductType) => () => {
    addTypeForm.reset({ id: type.id, type: type.name })
  }

  return (
    <>
      <form onSubmit={addTypeForm.handleSubmit(handleSubmitProductType)} className='flex flex-col gap-x-5 gap-y-2'>
        <h2 className='text-xl font-medium uppercase'>Thêm loại sản phẩm</h2>
        <h3 className='text-sm font-medium'>
          Tất cả loại sản phẩm{' '}
          <span className='font-normal italic text-gray-400'>(Bấm vào để vào chế độ chỉnh sửa)</span>
        </h3>
        {/* List all type */}
        <div className='flex flex-wrap gap-1'>
          {types?.map((type) => (
            <Button
              key={type.id}
              outline={type.id !== editTypeId}
              color='blue'
              size='xs'
              onClick={handleClickType(type)}
            >
              {type.name}
            </Button>
          ))}
        </div>

        {/* Input */}
        <Controller
          control={addTypeForm.control}
          name='type'
          render={({ field }) => (
            <Input
              classNameWrapper='flex-grow mt-5'
              label='Nhập loại sản phẩm'
              required
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <div className='flex items-end justify-between'>
          <span className='text-sm italic text-red-500'>
            {editTypeId && 'Đang ở chế độ chỉnh sửa, nếu xoá hết input sẽ vào chế độ xoá'}
          </span>
          {/* Buttons */}
          <div className='flex gap-2'>
            <Button
              type='submit'
              color={editTypeId ? (currentTypeInputValue === '' ? 'red' : 'yellow') : 'green'}
              leftIcon={editTypeId ? (currentTypeInputValue === '' ? TrashIcon : ArrowPathIcon) : PlusIcon}
              loading={addTypeMutation.isLoading || updateTypeMutation.isLoading || deleteTypeMutation.isLoading}
              disabled={
                (!editTypeId && !currentTypeInputValue) ||
                (!!editTypeId && types?.find((i) => i.id === editTypeId)?.name === currentTypeInputValue)
              }
            >
              {editTypeId ? (currentTypeInputValue === '' ? 'Xoá' : 'Cập nhật') : 'Thêm'}
            </Button>
            {editTypeId && (
              <Button type='reset' outline color='red' onClick={() => addTypeForm.reset(defaultValueAddType)}>
                Huỷ
              </Button>
            )}
          </div>
        </div>
      </form>

      <hr className='my-10' />

      <form onSubmit={setTypeAttributeForm.handleSubmit(handleSubmitSetProductType)}>
        <h2 className='text-xl font-medium uppercase'>Thiết lập thuộc tính cho loại sản phẩm</h2>
        <Controller
          control={setTypeAttributeForm.control}
          name='type'
          render={({ field }) => (
            <InputSelect
              label='Loại sản phẩm'
              value={field.value}
              options={types}
              propertyDisplay='name'
              propertyValue='id'
              classNameWrapper='relative mt-5'
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={setTypeAttributeForm.control}
          name='attributes'
          render={({ field }) => (
            <InputList label='Nhập thuộc tính' value={attributes} onChange={field.onChange} classNameWrapper='mt-5' />
          )}
        />

        <Button type='submit' classNameCustom='mt-10 w-full'>
          Cập nhật thuộc tính
        </Button>
      </form>
    </>
  )
}

AdminTypesPage.layout = layout.admin

export default AdminTypesPage
