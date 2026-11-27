import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CartList from '../components/CartList'
import { useAppSelector } from '../../store/hooks'
import {
  selectCartLines,
  selectCartIsEmpty,
  selectCartTotal,
  selectCartItemCount,
} from '../../store/cartSlice'

const CartScreen = () => {
  const lines = useAppSelector(selectCartLines)
  const isEmpty = useAppSelector(selectCartIsEmpty)
  const total = useAppSelector(selectCartTotal)
  const itemCount = useAppSelector(selectCartItemCount)

  const cartLines = useMemo(() => lines, [lines])

  if (isEmpty) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Your cart is empty</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.root}>
      <CartList lines={cartLines} />
      <View style={styles.totalBar}>
        <Text style={styles.totalLabel}>
          Total ({itemCount} item{itemCount !== 1 ? 's' : ''})
        </Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  totalBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  totalLabel: { fontSize: 16, color: '#555' },
  totalValue: { fontSize: 20, fontWeight: '700', color: '#111' },
})
