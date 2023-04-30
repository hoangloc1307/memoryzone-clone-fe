import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useCallback, useMemo } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Input from '~/components/Input'
import InputAutocomplete from '~/components/InputAutocomplete'
import InputFile from '~/components/InputFile'
import InputList from '~/components/InputList'
import InputNumber from '~/components/InputNumber'
import InputProductAttributeValue from '~/components/InputProductAttributeValue'
import InputRichText from '~/components/InputRichText'
import InputSelect from '~/components/InputSelect'
import InputSelectMultiple from '~/components/InputSelectMultiple'
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import {
  Category,
  Product,
  ProductAttribute,
  ProductAttributeValue,
  ProductImage,
  ProductType,
} from '~/types/product.type'
import { ErrorResponse, SuccessResponse } from '~/types/response.type'
import { isAxiosError } from '~/utils/utils'

interface FormType {
  name?: string
  price?: number
  priceDiscount?: number
  quantity?: number
  vendor?: string
  typeId?: number
  shortInfo?: string[]
  slug?: string
  description?: string
  isDraft?: boolean
  isPublish?: boolean
  images?: (File & { preview: string })[]
  attributes?: ProductAttributeValue[]
  categories?: number[]
}

const defaultFormValue: FormType = {
  name: undefined,
  price: undefined,
  priceDiscount: undefined,
  quantity: undefined,
  vendor: undefined,
  typeId: undefined,
  shortInfo: undefined,
  slug: undefined,
  description: undefined,
  isDraft: undefined,
  isPublish: undefined,
  images: undefined,
  attributes: undefined,
  categories: undefined,
}

