import { PlusIcon } from '@heroicons/react/24/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import nProgress from 'nprogress'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '~/components/Button'
import Input from '~/components/Input'
import InputSelect from '~/components/InputSelect'
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Attribute, ProductType } from '~/types/product.type'
import { ErrorResponse, SuccessResponse } from '~/types/response.type'
import { productTypeSchema } from '~/utils/rules'
import { isAxiosBadRequestError } from '~/utils/utils'

interface AddTypeForm {
  id?: number
  type: string
}

interface SetTypeAttributeForm {
  id?: number
  attributes?: Attribute[]
}

const AdminTypesPage = () => {
  const http = useAuthAxios()
  const addTypeForm = useForm<AddTypeForm>({
    defaultValues: { id: undefined, type: '' },
    resolver: yupResolver(productTypeSchema),
  })
  const setTypeAttributeForm = useForm<SetTypeAttributeForm>({
    defaultValues: { id: undefined, attributes: undefined },
  })

  // Get types
  const typesQuery = useQuery({
    queryKey: ['types'],
    queryFn: () => http.get<SuccessResponse<ProductType[]>>('/type'),
    staleTime: Infinity,
  })
  const types = typesQuery.data?.data.data

  //  Add type mutation
  const addTypeMutation = useMutation({
    mutationFn: ({ type }: { type: string }) => http.post<SuccessResponse<undefined>>('/type', { type }),
  })

  const handleSubmitProductType: SubmitHandler<AddTypeForm> = (data) => {
    nProgress.start()
    addTypeMutation.mutate(data, {
      onSuccess(data) {
        toast.success(data.data.message)
        typesQuery.refetch()
        addTypeForm.reset({ id: undefined, type: '' })
      },
      onError(error) {
        if (isAxiosBadRequestError<ErrorResponse<undefined>>(error)) {
          toast.error(error.response?.data.message)
        }
      },
      onSettled() {
        nProgress.done()
      },
    })
  }

  const handleSubmitSetProductType: SubmitHandler<SetTypeAttributeForm> = (data) => {
    console.log(data)
  }

  return (
    <>
      <form onSubmit={addTypeForm.handleSubmit(handleSubmitProductType)} className='flex flex-col gap-x-5 gap-y-2'>
        <Controller
          control={addTypeForm.control}
          name='type'
          render={({ field }) => (
            <Input
              classNameWrapper='flex-grow'
              label='Nhập loại sản phẩm'
              required
              value={field.value}
              errorMessage={addTypeForm.formState.errors.type?.message}
              onChange={field.onChange}
            />
          )}
        />
        <div className='place-self-end'>
          <Button type='submit' leftIcon={PlusIcon}>
            Thêm loại sản phẩm
          </Button>
        </div>
      </form>
      <div className='flex flex-wrap gap-1'>
        {types?.map((type) => (
          <Button key={type.id} outline color='blue' size='xs'>
            {type.name}
          </Button>
        ))}
      </div>
      <hr className='my-10' />
      <form onSubmit={setTypeAttributeForm.handleSubmit(handleSubmitSetProductType)}>
        <h2 className='text-sm font-medium uppercase'>Thiết lập thuộc tính cho loại sản phẩm</h2>
        <Controller
          control={setTypeAttributeForm.control}
          name='id'
          render={({ field }) => (
            <InputSelect
              label='Loại sản phẩm'
              value={{ id: undefined, name: undefined }}
              options={types}
              propertyDisplay='name'
              propertyValue='id'
              classNameWrapper='relative mt-5'
              onChange={field.onChange}
            />
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
