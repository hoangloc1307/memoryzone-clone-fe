import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import Input from '~/components/Input'
import { path } from '~/constants/path'
import { authenSchema, AuthenSchema } from '~/utils/rules'

type FormType = Pick<AuthenSchema, 'email' | 'password'>
const loginSchema = authenSchema.pick(['email', 'password'])

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: yupResolver(loginSchema) })

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data)
  }

  return (
    <div className='c-container'>
      <div className='text-gray-800 bg-gray-50 relative flex flex-col justify-center overflow-hidden antialiased'>
        <div className='relative mx-auto w-72 py-3 text-center sm:w-96'>
          <span className='text-2xl font-semibold text-[#444]'>Đăng nhập</span>
          <div className='mt-4 rounded-lg bg-white text-left shadow-md'>
            <div className='h-2 rounded-t-md bg-primary/70' />
            <div className='px-8 py-6'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label='Email'
                  placeholder='Email'
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
                <div className='flex flex-col items-center justify-between gap-5'>
                  <button
                    type='submit'
                    className='mt-5 w-full rounded-md bg-primary/80 py-2 px-6 text-white hover:bg-primary'
                  >
                    Đăng nhập
                  </button>
                  <a href='#' className='text-sm hover:text-primary hover:underline'>
                    Quên mật khẩu?
                  </a>
                </div>
                <p className='mt-5 text-center text-sm'>
                  Bạn chưa có tài khoản?{' '}
                  <Link href={path.register} className='text-primary hover:underline'>
                    Đăng ký
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
