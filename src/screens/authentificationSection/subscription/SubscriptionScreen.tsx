/**
 * @fileoverview Subscription screen component
 * @module SubscriptionScreen
 * @description Subscription screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { colors } from '@global/colors'
import { SubscriptionScreenProps } from '@source/global/types/screensProps/AuthStackParams'
import Button from '@components/Button'

/**
 * @function SubscriptionScreen
 * @description Component that renders the Subscription screen.
 * @returns {React.JSX.Element} App component template
 */
export default function SubscriptionScreen({ navigation }: SubscriptionScreenProps): React.JSX.Element {
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
        <Text>Subscription screen</Text>
        <Button
          text='Connection'
          onPress={() => navigation.navigate('Connection')}
        />
      </View>
    </SafeAreaView>
  )
}
