/**
 * @fileoverview Category separator component
 * @module CategorySeparator
 * @description Component that renders a category separator, it is the text of the category.
 * @requires react react-native
 */
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import colors from '../../../../global/colors'

interface Props {
  text: string
}

/**
 * @function CategorySeparator
 * @description Component that renders a category separator.
 * @param text Title of the category
 * @returns {React.JSX.Element}
 */
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
