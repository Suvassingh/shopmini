import { Product } from '../types'
import { AxiosError, create } from 'axios'
import * as SecureStore from 'expo-secure-store'
import { normalizeError } from '../api/error'

interface DummyJsonProduct {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
  rating: number
}

interface DummyJsonResponse {
  products: DummyJsonProduct[]
  total: number
  skip: number
  limit: number
}
const api = create({
  baseURL: 'https://dummyjson.com',
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

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get<DummyJsonResponse>('/products', { params: { limit: 100 } })

  if (!data?.products) {
    throw new Error("Couldn't load products")
  }

  return data.products.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    image: p.thumbnail,
    category: p.category,
    rating: p.rating,
  }))
}
