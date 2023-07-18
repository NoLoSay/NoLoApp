/**
 * @fileoverview Button component
 * @module Button
 * @description Button component, it is a button that can be used in any screen.
 * @requires react react-native
 * @link https://reactnative.dev/docs/pressable
 */

import { colors } from '@source/global/colors'
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

interface Props {
  onPress: () => void
  text: string
  style?: StyleProp<ViewStyle>
}

/**
 * Button that is used everywhere
 * @param {Props} props - Component props
 * @param {Function} props.onPress - Function that is called when the button is pressed
 * @param {string} props.text - Text that is displayed in the button
 * @param {StyleProp<ViewStyle>} props.style - Style of the button
 * @returns
 */
export default function Button({ onPress, text, style }: Props) {
  return (
    <View style={{ width: '100%', paddingHorizontal: 52 }}>
      <Pressable
        style={[styles.button, style]}
        onPress={onPress}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
    fontSize: 20,
  },
  button: {
    height: 48,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
