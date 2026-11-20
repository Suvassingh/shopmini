import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import { useState, useMemo } from 'react'
import { Ionicons } from '@expo/vector-icons'
import CategoryRowList from '../components/CategoryRowList'
import ProductList from '../components/ProductList'
import { MOCK_PRODUCTS } from '../data/products'
import { SafeAreaView } from 'react-native-safe-area-context'
const ShopScreen = () => {
  const [selected, setSelected] = useState<string>('All')
  const [query, setQuery] = useState('')

  const data = MOCK_PRODUCTS
  const category = useMemo(
    () => ['All', ...Array.from(new Set(data.map(pro => pro.category)))],
    [data],
  )
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.filter(pro => {
      const matchesCategory = selected === 'All' || pro.category === selected
      const matchesQuery =
        !q ||
        pro.title.toLowerCase().includes(q) ||
        pro.description.toLowerCase().includes(q) ||
        pro.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [selected, data, query])

  return (
    <SafeAreaView style={styles.rootContainer} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.greetigText}>Hi, Suvas</Text>
        <View style={styles.rowforheadersearchandtext}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={18} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#999"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')} hitSlop={8}>
                <Ionicons name="close-circle" size={18} color="#aaa" />
              </Pressable>
            )}
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>S</Text>
          </View>
        </View>
      </View>
      <View style={styles.categoryView}>
        <CategoryRowList categories={category} selected={selected} onSelect={setSelected} />
      </View>

      <Text style={styles.producttitle}>Products</Text>
      <ProductList product={filtered} />
    </SafeAreaView>
  )
}

export default ShopScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  rowforheadersearchandtext: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    flex: 1,

    marginLeft: 10,
    marginRight: 8,
    marginTop: 0,
  },
  searchInput: { flex: 1, fontSize: 15, color: '#111' },
  greetigText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  name: {
    backgroundColor: '#c5fdec',
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  nameText: {
    fontSize: 18,
    color: '#0ac526',
    padding: 4,
  },
  producttitle: {
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryView: {
    padding: 10,
  },
})
