/**
 * @fileoverview Connection screen component
 * @module ConnectionScreen
 * @description Connection screen, it is the first screen that the user sees when opening the app.
 * @requires react react-native
 */

import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@global/colors'
import { ConnectionScreenProps, SubscriptionScreenProps } from '@source/global/types/screensProps/AuthStackParams'
import Button from '@components/Button'

/**
 * @function ConnectionScreen
 * @description Component that renders the connection screen.
 * @returns {React.JSX.Element} App component template
 */
export default function ConnectionScreen({ navigation }: ConnectionScreenProps): React.JSX.Element {
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
        <Button
          text='Subscription'
          onPress={() => navigation.navigate('Subscription')}
        />
      </View>
    </SafeAreaView>
  )
}
