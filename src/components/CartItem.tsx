import { StyleSheet, Text, View, Image } from 'react-native'
import IconButton from './IconButton'
import { Product } from '../types'
import { useAppDispatch } from '../../store/hooks'
import { addToCart, removeFromCart, setQuantity } from '../../store/cartSlice'

type Props = {
  product: Product
  quantity: number
}

const CartItem = ({ product, quantity }: Props) => {
  const dispatch = useAppDispatch()
  const { id, title, price, image } = product

  const increaseHandler = () => {
    dispatch(addToCart({ product, quantity: 1 }))
  }

  const decreaseHandler = () => {
    if (quantity <= 1) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(setQuantity({ productId: id, quantity: quantity - 1 }))
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>

        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>

        <View style={styles.rightContent}>
          <IconButton name="remove" color="#333" size={20} onPress={decreaseHandler} />
          <Text style={styles.quantity}>{quantity}</Text>
          <IconButton name="add" color="#333" size={20} onPress={increaseHandler} />
        </View>
      </View>
    </View>
  )
}
export default CartItem

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 100,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageContainer: {
    height: 60,
    width: 50,
    backgroundColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  details: { flex: 1, marginHorizontal: 8 },
  name: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 13, color: '#666', marginTop: 4 },
  rightContent: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  quantity: { fontSize: 14, fontWeight: '600' },
})
