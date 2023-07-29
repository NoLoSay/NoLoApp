/**
 * @fileoverview Home screen component
 * @module HomeScreen
 * @description Home screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { colors } from '@global/colors'

/**
 * @function HomeScreen
 * @description Component that renders the Home screen.
 * @returns {React.JSX.Element} App component template
 */
export default function HomeScreen(): React.JSX.Element {
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
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  )
}
