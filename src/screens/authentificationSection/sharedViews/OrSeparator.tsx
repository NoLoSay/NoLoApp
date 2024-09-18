/**
 * @fileoverview OrSeparator component that renders a line separator with text in the middle.
 * @module OrSeparator
 * @requires React
 * @requires StyleSheet from 'react-native'
 * @requires Text from 'react-native'
 * @requires View from 'react-native'
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '@global/colors'

/**
 * @function OrSeparator
 * @description Component that renders a line separator with text in the middle.
 * @returns {JSX.Element} OrSeparator component template
 */
export default function OrSeparator() {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separatorLine} />
      <Text style={styles.separatorText}>ou avec</Text>
      <View style={styles.separatorLine} />
    </View>
  )
}

const styles = StyleSheet.create({
  separatorContainer: {
    paddingHorizontal: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.darkGrey,
  },
  separatorText: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: colors.darkGrey,
    paddingHorizontal: 26,
  },
})
