/**
 * @fileoverview Scan screen component
 * @module ScanScreen
 * @description Scan screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { colors } from '@global/colors'
import useScanScreenController from './useScanScreenController'

/**
 * @function ScanScreen
 * @description Component that renders the Scan screen.
 * @returns {React.JSX.Element} App component template
 */
export default function ScanScreen(): React.JSX.Element {
  const { account } = useScanScreenController()
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{account.accessToken}</Text>
        <Text>{account.accountID}</Text>
        <Text>{account.authentified ? 'true' : 'false'}</Text>
        <Text>{account.email}</Text>
        <Text>{account.phoneNumber}</Text>
        <Text>{account.username}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
