import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import Input from '~/components/Input'
import layout from '~/constants/layout'
import path from '~/constants/path'
import useAuthAxios from '~/hooks/useAuthAxios'
import { authenSchema, AuthenSchema } from '~/utils/rules'
import NProgress from 'nprogress'
import { isAxiosBadRequestError } from '~/utils/utils'
import { ErrorResponse } from '~/types/response.type'
import { useRouter } from 'next/router'

type FormType = AuthenSchema

const RegisterPage = () => {
  const router = useRouter()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: yupResolver(authenSchema) })
  const http = useAuthAxios()

  const registerMutation = useMutation({
    mutationFn: ({ name, email, password }: Omit<FormType, 'confirmPassword'>) =>
      http.post('/auth/register', { name, email, password }),
  })

  const onSubmit: SubmitHandler<FormType> = (data) => {
    NProgress.start()
    const payload = omit(data, ['confirmPassword'])
    registerMutation.mutate(payload, {
      onSuccess() {
        NProgress.done()
        router.push(path.login)
      },
      onError(error) {
        NProgress.done()
        if (isAxiosBadRequestError<ErrorResponse<Omit<FormType, 'confirmPassword'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            for (const [key, value] of Object.entries(formError)) {
              setError(key as keyof FormType, { message: value })
            }
          }
        }
      },
    })
  }

  return (
    <div className='c-container'>
      <div className='text-gray-800 bg-gray-50 relative flex flex-col justify-center overflow-hidden antialiased'>
        <div className='relative mx-auto w-72 p-3 text-center sm:w-96'>
          <span className='text-2xl font-semibold text-[#444]'>Đăng ký</span>
          <div className='mt-4 rounded-lg bg-white text-left shadow-md'>
            <div className='h-2 rounded-t-md bg-primary/70' />
            <div className='px-8 py-6'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label='Họ tên'
                  placeholder='Họ tên'
                  name='name'
                  register={register}
                  errorMessage={errors.name?.message}
                />
                <Input
                  label='Email'
                  placeholder='Email'
                  classNameWrapper='mt-5'
                  name='email'
                  register={register}
                  errorMessage={errors.email?.message}
                />
                <Input
                  label='Mật khẩu'
                  placeholder='Mật khẩu'
                  classNameWrapper='mt-5'
                  register={register}
                  name='password'
                  type='password'
                  errorMessage={errors.password?.message}
                />
                <Input
                  label='Nhập lại mật khẩu'
                  placeholder='Nhập lại mật khẩu'
                  classNameWrapper='mt-5'
                  register={register}
                  name='confirmPassword'
                  type='password'
                  errorMessage={errors.confirmPassword?.message}
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
  )
}

RegisterPage.layout = layout.auth

export default RegisterPage
