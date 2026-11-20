import { StyleSheet, View, FlatList } from 'react-native'
import ProductItem from './ProductItem'
import { Product } from '../types/index'
type Props = {
  product: Product[]
}
const ProductList = ({ product }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={product}
        keyExtractor={(item, index) => String(item.id ?? index)}
        renderItem={({ item }) => <ProductItem {...item} />}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        numColumns={2}
      />
    </View>
  )
}

export default ProductList

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
