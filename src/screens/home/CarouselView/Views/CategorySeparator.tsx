import colors from '@source/global/colors'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

interface Props {
  text: string
}

export default function CategorySeparator({ text }: Props): React.JSX.Element {
  return <Text style={styles.text}>{text}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '700',
    color: colors.darkGrey,
    overflow: 'hidden',
    textDecorationColor: colors.accent,
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    marginBottom: 14,
  },
})
