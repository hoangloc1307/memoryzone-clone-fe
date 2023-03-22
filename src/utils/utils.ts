export const isBrowser = typeof window !== 'undefined'

export const formatNumberAsCurrency = (number: number) => new Intl.NumberFormat('de-DE').format(number)

export const textToBeautyURL = (text: string) => {
  let result = text.toLocaleLowerCase()
  result = result.replace(/[^\w\s-]/g, '')
  result = result.replace(/[áàảãạâấầẩẫậăắằẳẵặ]/g, 'a')
  result = result.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o')
  result = result.replace(/[éèẻẽẹêếềểễệ]/g, 'e')
  result = result.replace(/[úùủũụưứừửữự]/g, 'u')
  result = result.replace(/[íìỉĩị]/g, 'i')
  result = result.replace(/[ýỳỷỹỵ]/g, 'y')
  result = result.replace(/\s/g, '-')
  return result
}

export const generateSlug = (name: string, id: string | number) => {
  return `${textToBeautyURL(name)}-id.${id}`
}
