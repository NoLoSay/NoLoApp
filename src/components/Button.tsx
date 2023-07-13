/**
 * @fileoverview Button component
 * @module Button
 * @description Button component, it is a button that can be used in any screen.
 * @requires react react-native
 * @link https://reactnative.dev/docs/pressable
 */

import { Pressable, Text } from 'react-native'

interface Props {
  onPress: () => void
  text: string
}

/**
 * Button that is used everywhere
 * @param {Props} props - Component props
 * @param {Function} props.onPress - Function that is called when the button is pressed
 * @param {string} props.text - Text that is displayed in the button
 * @returns
 */
export default function Button({ onPress, text }: Props) {
  return (
    <Pressable
      style={{ width: 120, height: 40, backgroundColor: 'cyan' }}
      onPress={onPress}
    >
      <Text>{text}</Text>
    </Pressable>
  )
}
