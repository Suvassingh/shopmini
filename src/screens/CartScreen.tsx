import { useMemo } from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CartList from '../components/CartList'
import { useAppSelector } from '../../store/hooks'
import {
  clearCart,
  selectCartLines,
  selectCartIsEmpty,
  selectCartTotal,
  selectCartItemCount,
} from '../../store/cartSlice'
import GeneralButton from '../components/GeneralButton'
import { useDispatch } from 'react-redux'

const CartScreen = () => {
  const lines = useAppSelector(selectCartLines)
  const isEmpty = useAppSelector(selectCartIsEmpty)
  const total = useAppSelector(selectCartTotal)
  const itemCount = useAppSelector(selectCartItemCount)
  const dispatch = useDispatch()
  const cartLines = useMemo(() => lines, [lines])

  if (isEmpty) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Your cart is empty</Text>
      </SafeAreaView>
    )
  }
  const handleClear = () => {
    Alert.alert('Clear Cart', 'Are you sure you want to remove all items from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => dispatch(clearCart()),
      },
    ])
  }
  if (isEmpty) return null

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Cart</Text>
          <Text style={styles.headerSubtitle}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Text>
        </View>
        <TouchableOpacity onPress={handleClear} style={styles.clearBadge}>
          <Text style={styles.clearBadgeText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <CartList lines={cartLines} />
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>

        <GeneralButton
          title="Proceed to Checkout"
          onPress={() => {
            console.log('Proceeding to checkout...')
          }}
        />
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  clearBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
  },
  clearBadgeText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },

  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottom: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  totalBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  totalLabel: { fontSize: 16, color: '#555' },
  totalValue: { fontSize: 20, fontWeight: '700', color: '#111' },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyIconText: {
    fontSize: 36,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
})
