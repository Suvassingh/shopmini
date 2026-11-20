import { Product } from '../types'
import { api } from '../api/client'
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

export async function fetchProducts(): Promise<Product[]> {
  const response = await api.get<DummyJsonResponse>('/products', { params: { limit: 100 } })

  if (!response?.products) {
    throw new Error("Couldn't load products")
  }

  return response.products.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    image: p.thumbnail,
    category: p.category,
    rating: p.rating,
  }))
}
