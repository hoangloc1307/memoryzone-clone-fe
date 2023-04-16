export interface SuccessResponse<Data> {
  status: string
  message: string
  data: Data
}
export interface ErrorResponse<Data> {
  status: string
  name: string
  message: string
  data?: Data
}
