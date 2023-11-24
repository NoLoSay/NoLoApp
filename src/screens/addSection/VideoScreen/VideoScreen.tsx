/**
 * @fileoverview Actions screen component
 * @module ActionsScreen
 * @description Actions screen, it is the first screen that a user sees when clicking on the + tab
 * @requires react react-native
 */

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { colors } from '@global/colors'
import { Camera } from 'react-native-vision-camera'
import Button from '@source/components/Button'
import useVideoScreenController from './useVideoScreenController'
import NoCameraView from './Views/NoCameraView'
/**
 * @function ActionsScreen
 * @description Component that renders the Scan screen.
 * @returns {React.JSX.Element} App component template
 */
export default function VideoScreen(): React.JSX.Element {
  const { hasPermission, frontCamera, cameraRef, isRecording, onRecordPress } = useVideoScreenController()

  if (!frontCamera || !hasPermission) return <NoCameraView hasPermission={hasPermission} />
  return (
    <Camera
      style={styles.camera}
      device={frontCamera}
      ref={cameraRef}
      isActive
      video
    >
      <Button
        text='RECORD'
        onPress={onRecordPress}
      />
      {isRecording && <Text>Recordin^g...</Text>}
    </Camera>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.accent,
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
  },
  categoryContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
})
