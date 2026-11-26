import { create, AxiosError, type AxiosRequestConfig } from 'axios'
import * as SecureStore from 'expo-secure-store'
import { normalizeError } from '../api/error'
import { baseUrl } from './Secret'

export const api = create({
  baseURL: baseUrl,
  timeout: 10000,
})

api.interceptors.request.use(
  async config => {
    config.headers.set('X-Request-Time', new Date().toISOString())
    config.headers.set('X-Client', 'android-app')

    const token = await SecureStore.getItemAsync('access_token')
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }

    return config
  },
  error => Promise.reject(error),
)

api.interceptors.response.use(
  response => response.data,
  async (error: AxiosError) => {
    const normalized = normalizeError(error)

    if (normalized.status === 401) {
      await SecureStore.deleteItemAsync('access_token')
    }
    throw normalized
  },
)
export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    api.get(url, config) as unknown as Promise<T>,
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.post(url, data, config) as unknown as Promise<T>,
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.put(url, data, config) as unknown as Promise<T>,

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.patch(url, data, config) as unknown as Promise<T>,

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete(url, config) as unknown as Promise<T>,
}
