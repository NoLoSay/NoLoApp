/**
 * @fileoverview Add section component
 * @module AddSection
 * @description Add section, it is the router that will handle all the screens related to the add section.
 * @requires react react-native
 */

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { VideoStackParamList } from '@global/types/screensProps/VideoStackParams'
import VideoScreen from './VideoScreen/VideoScreen'
import PlacesNeedingTranslation from './PlacesNeedTranslation/PlacesNeedingTranslation'
import TextScreen from './TextScreen/TextScreen'
import LibraryScreen from './LibraryScreen/LibraryScreen'

/**
 * @function AddScreen
 * @description Component that renders the Add screen.
 * @returns {React.JSX.Element} App component template
 */
export default function AddScreen(): React.JSX.Element {
  const VideoStack = createNativeStackNavigator<VideoStackParamList>()

  return (
    <VideoStack.Navigator
      initialRouteName='PlacesNeedingTranslation'
      screenOptions={{
        headerShown: false,
      }}
    >
      <VideoStack.Group>
        <VideoStack.Screen
          name='VideoScreen'
          component={VideoScreen}
        />
        <VideoStack.Screen
          name='PlacesNeedingTranslation'
          component={PlacesNeedingTranslation}
        />
      </VideoStack.Group>
      <VideoStack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <VideoStack.Screen
          name='TextScreen'
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          component={TextScreen}
        />
        <VideoStack.Screen
          name='LibraryScreen'
          component={LibraryScreen}
        />
      </VideoStack.Group>
    </VideoStack.Navigator>
  )
}
