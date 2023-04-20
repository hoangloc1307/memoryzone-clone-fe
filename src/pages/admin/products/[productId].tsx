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
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Product, ProductAttribute, ProductAttributeValue, ProductType } from '~/types/product.type'
import { SuccessResponse } from '~/types/response.type'

const AdminProductDetailPage = () => {
  const router = useRouter()
  const productId = router.query.productId
  const http = useAuthAxios()

  // Form
  const { handleSubmit, register, setValue, watch, control } = useForm<Product>()
  const valueVendor = watch('vendor')
  const valueProductTypeId = watch('productType.id')
  const shortInfoFieldArray = useFieldArray({
    control: control,
    name: 'shortInfo',
  })
  const productAttributesFieldArray = useFieldArray({
    control: control,
    name: 'productAttributes',
  })

  // Get product detail
  const { data: productDetailData } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => http.get<SuccessResponse<Product>>(`/products/${productId}`),
    onSuccess(data) {
      const response = data.data.data
      const shortInfo = response.shortInfo
      setValue('shortInfo', shortInfo)
      if (response.productType) {
        const attributes = response.productType.productAttributes.reduce((result: ProductAttributeValue[], current) => {
          const findItem = response.productAttributes.find((item) => item.productAttributeId == current.id)
          if (findItem) {
            return [...result, { productAttributeId: current.id, value: findItem.value, attribute: current.attribute }]
          }
          return [...result, { productAttributeId: current.id, value: '', attribute: current.attribute }]
        }, [])
        setValue('productAttributes', attributes)
      }
    },
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
  // const productTypes = useMemo(() => {
  //   return productTypesData?.data.data.reduce((result: { [key: string]: string }, current) => {
  //     return { ...result, [current.id]: current.type }
  //   }, {})
  // }, [productTypesData])

  // Get product attribute
  const { data: productAttributesData } = useQuery({
    queryKey: ['productAttributes', valueProductTypeId],
    queryFn: () => http.get<SuccessResponse<ProductAttribute[]>>(`/products/attributes/${valueProductTypeId}`),
    enabled: product?.productType === null && !!valueProductTypeId,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (productAttributesData) {
      const values = productAttributesData.data.data.reduce((result: ProductAttributeValue[], current) => {
        return [...result, { productAttributeId: current.id, value: '', attribute: current.attribute }]
      }, [])
      setValue('productAttributes', values)
    }
  }, [productAttributesData, setValue])

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
  const onSubmit: SubmitHandler<Product> = (data) => {
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
                  classNameWrapper='col-span-6 lg:col-start-1 lg:col-span-4 relative z-10'
                  onChange={handleChangeVendor}
                />
              )}
            />

            {/* Product type */}
            <div className='col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-1'>
              {productTypes && (
                <>
                  <label className='mb-2 block text-sm font-semibold empty:hidden'>Loại sản phẩm</label>
                  <Controller
                    control={control}
                    name='productType.id'
                    render={({ field }) => (
                      <Listbox defaultValue={product.productType?.id} onChange={field.onChange}>
                        <div className='group relative'>
                          <Listbox.Button className='relative h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none group-focus-within:ring-1 group-focus-within:ring-primary'>
                            {({ value }) => {
                              const findItem = productTypes.find((item) => item.id === value)
                              return (
                                <>
                                  <span className='block text-left'>{findItem?.type}</span>
                                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      strokeWidth={1.5}
                                      stroke='currentColor'
                                      className='text-gray-400 h-5 w-5'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                                      />
                                    </svg>
                                  </span>
                                </>
                              )
                            }}
                          </Listbox.Button>
                          <Listbox.Options className='c-scrollbar absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded bg-white py-1 text-sm shadow ring-1 ring-black/5 focus:outline-none'>
                            {productTypes.map((item) => (
                              <Listbox.Option
                                key={item.id}
                                value={item.id}
                                className={({ active }) =>
                                  classNames('relative cursor-default select-none py-2 px-3', {
                                    'bg-primary/10 text-primary': active,
                                    'text-gray-900': !active,
                                  })
                                }
                              >
                                {item.type}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      </Listbox>
                    )}
                  />
                </>
              )}
              {!productTypes && (
                <Input
                  label='Loại sản phẩm'
                  defaultValue={product.productType?.type}
                  readOnly
                  classNameInput='cursor-not-allowed'
                />
              )}
            </div>

            {/* Product attribute */}
            <div className='col-span-12 lg:col-span-12'>
              <InputProductAttributeValue
                register={register}
                label='Thuộc tính sản phẩm'
                name='productAttributes'
                fields={productAttributesFieldArray.fields}
              />
            </div>

            {/* Short info */}
            <Controller
              name='shortInfo'
              control={control}
              render={({ field }) => (
                <InputList
                  label='Mô tả ngắn'
                  defaultValue={['test', 'test2']}
                  classNameWrapper='col-span-12 lg:col-span-8 lg:col-start-5 lg:row-span-6 lg:row-start-1'
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
