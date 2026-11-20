import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'

type Props = {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}
const CategoryRowList = ({ categories, selected, onSelect }: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map(product => {
          const active = product === selected
          return (
            <Pressable
              key={product}
              onPress={() => onSelect(product)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{product}</Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default CategoryRowList

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    height: 30,
  },
  categoryScroll: {
    paddingHorizontal: 15,
    gap: 10,
  },
  card: {
    backgroundColor: '#bbbb',
    borderRadius: 8,
    padding: 10,
  },
  catText: {
    padding: 4,
  },
  chip: {
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#111',
    borderColor: '#111',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    textTransform: 'capitalize',
  },
  chipTextActive: { color: '#fff' },
})