const AdminProductDetailPage = () => {
  const router = useRouter()
  const productId = router.query.productId
  const http = useAuthAxios()

  // Form
  const { handleSubmit, setValue, watch, reset, control } = useForm<FormType>({
    defaultValues: defaultFormValue,
  })
  const vendorInputValue = watch('vendor')
  const typeIdInputValue = watch('typeId')

  // Get product detail
  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: () => http.get<SuccessResponse<Product>>(`/products/${productId}`),
    enabled: !!productId,
  })
  const product = productQuery.data?.data.data

  // Get product types
  const typesQuery = useQuery({
    queryKey: ['types'],
    queryFn: () => http.get<SuccessResponse<ProductType[]>>('/products/types'),
    enabled: product?.productType === null,
  })
  const types = typesQuery.data?.data.data

  // Get product vendors
  const vendorsQuery = useQuery({
    queryKey: ['vendors'],
    queryFn: () => http.get<SuccessResponse<string[]>>('/products/vendors'),
  })
  const vendors = vendorsQuery.data?.data.data

  // Vendor suggest list
  const vendorSuggestList = useMemo(() => {
    return vendors?.filter((vendor) => {
      return vendor.toLowerCase().includes((vendorInputValue || '').toLowerCase())
    })
  }, [vendors, vendorInputValue])

  // Get product attribute
  const attributesQuery = useQuery({
    queryKey: ['attributes', typeIdInputValue],
    queryFn: () => http.get<SuccessResponse<ProductAttribute[]>>(`/products/attributes/${typeIdInputValue}`),
    enabled: product?.productType === null && !!typeIdInputValue,
    staleTime: Infinity,
  })
  const attributes = attributesQuery.data?.data.data

  // Get categories
  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => http.get<SuccessResponse<Category[]>>('/category'),
  })
  const categories = categoryQuery.data?.data.data

  // Product mutation
  const productMutation = useMutation({
    mutationFn: (
      data: Omit<FormType, 'categories'> & { categories: { add: number[]; delete: number[] } | undefined }
    ) => {
      return http.patchForm<SuccessResponse<Product>>(`/products/${productId}`, data)
    },
  })

  // Image mutation
  const imageMutation = useMutation({
    mutationFn: (data: {}) => {
      return http.patch<SuccessResponse<ProductImage>>('/products/images', data)
    },
  })

  // Submit form
  const onSubmit: SubmitHandler<FormType> = (data) => {
    // Handle data before send to server
    data.shortInfo = data.shortInfo?.reduce((result: string[], current) => {
      return current ? [...result, current] : [...result]
    }, [])
    data.attributes = data.attributes?.reduce((result: ProductAttributeValue[], current) => {
      return current.value.trim() ? [...result, current] : [...result]
    }, [])
    data.slug = data.slug || undefined
    const categories: { add: number[]; delete: number[] } | undefined = data.categories
      ? { add: [], delete: [] }
      : undefined
    if (categories) {
      product?.categories.forEach((item) => {
        if (!data.categories?.includes(item.id)) {
          categories.delete.push(item.id)
        }
      })
      data.categories?.forEach((item) => {
        const isExists = product?.categories.some((i) => item === i.id)
        if (!isExists) {
          categories.add.push(item)
        }
      })
    }

    const payload = { ...data, categories }

    const isSomeDataChange = Object.values(payload).some((value) => {
      if (
        (value instanceof Array && value.length > 0) ||
        (!(value instanceof Object) && value) ||
        (categories && (categories.add.length > 0 || categories.delete.length > 0))
      ) {
        return true
      }
      return false
    })

    if (isSomeDataChange) {
      NProgress.start()
      productMutation.mutate(payload, {
        onSuccess(data) {
          productQuery.refetch()
          reset(defaultFormValue)
          toast.success(data.data.message)
        },
        onError(error) {
          if (isAxiosError<ErrorResponse<undefined>>(error)) {
            toast.error(error.response?.data.message)
          }
        },
        onSettled() {
          NProgress.done()
        },
      })
    } else {
      toast.info('Dữ liệu chưa có sự thay đổi')
    }
  }

  const handleDeleteImage = (imageId: number, deleteHash: string) => {
    NProgress.start()
    imageMutation.mutate(
      { imageId, deleteHash },
      {
        onSuccess(data) {
          productQuery.refetch()
          toast.success(data.data.message)
        },
        onError(error) {
          console.log(error)
        },
        onSettled() {
          NProgress.done()
        },
      }
    )
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

  return (
    <>
      {product && (
        <form className='block text-sm' onSubmit={handleSubmit(onSubmit)} spellCheck='false'>
          <p className='font-medium italic text-gray'>ID: {product.id}</p>

          {/* Name */}
          <Controller
            control={control}
            name='name'
            render={({ field }) => (
              <Input
                label='Tên'
                placeholder='Tên sản phẩm'
                defaultValue={product.name}
                classNameWrapper='mt-5'
                onChange={field.onChange}
              />
            )}
          />

          <div className='mt-5 grid grid-cols-12 gap-5'>
            {/* Price */}
            <Controller
              name='price'
              control={control}
              render={({ field }) => (
                <InputNumber
                  label='Giá'
                  value={field.value ?? product.price}
                  classNameWrapper='col-span-6 md:col-span-4 lg:col-start-1 lg:col-span-4'
                  onChange={field.onChange}
                />
              )}
            />

            {/* Price discount */}
            <Controller
              name='priceDiscount'
              control={control}
              render={({ field }) => (
                <InputNumber
                  label='Giá khuyến mãi'
                  value={field.value ?? product.priceDiscount}
                  classNameWrapper='col-span-6 md:col-span-4 lg:col-start-1 lg:col-span-4'
                  onChange={field.onChange}
                />
              )}
            />

            {/* Quantity */}
            <Controller
              name='quantity'
              control={control}
              render={({ field }) => (
                <InputNumber
                  label='Số lượng'
                  value={field.value ?? product.quantity}
                  classNameWrapper='col-span-6 md:col-span-4 lg:col-start-1 lg:col-span-4'
                  onChange={field.onChange}
                />
              )}
            />

            {/* Vendor */}
            <Controller
              name='vendor'
              control={control}
              render={({ field }) => (
                <InputAutocomplete
                  label='Thương hiệu'
                  defaultValue={product.vendor}
                  suggestList={vendorSuggestList || []}
                  classNameWrapper='col-span-6 lg:col-start-1 lg:col-span-4 relative z-20'
                  onChange={(value: string) => {
                    setValue('vendor', value)
                  }}
                />
              )}
            />

            {/* Product type */}
            <Controller
              control={control}
              name='typeId'
              render={({ field }) => (
                <InputSelect
                  label='Loại sản phẩm'
                  defaultValue={{ id: product.productType?.id, type: product.productType?.type }}
                  options={types ?? []}
                  propertyDisplay='type'
                  propertyValue='id'
                  disabled={product.productType !== null}
                  classNameWrapper='col-span-6 lg:col-start-1 lg:col-span-4 relative z-10'
                  onChange={field.onChange}
                />
              )}
            />

            {/* Product attribute */}
            <Controller
              control={control}
              name='attributes'
              render={({ field }) => (
                <InputProductAttributeValue
                  label='Thuộc tính sản phẩm'
                  classNameWrapper='col-span-12 lg:col-span-12'
                  attributes={product.productType?.productAttributes ?? attributes ?? []}
                  defaultValue={product.productAttributes}
                  onChange={field.onChange}
                />
              )}
            />

            {/* Short info */}
            <Controller
              name='shortInfo'
              control={control}
              render={({ field }) => (
                <InputList
                  label='Mô tả ngắn'
                  defaultValue={product.shortInfo}
                  classNameWrapper='col-span-12 lg:col-span-8 lg:col-start-5 lg:row-span-6 lg:row-start-1'
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Categories */}
          <Controller
            control={control}
            name='categories'
            render={({ field }) => (
              <InputSelectMultiple
                label='Danh mục sản phẩm'
                options={categories || []}
                propertyValue='id'
                propertyDisplay='name'
                classNameWrapper='relative mt-5 z-10'
                render={handleRenderCategorySelect}
                defaultValue={product.categories}
                onChange={field.onChange}
              />
            )}
          />

          {/* Description */}
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <InputRichText
                label='Mô tả sản phẩm'
                defaultValue={product.description}
                classNameWrapper='mt-5'
                onChange={field.onChange}
              />
            )}
          />

          {/* Slug */}
          <Controller
            control={control}
            name='slug'
            render={({ field }) => (
              <Input
                label='URL tuỳ chỉnh'
                defaultValue={product.slug}
                classNameWrapper='mt-5'
                onChange={field.onChange}
              />
            )}
          />

          {/* Images */}
          <Controller
            control={control}
            name='images'
            render={({ field }) => (
              <InputFile
                label='Hình ảnh sản phẩm'
                classNameWrapper='mt-5'
                defaultValue={product.images}
                value={field.value}
                onChange={field.onChange}
                onDelete={handleDeleteImage}
              />
            )}
          />

          {/* Submit button */}
          <button
            type='submit'
            className='mt-10 w-full rounded bg-primary py-2 px-4 text-sm font-medium uppercase text-white'
            disabled={productMutation.isLoading}
          >
            Cập nhật sản phẩm
          </button>
        </form>
      )}
    </>
  )
}

AdminProductDetailPage.layout = layout.admin
export default AdminProductDetailPage
