import axios from 'axios'
import httpConfig from '~/config/http'

const http = axios.create({
  baseURL: httpConfig.baseURL,
  timeout: httpConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default http
