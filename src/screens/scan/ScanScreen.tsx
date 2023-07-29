/**
 * @fileoverview Scan screen component
 * @module ScanScreen
 * @description Scan screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { colors } from '@global/colors'

/**
 * @function ScanScreen
 * @description Component that renders the Scan screen.
 * @returns {React.JSX.Element} App component template
 */
export default function ScanScreen(): React.JSX.Element {
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.accent,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View>
        <Text>Scan</Text>
      </View>
    </SafeAreaView>
  )
}
