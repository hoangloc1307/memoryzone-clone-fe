import { Tab } from '@headlessui/react'
import { AdjustmentsVerticalIcon, ListBulletIcon, PhotoIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useMemo } from 'react'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import Input from '~/components/Input'
import InputAutocomplete from '~/components/InputAutocomplete'
import InputList from '~/components/InputList'
import InputNumber from '~/components/InputNumber'
import InputProductAttributeValue from '~/components/InputProductAttributeValue'
import InputRichText from '~/components/InputRichText'
import InputSelect from '~/components/InputSelect'
import InputSelectMultiple from '~/components/InputSelectMultiple'
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Attribute, Category, Product, ProductType } from '~/types/product.type'
import { SuccessResponse } from '~/types/response.type'

type BasicInfoFormType = Pick<
  Product,
  'name' | 'price' | 'priceDiscount' | 'quantity' | 'vendor' | 'shortInfo' | 'categories' | 'slug' | 'description'
>

type SpecificationFormType = {
  typeId: number
  attributes: Product['attributes']
}

const AdminProductDetailPage = () => {
  const router = useRouter()
  const productId = router.query.productId
  const http = useAuthAxios()
  const basicInfoForm = useForm<BasicInfoFormType>()
  const specificationForm = useForm<SpecificationFormType>()
  const vendorInputValue = basicInfoForm.watch('vendor')
  const typeIdInputValue = specificationForm.watch('typeId')

  // Get product detail
  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: () => http.get<SuccessResponse<Product>>(`/products/${productId}`),
    enabled: !!productId,
  })
  const product = productQuery.data?.data.data

  // Get categories
  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => http.get<SuccessResponse<Category[]>>('/category'),
  })
  const categories = categoryQuery.data?.data.data

  // Get product types
  const typesQuery = useQuery({
    queryKey: ['types'],
    queryFn: () => http.get<SuccessResponse<ProductType[]>>('/products/types'),
    enabled: !product?.type.id,
  })
  const types = typesQuery.data?.data.data

  // Get product attribute
  const typeid = product?.type.id ? product.type.id : typeIdInputValue
  const attributesQuery = useQuery({
    queryKey: ['attributes', typeid],
    queryFn: () => http.get<SuccessResponse<Attribute[]>>(`/products/attributes/${typeid}`),
    enabled: !!product?.type.id || !!typeIdInputValue,
    staleTime: Infinity,
  })
  const attributes = attributesQuery.data?.data.data

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
  }, [])

  // Submit basic info form
  const handleBasicInfoFormSubmit: SubmitHandler<BasicInfoFormType> = (data) => {
    console.log(data)
  }

  // Submit specifications form
  const handleSpecificationFormSubmit: SubmitHandler<SpecificationFormType> = (data) => {
    console.log(data)
  }

  return (
    <>
      {product && (
        <Tab.Group>
          <Tab.List className='-mb-px flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500'>
            {[
              { title: 'Thông tin cơ bản', icon: ListBulletIcon },
              { title: 'Thông số kỹ thuật', icon: AdjustmentsVerticalIcon },
              { title: 'Hình ảnh', icon: PhotoIcon },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Tab key={index} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={classNames('group inline-flex rounded-t-lg border-b-2 p-4 outline-none', {
                        'border-blue-600 text-blue-600': selected,
                        'border-transparent hover:border-gray-300 hover:text-gray-600': !selected,
                        'ml-4': index !== 0,
                      })}
                    >
                      <Icon className='mr-2 h-5 w-5' />
                      {item.title}
                    </button>
                  )}
                </Tab>
              )
            })}
          </Tab.List>
          <Tab.Panels>
            {/* Basic info */}
            <Tab.Panel className='outline-none'>
              <form onSubmit={basicInfoForm.handleSubmit(handleBasicInfoFormSubmit)}>
                {/* Name */}
                <Controller
                  control={basicInfoForm.control}
                  name='name'
                  render={({ field }) => (
                    <Input
                      label='Tên sản phẩm'
                      value={product.name}
                      classNameWrapper='mt-5'
                      onChange={field.onChange}
                    />
                  )}
                />
                <div className='relative z-20 mt-5 grid grid-cols-12 gap-5'>
                  {/* Price */}
                  <Controller
                    name='price'
                    control={basicInfoForm.control}
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
                    control={basicInfoForm.control}
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
                    control={basicInfoForm.control}
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
                    control={basicInfoForm.control}
                    render={({ field }) => (
                      <InputAutocomplete
                        label='Thương hiệu'
                        value={field.value ?? product.vendor}
                        suggestList={vendorSuggestList}
                        classNameWrapper='col-span-6 lg:col-start-1 lg:col-span-4 relative z-20'
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {/* Short info */}
                  <Controller
                    name='shortInfo'
                    control={basicInfoForm.control}
                    render={({ field }) => (
                      <InputList
                        label='Mô tả ngắn'
                        value={product.shortInfo}
                        classNameWrapper='col-span-12 lg:col-span-8 lg:col-start-5 lg:row-span-5 lg:row-start-1'
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                {/* Slug */}
                <Controller
                  control={basicInfoForm.control}
                  name='slug'
                  render={({ field }) => (
                    <Input
                      label='URL tuỳ chỉnh'
                      value={product.slug ?? undefined}
                      classNameWrapper='mt-5'
                      onChange={field.onChange}
                    />
                  )}
                />
                {/* Categories */}
                <Controller
                  control={basicInfoForm.control}
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
                  control={basicInfoForm.control}
                  render={({ field }) => (
                    <InputRichText
                      label='Mô tả sản phẩm'
                      value={product.description}
                      classNameWrapper='mt-5'
                      onChange={field.onChange}
                    />
                  )}
                />
                <button
                  type='submit'
                  className=' mt-10 w-full rounded bg-primary px-5 py-2.5 text-center text-sm font-medium text-white outline-none hover:bg-green-800 focus:ring-4 focus:ring-green-300'
                >
                  Cập nhật sản phẩm
                </button>
              </form>
            </Tab.Panel>

            {/* Specifications */}
            <Tab.Panel className='outline-none'>
              <form onSubmit={specificationForm.handleSubmit(handleSpecificationFormSubmit)}>
                {/* Product type */}
                <Controller
                  control={specificationForm.control}
                  name='typeId'
                  render={({ field }) => (
                    <InputSelect
                      label='Loại sản phẩm'
                      value={{ id: product.type?.id, name: product.type?.name }}
                      options={types}
                      propertyDisplay='name'
                      propertyValue='id'
                      disabled={!!product.type.id}
                      classNameWrapper='mt-5 relative'
                      onChange={field.onChange}
                    />
                  )}
                />
                {/* Product attribute */}
                <Controller
                  control={specificationForm.control}
                  name='attributes'
                  render={({ field }) => (
                    <InputProductAttributeValue
                      label='Thuộc tính sản phẩm'
                      attributes={attributes ?? []}
                      value={product.attributes}
                      classNameWrapper='mt-5'
                      onChange={field.onChange}
                    />
                  )}
                />

                <button
                  type='submit'
                  className=' mt-10 w-full rounded bg-primary px-5 py-2.5 text-center text-sm font-medium text-white outline-none hover:bg-green-800 focus:ring-4 focus:ring-green-300'
                >
                  Cập nhật thông số sản phẩm
                </button>
              </form>
            </Tab.Panel>

            {/* Images */}
            <Tab.Panel className='outline-none'>Hình ảnh</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </>
  )
}

AdminProductDetailPage.layout = layout.admin
export default AdminProductDetailPage
