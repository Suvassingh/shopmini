import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ComponentProps } from 'react'

type IoniconName = ComponentProps<typeof Ionicons>['name']

type Props = {
  name: IoniconName
  size?: number
  color?: string
  onPress: () => void
}

const IconButton = ({ name, size = 18, color = '#333', onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.6,
  },
})
