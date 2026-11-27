import AsyncStorage from '@react-native-async-storage/async-storage'
import { store } from './index'
import { hydrateCart } from './cartSlice'
import type { CartLine } from '../src/types/cart'

const KEY = 'cart:v1'

export async function loadCart() {
  try {
    const raw = await AsyncStorage.getItem(KEY)
    if (raw) {
      store.dispatch(hydrateCart(JSON.parse(raw) as CartLine[]))
    } else {
      store.dispatch(hydrateCart([]))
    }
  } catch {
    store.dispatch(hydrateCart([]))
  }
}

export function subscribeCartPersistence() {
  let lastJson = ''
  return store.subscribe(() => {
    const { lines, hydrated } = store.getState().cart
    if (!hydrated) return
    const json = JSON.stringify(lines)
    if (json !== lastJson) {
      lastJson = json
      AsyncStorage.setItem(KEY, json).catch(() => {})
    }
  })
}
