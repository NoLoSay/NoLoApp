/**
 * @fileoverview LineSeparator component, used to render a line separator.
 * @module LineSeparator
 * @description This component is used to render a line separator.
 * @requires React
 * @requires StyleSheet from 'react-native'
 * @requires View from 'react-native'
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '@global/colors'

/**
 * @function LineSeparator
 * @description Component that renders a line separator.
 * @returns {JSX.Element} LineSeparator component template
 */
export default function LineSeparator(): JSX.Element {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separatorLine} />
    </View>
  )
}

const styles = StyleSheet.create({
  separatorContainer: {
    paddingHorizontal: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.darkGrey,
  },
})
