/**
 * @fileoverview AuthRouter component
 * @module AuthRouter
 * @description Main app component, it renders the connection and the subscription screens.
 * @requires react react-native
 * @requires @react-navigation/native
 * @see {@link https://reactnative.dev/docs/getting-started}
 * @see {@link https://reactnavigation.org/docs/getting-started}
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ConnectionScreen from './screens/connection/ConnectionScreen'
import SubscriptionScreen from './screens/subscription/SubscriptionScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppRouter from './AppRouter'
import { AuthStackParamList } from '@source/global/types/screensProps/AuthStackParams'

/**
 * @function AuthRouter
 * @description Root component of the app that renders the connection and the subscription screens.
 * @returns {React.JSX.Element} App component template
 */
export default function App(): React.JSX.Element {
  const AuthStack = createNativeStackNavigator<AuthStackParamList>()

  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName='Connection'
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen
          name='Connection'
          component={ConnectionScreen}
        />
        <AuthStack.Screen
          name='Subscription'
          component={SubscriptionScreen}
        />
        <AuthStack.Screen
          name='AppRouter'
          component={AppRouter}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}
