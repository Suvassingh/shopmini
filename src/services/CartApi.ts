import { http } from '../api/client'

export interface CartLine {
  productId: number
  title: string
  price: number
  quantity: number
}
export interface Cart {
  id: string
  lines: CartLine[]
  total: number
}
export interface AddToCartRequest {
  productId: number
  quantity: number
}
export async function getCart(): Promise<Cart> {
  return http.get<Cart>('/cart')
}
export async function addToCart(body: AddToCartRequest): Promise<Cart> {
  return http.post<Cart>('/cart/add', body)
}
export async function removeFromCart(productId: number): Promise<Cart> {
  return http.delete<Cart>(`/cart/remove/${productId}`)
}
