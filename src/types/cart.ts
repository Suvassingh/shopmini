import type { Product } from './index'

export type CartLine = {
  product: Product
  quantity: number
}

export type Cart = {
  lines: CartLine[]
  total: number
}

export type AddToCartRequest = {
  productId: number
  quantity: number
}
