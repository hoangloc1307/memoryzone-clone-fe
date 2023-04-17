import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { ErrorResponse } from '~/types/response.type'
import http from '~/utils/http'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from '~/utils/utils'

export default function useAuthAxios() {
  const { data: session, update } = useSession()
  useEffect(() => {
    if (session) {
      const requestInterceptors = http.interceptors.request.use(
        (config) => {
          if (session?.user.accessToken) {
            config.headers.Authorization = `Bearer ${session?.user.accessToken}`
          }
          return config
        },
        (error) => {
          return Promise.reject(error)
        }
      )

      const responseInterceptors = http.interceptors.response.use(
        (response) => {
          return response
        },
        async (error: AxiosError) => {
          if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
            const config = error.config as InternalAxiosRequestConfig & { sent: boolean }
            const url = config.url
            console.log(url)
            if (isAxiosExpiredTokenError(error) && url !== '/auth/refresh-token' && !config.sent) {
              config.sent = true
              const response = await http.patch('/auth/refresh-token', {
                refreshToken: session.user.refreshToken,
              })
              if (response.data.data && session) {
                session.user.accessToken = response.data.data.accessToken
                session.user.refreshToken = response.data.data.refreshToken
                update({
                  accessToken: response.data.data.accessToken,
                  refreshToken: response.data.data.refreshToken,
                })
              }
              config.headers.Authorization = `Bearer ${session?.user.accessToken}`
              return http(config)
            }

            signOut({ callbackUrl: 'http://localhost:3000/login' })
          }
          return Promise.reject(error)
        }
      )

      return () => {
        http.interceptors.request.eject(requestInterceptors)
        http.interceptors.response.eject(responseInterceptors)
      }
    }
  }, [session, update])

  return http
}
