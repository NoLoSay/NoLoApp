/**
 * @fileoverview Add screen component
 * @module AddScreen
 * @description Add screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { colors } from '@global/colors'

/**
 * @function AddScreen
 * @description Component that renders the Add screen.
 * @returns {React.JSX.Element} App component template
 */
export default function AddScreen(): React.JSX.Element {
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
        <Text>Add</Text>
      </View>
    </SafeAreaView>
  )
}
