import axios from 'axios'
import { getToken } from '~/composables/auth.js'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

service.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.token = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

service.interceptors.response.use(function (response) {
  const res = response.data
  if (res.errorCode !== undefined && res.errorCode !== 20000) {
    return Promise.reject(new Error(res.msg || '请求失败'))
  }
  return res.data !== undefined ? res.data : res
}, function (error) {
  return Promise.reject(error)
})

export default service