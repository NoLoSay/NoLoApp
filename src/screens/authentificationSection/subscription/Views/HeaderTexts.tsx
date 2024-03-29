/**
 * @fileoverview HeaderTexts component
 * @module HeaderTexts
 * @description Component used to display the title and subtitle of the connection screen
 * @requires react react-native
 * @requires StyleSheet from 'react-native'
 * @requires Text from 'react-native'
 * @exports HeaderTexts
 */

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { colors } from '@global/colors'

/**
 * @function HeaderTexts
 * @description Component that renders the title and subtitle of the connection screen
 * @returns {React.JSX.Element} HeaderTexts component template
 */
export default function HeaderTexts(): React.JSX.Element {
  return (
    <>
      <Text style={styles.title}>Créer un compte</Text>
      <Text style={styles.subtitle}>Inscrivez-vous pour continuer</Text>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    fontWeight: '700',
    color: colors.accent,
  },
  subtitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    fontWeight: '400',
    color: colors.darkGrey,
  },
})
