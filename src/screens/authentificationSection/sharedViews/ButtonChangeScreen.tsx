/**
 * @fileoverview ButtonChangeScreen component
 * @module ButtonChangeScreen
 * @description Component used to display the text that allows the user to change screen
 * @requires react react-native
 * @requires StyleSheet from 'react-native'
 * @requires Text from 'react-native'
 * @requires Pressable from 'react-native'
 * @requires View from 'react-native'
 * @requires LineSeparator from './LineSeparator'
 * @requires colors from '@global/colors'
 * @exports ButtonChangeScreen
 */

import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '@global/colors'
import LineSeparator from './LineSeparator'

interface ButtonChangeScreenProps {
  infoText: string
  clickableText: string
  onPress: () => void
}

/**
 * @function ButtonChangeScreen
 * @description Component used to display the text that allows the user to change screen
 * @param {ButtonChangeScreenProps} props - Component props
 * @returns {React.JSX.Element} ButtonChangeScreen component
 */
export default function ButtonChangeScreen({
  infoText,
  clickableText,
  onPress,
}: ButtonChangeScreenProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <LineSeparator />
      <View style={styles.textContainer}>
        <Text style={styles.infoText}>{infoText}</Text>
        <Pressable onPress={onPress}>
          <Text style={styles.clickableText}>{clickableText}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    fontWeight: '700',
    color: colors.darkGrey,
  },
  clickableText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    fontWeight: '700',
    color: colors.accent,
    marginLeft: 4,
  },
})
