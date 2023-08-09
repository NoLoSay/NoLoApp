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
import { Image, ImageSourcePropType } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from '@global/colors'
import { images } from '@global/images'
import ScanScreen from './screens/scan/ScanScreen'
import AddScreen from './screens/add/AddScreen'
import HomeScreen from './screens/home/HomeScreen'

interface getImageNameProps {
  focused: boolean
  route: string
}

interface NavigationImageProps {
  focused: boolean
  route: string
  color: string
  size: number
}

function getImageName({ focused, route }: getImageNameProps): ImageSourcePropType {
  switch (route) {
    case 'Home':
      return focused ? images.icons.full.home : images.icons.outline.home
    case 'Add':
      return focused ? images.icons.full.add : images.icons.outline.add
    case 'Scan':
      return focused ? images.icons.full.qr : images.icons.outline.qr
    default:
      return images.icons.outline.home
  }
}

function NavigationImage({ focused, route, color, size }: NavigationImageProps): React.JSX.Element {
  return (
    <Image
      source={getImageName({ focused, route })}
      style={{ tintColor: color, width: size, height: size }}
    />
  )
}

/**
 * @function AppRouter
 * @description Root component of the app that renders the connection and the subscription screens.
 * @returns {React.JSX.Element} App component template
 */
export default function AppRouter(): React.JSX.Element {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <NavigationImage
              focused={focused}
              route={route.name}
              color={color}
              size={size + 12}
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
