import { create, AxiosError, type AxiosRequestConfig } from 'axios'
import * as SecureStore from 'expo-secure-store'
import { normalizeError } from '../api/error'
import { baseUrl } from './Secret'

export const rawApi = create({
  baseURL: baseUrl,
  timeout: 10000,
})

rawApi.interceptors.request.use(
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

rawApi.interceptors.response.use(
  response => response.data,
  async (error: AxiosError) => {
    const normalized = normalizeError(error)

    if (normalized.status === 401) {
      await SecureStore.deleteItemAsync('access_token')
    }
    throw normalized
  },
)
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    rawApi.get(url, config) as unknown as Promise<T>,
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    rawApi.post(url, data, config) as unknown as Promise<T>,
}
