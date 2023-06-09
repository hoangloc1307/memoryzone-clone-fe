import axios, { AxiosError, HttpStatusCode } from 'axios'
import { Product2, SortType } from '~/types/product.type'
import { ErrorResponse } from '~/types/response.type'

export const isBrowser = typeof window !== 'undefined'

export const isAxiosError = <Error>(error: unknown): error is AxiosError<Error> => {
  return axios.isAxiosError(error)
}

export const isAxiosBadRequestError = <BadRequestError>(error: unknown): error is AxiosError<BadRequestError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

export const isAxiosUnauthorizedError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export const isAxiosExpiredTokenError = <ExpiredError>(error: unknown): error is AxiosError<ExpiredError> => {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.name === 'TOKEN_EXPIRED'
  )
}

export const numberAsCurrency = (number: number) => new Intl.NumberFormat('de-DE').format(number)

export const statusTextFromQuantity = (quantity: number) => {
  if (quantity === -1) return 'Sắp có hàng'
  if (quantity === 0) return 'Hết hàng'
  if (quantity <= 5) return 'Sắp hết hàng'
  return 'Còn hàng'
}

export const sortByValueToText = (value: SortType) => {
  const sortTypeObject = {
    default: 'Mặc định',
    'name:asc': 'Tên A - Z',
    'name:desc': 'Tên Z - A',
    'price:asc': 'Giá tăng dần',
    'price:desc': 'Giá giảm dần',
    'time:asc': 'Hàng mới nhất',
    'time:desc': 'Hàng cũ nhất',
  }
  return sortTypeObject[value]
}

export const shortSpecsToHTML = (shortSpecs: string[]) => {
  let html = `<ul class='text-sm'>`
  shortSpecs.forEach((item) => {
    html += `<li class='relative pl-6'>
      <span class='absolute top-0.5 left-0 text-[#00b14f]'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' class='h-4 w-4'>
          <path fillRule='evenodd' clipRule='evenodd'
            d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
          />
        </svg>
      </span>
      ${item}
    </li>`
  })
  html += '</ul>'
  return html
}

export const sortProductsBy = (products: Product2[], sortValue: SortType): Product2[] => {
  if (products && products.length > 0) {
    const temp = [...products]
    switch (sortValue) {
      case 'default':
        return temp
      case 'name:asc':
        return temp.sort((a, b) => a.name.localeCompare(b.name))
      case 'name:desc':
        return temp.sort((a, b) => b.name.localeCompare(a.name))
      case 'price:asc':
        return temp.sort((a, b) => a.priceDiscount - b.priceDiscount)
      case 'price:desc':
        return temp.sort((a, b) => b.priceDiscount - a.priceDiscount)
      default:
        return temp
    }
  }
  return []
}

export const highlightKeywordInText = (text: string, keyword: string) => {
  if (text && keyword) {
    const regex = new RegExp(keyword, 'gi')
    const keywordParts = text.match(regex)
    const textParts = text.split(regex)
    let result
    if (keywordParts) {
      result = (keywordParts as RegExpMatchArray).reduce((result, keyword, index) => {
        return (result += `${textParts[index]}<span class='text-red-500'>${keyword}</span>`)
      }, '')
      result += textParts[textParts.length - 1]
      return result
    }
    return `<span>${text}</span>`
  }
  return text
}
