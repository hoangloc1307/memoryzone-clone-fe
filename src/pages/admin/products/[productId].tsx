import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useMemo } from 'react'
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
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Product, ProductAttribute, ProductAttributeValue, ProductImage, ProductType } from '~/types/product.type'
import { SuccessResponse } from '~/types/response.type'

type FormType = Omit<Product, 'view' | 'createdAt' | 'updatedAt' | 'productType'> & {
  productTypeId: number
  images: (File & { preview: string })[]
}

const AdminProductDetailPage = () => {
  const router = useRouter()
  const productId = router.query.productId
  const http = useAuthAxios()

  // Form
  const { handleSubmit, register, setValue, watch, control } = useForm<FormType>()
  const valueVendor = watch('vendor')
  const valueProductTypeId = watch('productTypeId')

  // Get product detail
  const productDetailQuery = useQuery({
    queryKey: ['product', productId],
    queryFn: () => http.get<SuccessResponse<Product>>(`/products/${productId}`),
    enabled: !!productId,
  })
  const product = productDetailQuery.data?.data.data

  // Get product types
  const productTypesQuery = useQuery({
    queryKey: ['productTypes'],
    queryFn: () => http.get<SuccessResponse<ProductType[]>>('/products/types'),
    enabled: product?.productType === null,
  })
  const productTypes = productTypesQuery.data?.data.data

  // Get product attribute
  const productAttributesQuery = useQuery({
    queryKey: ['productAttributes', valueProductTypeId],
    queryFn: () => http.get<SuccessResponse<ProductAttribute[]>>(`/products/attributes/${valueProductTypeId}`),
    enabled: product?.productType === null && !!valueProductTypeId,
    staleTime: Infinity,
  })
  const productAttributes = productAttributesQuery.data?.data.data

  // Get product vendors
  const productVendorsQuery = useQuery({
    queryKey: ['productVendors'],
    queryFn: () => http.get<SuccessResponse<string[]>>('/products/vendors'),
  })
  const productVendors = productVendorsQuery.data?.data.data

  const suggestList = useMemo(() => {
    return productVendors?.filter((item) => {
      return item.toLowerCase().includes(valueVendor?.toLowerCase())
    })
  }, [productVendors, valueVendor])

  // Product mutation
  const productMutation = useMutation({
    mutationFn: (data: FormType) => {
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
    data.productAttributes = data.productAttributes?.reduce((result: ProductAttributeValue[], current) => {
      return current.value.trim() ? [...result, current] : [...result]
    }, [])
    data.slug = data.slug || undefined

    const isSomeDataChange = Object.values(data).some((value) => {
      if ((value instanceof Array && value.length > 0) || (!(value instanceof Array) && value)) {
        return true
      }
      return false
    })

    if (isSomeDataChange) {
      NProgress.start()
      productMutation.mutate(data, {
        onSuccess(data) {
          productDetailQuery.refetch()
          setValue('images', [])
          toast.success(data.data.message)
        },
        onError(error) {},
        onSettled() {
          NProgress.done()
        },
      })
    } else {
      toast.info('Dữ liệu chưa có sự thay đổi')
    }
  }

  const handleChangeVendor = (value: string) => {
    setValue('vendor', value)
  }

  const handleDeleteImage = (imageId: number, deleteHash: string) => {
    NProgress.start()
    imageMutation.mutate(
      { imageId, deleteHash },
      {
        onSuccess(data) {
          productDetailQuery.refetch()
          toast.success(data.data.message)
        },
        onError(error) {},
        onSettled() {
          NProgress.done()
        },
      }
    )
  }

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
                  defaultValue={product.price}
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
                  defaultValue={product.priceDiscount}
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
                  defaultValue={product.quantity}
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
                  suggestList={suggestList || []}
                  classNameWrapper='col-span-6 lg:col-start-1 lg:col-span-4 relative z-20'
                  onChange={handleChangeVendor}
                />
              )}
            />

            {/* Product type */}
            <Controller
              control={control}
              name='productTypeId'
              render={({ field }) => (
                <InputSelect
                  label='Loại sản phẩm'
                  defaultValue={{ id: product.productType?.id, type: product.productType?.type }}
                  options={productTypes ?? []}
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
              name='productAttributes'
              render={({ field }) => (
                <InputProductAttributeValue
                  label='Thuộc tính sản phẩm'
                  classNameWrapper='col-span-12 lg:col-span-12'
                  attributes={product.productType?.productAttributes ?? productAttributes ?? []}
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
