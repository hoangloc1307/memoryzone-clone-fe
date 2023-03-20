export const isBrowser = typeof window !== 'undefined'

export const formatNumberAsCurrency = (number: number) => new Intl.NumberFormat('de-DE').format(number)
