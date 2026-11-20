import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { fetchProducts } from '../services/ProductsApi'
import { Product } from '../types'

const ApiDemoScreen = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleRetry = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchProducts()
      setProducts(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let ignore = false

    async function loadInitialProducts() {
      try {
        const response = await fetchProducts()
        if (!ignore) {
          setProducts(response)
          setError(null)
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Something went wrong')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadInitialProducts()

    return () => {
      ignore = true
    }
  }, [])

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="green" />
        <Text style={styles.muted}>Loading products...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={56} color="#c00" />
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.muted}>{error}</Text>
        <Pressable style={styles.retry} onPress={handleRetry}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <Text style={styles.heading}>Products ({products.length})</Text>
      <FlatList
        data={products}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.thumb} />
            <View style={styles.info}>
              <Text style={styles.rowTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default ApiDemoScreen

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  heading: { fontSize: 22, fontWeight: 'bold', margin: 16 },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  thumb: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#f0f0f0' },
  info: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: '600', color: '#111' },
  category: { fontSize: 12, color: 'gray', marginTop: 2 },
  price: { fontSize: 14, fontWeight: 'bold', color: 'green', marginTop: 4 },
  title: { fontSize: 18, fontWeight: '700', color: '#111' },
  muted: { color: 'gray', fontSize: 14, textAlign: 'center' },
  retry: {
    backgroundColor: 'green',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  retryText: { color: 'white', fontWeight: '600' },
})
