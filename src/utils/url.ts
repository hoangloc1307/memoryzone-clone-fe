export const textToBeautyURL = (text: string) => {
  let result = text.toLowerCase()
  result = result.replace(/[áàảãạâấầẩẫậăắằẳẵặ]/g, 'a')
  result = result.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o')
  result = result.replace(/[éèẻẽẹêếềểễệ]/g, 'e')
  result = result.replace(/[úùủũụưứừửữự]/g, 'u')
  result = result.replace(/[íìỉĩị]/g, 'i')
  result = result.replace(/[ýỳỷỹỵ]/g, 'y')
  result = result.replace(/[^\w\s-]/g, '')
  result = result.replace(/\s/g, '-')
  return result
}

export const generateSlug = (name: string, id: string | number) => {
  return `${textToBeautyURL(name)}-id.${id}`
}

export const qQueryStringToObject = (q: string) => {
  if (q) {
    // Phân tách chuỗi thành mảng
    // vendor:ACER,ASUS_AND_cpu:i5,i7 => ['vendor:ACER,ASUS', 'cpu:i5,i7']
    const qArray = q.split('_AND_')

    // Chuyển mảng thành object
    // ['vendor:ACER,ASUS', 'cpu:i5,i7'] => {vendor: 'ACER,ASUS', cpu: 'i5,i7'}
    const qObject: { [key: string]: string } = qArray.reduce((obj, item) => {
      const colonIndex = item.indexOf(':')
      return { ...obj, [item.slice(0, colonIndex)]: item.slice(colonIndex + 1) }
    }, {})

    return qObject
  }

  return {}
}
