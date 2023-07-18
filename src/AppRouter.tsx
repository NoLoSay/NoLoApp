/**
 * @fileoverview AppRouter component
 * @module AppRouter
 * @description Main app component, entry point of app. Everything is rendered inside this component.
 * @requires react react-native
 * @requires @react-navigation/native
 * @see {@link https://reactnative.dev/docs/getting-started}
 * @see {@link https://reactnavigation.org/docs/getting-started}
 */

import React from 'react'
import ScanScreen from './screens/scan/ScanScreen'
import AddScreen from './screens/add/AddScreen'
import HomeScreen from './screens/home/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from '@global/colors'
import { Image } from 'react-native'
import { images } from '@global/images'
import { AppRouterScreenProps } from '@source/global/types/screensProps/AuthStackParams'

/**
 * @function AppRouter
 * @description Root component of the app that renders the connection and the subscription screens.
 * @returns {React.JSX.Element} App component template
 */
export default function AppRouter({ navigation }: AppRouterScreenProps): React.JSX.Element {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let image
          size = size + 15

          switch (route.name) {
            case 'Home':
              image = focused ? images.icons.full.home : images.icons.outline.home
              break
            case 'Add':
              image = focused ? images.icons.full.add : images.icons.outline.add
              break
            case 'Scan':
              image = focused ? images.icons.full.qr : images.icons.outline.qr
              break
          }

          // You can return any component that you like here!
          return (
            <Image
              source={image}
              style={{ tintColor: color, width: size, height: size }}
            />
          )
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.lightGrey,
        headerShown: false,
        tabBarShowLabel: false,
        gestureEnabled: false,
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
      />
      <Tab.Screen
        name='Add'
        component={AddScreen}
      />
      <Tab.Screen
        name='Scan'
        component={ScanScreen}
      />
    </Tab.Navigator>
  )
}
