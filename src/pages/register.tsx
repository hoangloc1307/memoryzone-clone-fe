import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Input from '~/components/Input'
import layout from '~/constants/layout'
import path from '~/constants/path'
import useAuthAxios from '~/hooks/useAuthAxios'
import { ErrorResponse } from '~/types/response.type'
import { AuthenSchema, authenSchema } from '~/utils/rules'
import { isAxiosBadRequestError } from '~/utils/utils'

type FormType = AuthenSchema

const RegisterPage = () => {
  const router = useRouter()
  const http = useAuthAxios()
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({ resolver: yupResolver(authenSchema) })

  const registerMutation = useMutation({
    mutationFn: ({ name, email, password }: Omit<FormType, 'confirmPassword'>) =>
      http.post('/auth/register', { name, email, password }),
  })

  const onSubmit: SubmitHandler<FormType> = (data) => {
    NProgress.start()

    // Prepare data
    const payload = omit(data, ['confirmPassword'])

    // Call api
    registerMutation.mutate(payload, {
      onSuccess() {
        router.push(path.login)
      },
      onError(error) {
        if (isAxiosBadRequestError<ErrorResponse<Omit<FormType, 'confirmPassword'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            for (const [key, value] of Object.entries(formError)) {
              setError(key as keyof FormType, { message: value })
            }
          }
        }
      },
      onSettled() {
        NProgress.done()
      },
    })
  }

  return (
    <>
      {/* Head */}
      <Head>
        <title>Đăng ký | MemoryClone</title>
      </Head>
      {/* Body */}
      <div className='c-container'>
        <div className='text-gray-800 bg-gray-50 relative flex flex-col justify-center overflow-hidden antialiased'>
          <div className='relative mx-auto w-72 p-3 text-center sm:w-96'>
            <span className='text-2xl font-semibold uppercase text-[#444]'>Đăng ký</span>
            <div className='mt-4 rounded-lg bg-white text-left shadow-md'>
              <div className='h-2 rounded-t-md bg-primary/70' />
              <div className='px-8 py-6'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    control={control}
                    name='name'
                    render={({ field }) => (
                      <Input
                        label='Họ tên'
                        placeholder='Họ tên'
                        required
                        errorMessage={errors.name?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name='email'
                    render={({ field }) => (
                      <Input
                        label='Email'
                        placeholder='Email'
                        classNameWrapper='mt-5'
                        required
                        errorMessage={errors.email?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name='password'
                    render={({ field }) => (
                      <Input
                        label='Mật khẩu'
                        placeholder='Mật khẩu'
                        classNameWrapper='mt-5'
                        type='password'
                        required
                        errorMessage={errors.password?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <Input
                        label='Nhập lại mật khẩu'
                        placeholder='Nhập lại mật khẩu'
                        classNameWrapper='mt-5'
                        type='password'
                        required
                        errorMessage={errors.confirmPassword?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <div className='flex items-baseline justify-center'>
                    <button
                      type='submit'
                      className='mt-5 w-full rounded-md bg-primary/80 py-2 px-6 text-white hover:bg-primary disabled:cursor-not-allowed disabled:bg-primary/50'
                      disabled={registerMutation.isLoading}
                    >
                      Đăng ký
                    </button>
                  </div>
                  <p className='mt-5 text-center text-sm'>
                    Bạn đã có tài khoản?{' '}
                    <Link href={path.login} className='text-primary hover:underline'>
                      Đăng nhập
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

RegisterPage.layout = layout.auth

export default RegisterPage
