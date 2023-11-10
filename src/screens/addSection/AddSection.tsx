/**
 * @fileoverview Add section component
 * @module AddSection
 * @description Add section, it is the router that will handle all the screens related to the add section.
 * @requires react react-native
 */

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { VideoStackParamList } from '@source/global/types/screensProps/VideoStackParams'
import ActionsScreen from './ActionsScreen/ActionsScreen'

/**
 * @function AddScreen
 * @description Component that renders the Add screen.
 * @returns {React.JSX.Element} App component template
 */
export default function AddScreen(): React.JSX.Element {
  const VideoStack = createNativeStackNavigator<VideoStackParamList>()

  return (
    <VideoStack.Navigator
      initialRouteName='ActionsScreen'
      screenOptions={{
        headerShown: false,
      }}
    >
      <VideoStack.Group>
        <VideoStack.Screen
          name='ActionsScreen'
          component={ActionsScreen}
        />
      </VideoStack.Group>
    </VideoStack.Navigator>
  )
}
