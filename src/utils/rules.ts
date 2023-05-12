import { object, string, InferType, ref, number } from 'yup'

export const authenSchema = object({
  name: string().required('Họ tên là bắt buộc'),
  email: string().email('Email không đúng định dạng.').required('Email là bắt buộc.'),
  password: string().min(6, 'Mật khẩu phải có độ dài ít nhất 6 kí tự.').required('Mật khẩu là bắt buộc.'),
  confirmPassword: string()
    .required('Nhập lại mật khẩu là bắt buộc.')
    .oneOf([ref('password')], 'Nhập lại mật khẩu không đúng'),
})

export const searchSchema = object({
  keyword: string().trim().required(),
})

export const categorySchema = object({
  name: string().trim().required('Tên danh mục là bắt buộc'),
})

export const productTypeSchema = object({
  type: string().trim().required('Loại sản phẩm là bắt buộc'),
})

export type AuthenSchema = InferType<typeof authenSchema>
export type SearchSchema = InferType<typeof searchSchema>
