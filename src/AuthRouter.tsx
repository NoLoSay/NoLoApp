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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthStackParamList } from '@global/types/screensProps/AuthStackParams'
import { AccountProvider } from '@global/contexts/AccountProvider'
import ConnectionScreen from '@screens/authentificationSection/connection/ConnectionScreen'
import SubscriptionScreen from '@screens/authentificationSection/subscription/SubscriptionScreen'
import SettingsScreen from '@screens/settingsSection/settingsScreen/SettingsScreen'
import WebViewScreen from '@screens/webView/WebView'
import PlaceDescription from '@screens/PlaceDescription/PlaceDescription'
import VideoConsumptionView from '@screens/VideoConsumptionView/VideoConsumptionView'
import AccountModificationScreen from '@screens/settingsSection/accountModificationScreen/AccountModificationScreen'
import AppRouter from './AppRouter'

export default function App(): React.JSX.Element {
  const AuthStack = createNativeStackNavigator<AuthStackParamList>()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
      },
    },
  })

  return (
    <AccountProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthStack.Navigator
            initialRouteName='Subscription'
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
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
            <AuthStack.Group screenOptions={{ presentation: 'modal', gestureEnabled: true }}>
              <AuthStack.Screen
                name='SettingsModal'
                component={SettingsScreen}
              />
              <AuthStack.Screen
                name='AccountModification'
                component={AccountModificationScreen}
              />
            </AuthStack.Group>
            <AuthStack.Group screenOptions={{ presentation: 'fullScreenModal', gestureEnabled: true }}>
              <AuthStack.Screen
                name='WebViewModal'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: Unreachable code error
                component={WebViewScreen}
              />
              <AuthStack.Screen
                name='VideoConsumptionModal'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: Unreachable code error
                component={VideoConsumptionView}
              />
              <AuthStack.Screen
                name='PlaceDescription'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: Unreachable code error
                component={PlaceDescription}
              />
            </AuthStack.Group>
          </AuthStack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </AccountProvider>
  )
}
