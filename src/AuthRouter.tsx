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
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '@source/global/types/screensProps/AuthStackParams'
import ConnectionScreen from './screens/authentificationSection/connection/ConnectionScreen'
import SubscriptionScreen from './screens/authentificationSection/subscription/SubscriptionScreen'
import AppRouter from './AppRouter'
import { AccountProvider } from './global/contexts/AccountProvider'
import SettingsScreen from './screens/settings/SettingsScreen'
import WebViewScreen from './screens/webView/WebView'
import PlaceDescription from './screens/PlaceDescription/PlaceDescription'

export default function App(): React.JSX.Element {
  const AuthStack = createNativeStackNavigator<AuthStackParamList>()

  return (
    <AccountProvider>
      <NavigationContainer>
        <AuthStack.Navigator
          initialRouteName='Subscription'
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Group>
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
          </AuthStack.Group>
          <AuthStack.Group screenOptions={{ presentation: 'modal' }}>
            <AuthStack.Screen
              name='SettingsModal'
              component={SettingsScreen}
            />
          </AuthStack.Group>
          <AuthStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
            <AuthStack.Screen
              name='WebViewModal'
              component={WebViewScreen}
            />
            <AuthStack.Screen
              name='PlaceDescription'
              component={PlaceDescription}
            />
          </AuthStack.Group>
        </AuthStack.Navigator>
      </NavigationContainer>
    </AccountProvider>
  )
}
