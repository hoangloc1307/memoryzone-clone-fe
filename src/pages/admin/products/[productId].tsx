import { useMutation, useQuery } from '@tanstack/react-query'
import { Editor } from '@tinymce/tinymce-react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useRef } from 'react'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { Editor as TinyMCEEditor } from 'tinymce'
import Input from '~/components/Input'
import InputNumber from '~/components/InputNumber'
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Product } from '~/types/product.type'
import { SuccessResponse } from '~/types/response.type'

const AdminProductDetailPage = () => {
  const router = useRouter()
  const productId = router.query.productId
  const http = useAuthAxios()
  const editorRef = useRef<TinyMCEEditor | null>(null)
  const { handleSubmit, register, control } = useForm<Product>()
  const {
    control: controlSI,
    register: registerSI,
    setValue: setValueSI,
    handleSubmit: handleSubmitSI,
  } = useForm<{ shortInfo: { id: number; value: string }[] }>()
  const { fields } = useFieldArray({
    control: controlSI,
    name: 'shortInfo',
  })

  const { data: productDetailData } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => {
      return http.get<SuccessResponse<Product>>(`/products/${productId}`)
    },
    onSuccess(data) {
      const shortInfo = data.data.data.shortInfo
      const values = shortInfo.reduce((result: { id: number; value: string }[], current, index) => {
        return [...result, { id: index + 1, value: current }]
      }, [])
      setValueSI('shortInfo', values)
    },
    enabled: !!productId,
  })
  const product = productDetailData?.data.data

  const productMutation = useMutation({
    mutationFn: (data: Product) => {
      return http.patch<SuccessResponse<Product>>(`/products/${productId}`, data)
    },
  })

  const onSubmit: SubmitHandler<Product | { shortInfo: { id: number; value: string }[] }> = (data) => {
    // NProgress.start()

    // Convert string to number
    // if (data.price) {
    //   data.price = Number(data.price.toString().replaceAll('.', ''))
    // }
    // if (data.priceDiscount) {
    //   data.priceDiscount = Number(data.priceDiscount.toString().replaceAll('.', ''))
    // }
    // if (data.quantity) {
    //   data.quantity = Number(data.quantity.toString().replaceAll('.', ''))
    // }

    // // Update at
    // data.updatedAt = new Date().toISOString()

    // productMutation.mutate(data, {
    //   onSuccess() {
    //     NProgress.done()
    //   },
    //   onError() {
    //     NProgress.done()
    //   },
    // })
    console.log(data)
  }

  return (
    <>
      {product && (
        <form className='block text-sm' onSubmit={handleSubmit(onSubmit)}>
          <div>
            {fields.map((field, index) => (
              <input
                key={field.id} // important to include key with field's id
                {...registerSI(`shortInfo.${index}.value`)}
              />
            ))}
          </div>
          <p className='font-medium italic text-gray'>ID: {product.id}</p>
          <Input
            label='Tên'
            placeholder='Tên sản phẩm'
            name='name'
            defaultValue={product.name}
            register={register}
            classNameWrapper='mt-5'
          />
          <div className='mt-5 flex flex-wrap justify-between gap-5'>
            <InputNumber
              label='Giá'
              name='price'
              defaultValue={product.price}
              register={register}
              classNameWrapper='flex-grow'
            />
            <InputNumber
              label='Giá khuyến mãi'
              name='priceDiscount'
              defaultValue={product.priceDiscount}
              register={register}
              classNameWrapper='flex-grow'
            />
            <InputNumber
              label='Số lượng'
              name='quantity'
              defaultValue={product.quantity}
              register={register}
              classNameWrapper='flex-grow'
            />
            <Input
              label='Thương hiệu'
              name='vendor'
              defaultValue={product.vendor}
              register={register}
              classNameWrapper='flex-grow'
            />
          </div>
          <div className='mt-5'>
            <Controller
              name='description'
              control={control}
              defaultValue={product.description}
              render={({ field }) => (
                <Editor
                  apiKey={process.env.TINYMCE_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={product.description}
                  onEditorChange={field.onChange}
                  init={{
                    height: 500,
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
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  }}
                />
              )}
            />
          </div>

          <button>submit</button>
        </form>
      )}
    </>
  )
}

AdminProductDetailPage.layout = layout.admin
export default AdminProductDetailPage
