import { StyleSheet, View, FlatList } from 'react-native'
import { Product } from '../types'
import CartItem from './CartItem'
type CartLine = {
  product: Product
  quantity: number
}

type Props = {
  lines: CartLine[]
}

const CartList = ({ lines }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={lines}
        keyExtractor={item => String(item.product.id)}
        renderItem={({ item }) => <CartItem product={item.product} quantity={item.quantity} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}
export default CartList

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 15,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 10,
  },
})
