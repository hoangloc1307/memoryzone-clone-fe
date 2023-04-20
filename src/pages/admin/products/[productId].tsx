import { Combobox, Listbox } from '@headlessui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Editor } from '@tinymce/tinymce-react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useCallback, useEffect, useMemo } from 'react'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Input from '~/components/Input'
import InputAutocomplete from '~/components/InputAutocomplete'
import InputList from '~/components/InputList'
import InputNumber from '~/components/InputNumber'
import InputProductAttributeValue from '~/components/InputProductAttributeValue'
import InputSelect from '~/components/InputSelect'
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Product, ProductAttribute, ProductAttributeValue, ProductType } from '~/types/product.type'
import { SuccessResponse } from '~/types/response.type'

type FormType = Omit<Product, 'view' | 'createdAt' | 'updatedAt' | 'productType'> & {
  productTypeId: number
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
  const { data: productDetailData } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => http.get<SuccessResponse<Product>>(`/products/${productId}`),
    enabled: !!productId,
  })
  const product = productDetailData?.data.data

  // Get product types
  const { data: productTypesData } = useQuery({
    queryKey: ['productTypes'],
    queryFn: () => http.get<SuccessResponse<ProductType[]>>('/products/types'),
    enabled: product?.productType === null,
  })
  const productTypes = productTypesData?.data.data

  // Get product attribute
  const { data: productAttributesData } = useQuery({
    queryKey: ['productAttributes', valueProductTypeId],
    queryFn: () => http.get<SuccessResponse<ProductAttribute[]>>(`/products/attributes/${valueProductTypeId}`),
    enabled: product?.productType === null && !!valueProductTypeId,
    staleTime: Infinity,
  })
  const productAttributes = productAttributesData?.data.data

  // Get product vendors
  const { data: productVendorsData } = useQuery({
    queryKey: ['productVendors'],
    queryFn: () => http.get<SuccessResponse<string[]>>('/products/vendors'),
  })
  const productVendors = productVendorsData?.data.data
  const suggestList = useMemo(() => {
    return productVendors?.filter((item) => {
      return item.toLowerCase().includes(valueVendor?.toLowerCase())
    })
  }, [productVendors, valueVendor])

  const productMutation = useMutation({
    mutationFn: (data: Product) => {
      return http.patch<SuccessResponse<Product>>(`/products/${productId}`, data)
    },
  })
  const onSubmit: SubmitHandler<FormType> = (data) => {
    // NProgress.start()

    // // Handle data before send to server
    // data.price = Number(data.price.toString().replaceAll('.', ''))
    // data.priceDiscount = Number(data.priceDiscount.toString().replaceAll('.', ''))
    // data.quantity = Number(data.quantity.toString().replaceAll('.', ''))
    // data.updatedAt = new Date().toISOString()
    // data.shortInfo = data.shortInfo.reduce((result: { value: string }[], current) => {
    //   if (current.value) {
    //     return [...result, { value: current.value }]
    //   }
    //   return [...result]
    // }, [])
    // data.productTypeId = (data.productType as ProductType)?.id
    // delete data.productType
    // data.productAttributes = data.productAttributes.reduce((result: ProductAttributeValue[], current) => {
    //   if (current.value) {
    //     return [...result, { productAttributeId: current.productAttributeId, value: current.value }]
    //   }
    //   return [...result]
    // }, [])

    // productMutation.mutate(data, {
    //   onSuccess(data) {
    //     console.log(data)
    //     NProgress.done()
    //     toast.success(data.data.message)
    //   },
    //   onError(error) {
    //     NProgress.done()
    //   },
    // })
    console.log(data)
  }

  const handleChangeVendor = useCallback(
    (value: string) => {
      setValue('vendor', value)
    },
    [setValue]
  )

  return (
    <>
      {product && (
        <form className='block text-sm' onSubmit={handleSubmit(onSubmit)} spellCheck='false'>
          <p className='font-medium italic text-gray'>ID: {product.id}</p>
          {/* Name */}
          <Input
            label='Tên'
            placeholder='Tên sản phẩm'
            name='name'
            defaultValue={product.name}
            register={register}
            classNameWrapper='mt-5'
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
          <div className='mt-5'>
            <Controller
              name='description'
              control={control}
              defaultValue={product.description}
              render={({ field }) => (
                <>
                  <label className='mb-2 block text-sm font-semibold empty:hidden'>Mô tả sản phẩm</label>
                  <Editor
                    apiKey={process.env.TINYMCE_KEY}
                    initialValue={product.description}
                    onEditorChange={field.onChange}
                    init={{
                      height: 500,
                      nowrap: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'code',
                        'help',
                        'wordcount',
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    }}
                  />
                </>
              )}
            />
          </div>

          <button
            type='submit'
            className='mt-10 w-full rounded bg-primary py-2 px-4 text-sm font-medium uppercase text-white'
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
