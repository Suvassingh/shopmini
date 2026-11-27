import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import type { CartLine } from '../src/types/cart'

type CartState = {
  lines: CartLine[]
  loading: boolean
  error: string | null
  hydrated: boolean
}

const initialState: CartState = {
  lines: [],
  loading: false,
  error: null,
  hydrated: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: CartLine['product']; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload
      const existing = state.lines.find(l => l.product.id === product.id)
      if (existing) existing.quantity += quantity
      else state.lines.push({ product, quantity })
      state.lines = state.lines.filter(l => l.quantity > 0)
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.lines = state.lines.filter(l => l.product.id !== action.payload)
    },

    setQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const line = state.lines.find(l => l.product.id === action.payload.productId)
      if (!line) return
      if (action.payload.quantity <= 0) {
        state.lines = state.lines.filter(l => l.product.id !== action.payload.productId)
      } else {
        line.quantity = action.payload.quantity
      }
    },

    clearCart(state) {
      state.lines = []
    },

    hydrateCart(state, action: PayloadAction<CartLine[]>) {
      state.lines = action.payload
      state.hydrated = true
    },
  },
})

export const { addToCart, removeFromCart, setQuantity, clearCart, hydrateCart } = cartSlice.actions

export default cartSlice.reducer

export const selectCartLines = (state: RootState) => state.cart.lines
export const selectCartLoading = (state: RootState) => state.cart.loading
export const selectCartError = (state: RootState) => state.cart.error
export const selectCartIsEmpty = (state: RootState) => state.cart.lines.length === 0
export const selectCartTotal = (state: RootState) =>
  state.cart.lines.reduce((s, l) => s + l.product.price * l.quantity, 0)
export const selectCartItemCount = (state: RootState) =>
  state.cart.lines.reduce((s, l) => s + l.quantity, 0)
export const selectCartQuantity = (productId: number) => (state: RootState) =>
  state.cart.lines.find(l => l.product.id === productId)?.quantity ?? 0
