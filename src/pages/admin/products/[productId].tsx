import { useMutation, useQuery } from '@tanstack/react-query'
import { Editor } from '@tinymce/tinymce-react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useRef } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
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
  const { handleSubmit, register, control } = useForm<Product>()
  const editorRef = useRef<TinyMCEEditor | null>(null)

  const { data: productDetailData } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => {
      return http.get<SuccessResponse<Product>>(`/products/${productId}`)
    },
    enabled: !!productId,
  })
  const product = productDetailData?.data.data
  const productMutation = useMutation({
    mutationFn: (data: Product) => {
      return http.patch<SuccessResponse<Product>>(`/products/${productId}`, data)
    },
  })

  const onSubmit: SubmitHandler<Product> = (data) => {
    // NProgress.start()

    // // Convert string to number
    // if (data.price) {
    //   data.price = Number(data.price.toString().replaceAll('.', ''))
    // }
    // if (data.priceDiscount) {
    //   data.priceDiscount = Number(data.priceDiscount.toString().replaceAll('.', ''))
    // }

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
        <form className='text-sm' onSubmit={handleSubmit(onSubmit)}>
          <p className='font-medium italic text-gray'>ID: {product.id}</p>
          <Input
            label='Tên'
            placeholder='Tên sản phẩm'
            name='name'
            defaultValue={product.name}
            register={register}
            classNameWrapper='mt-5'
          />
          <div className='mt-5 flex justify-between gap-5'>
            <InputNumber
              label='Giá'
              placeholder='Giá sản phẩm'
              name='price'
              defaultValue={product.price}
              register={register}
            />
            <InputNumber
              label='Giá khuyến mãi'
              placeholder='Giá sản phẩm khuyến mãi'
              name='priceDiscount'
              defaultValue={product.priceDiscount}
              register={register}
            />
          </div>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <Editor
                apiKey={process.env.TINYMCE_KEY}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={product.description}
                onEditorChange={field.onChange}
                {...field}
              />
            )}
          />
          <button>submit</button>
        </form>
      )}
    </>
  )
}

AdminProductDetailPage.layout = layout.admin
export default AdminProductDetailPage
