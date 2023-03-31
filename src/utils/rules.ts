import { object, string, InferType, ref } from 'yup'

export const authenSchema = object({
  email: string().email('Email không đúng định dạng.').required('Email là bắt buộc.'),
  password: string().min(8, 'Mật khẩu phải có độ dài ít nhất 8 kí tự.').required('Mật khẩu là bắt buộc.'),
  confirmPassword: string()
    .required('Nhập lại mật khẩu là bắt buộc.')
    .oneOf([ref('password')], 'Nhập lại mật khẩu không đúng'),
})

export type AuthenSchema = InferType<typeof authenSchema>
