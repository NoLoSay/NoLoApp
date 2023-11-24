/**
 * @fileoverview Actions screen component
 * @module ActionsScreen
 * @description Actions screen, it is the first screen that a user sees when clicking on the + tab
 * @requires react react-native
 */

import React from 'react'
import { Pressable, SafeAreaView, StyleSheet } from 'react-native'
import { colors } from '@global/colors'
import { Camera } from 'react-native-vision-camera'
import LoadingModal from '@source/components/LoadingModal'
import useVideoScreenController from './useVideoScreenController'
import NoCameraView from './Views/NoCameraView'
/**
 * @function ActionsScreen
 * @description Component that renders the Scan screen.
 * @returns {React.JSX.Element} App component template
 */
export default function VideoScreen(): React.JSX.Element {
  const { hasPermission, frontCamera, cameraRef, isRecording, onRecordPress, isLoading, isCameraActive } =
    useVideoScreenController()

  if (!frontCamera || !hasPermission) return <NoCameraView hasPermission={hasPermission} />
  return (
    <Camera
      style={styles.camera}
      device={frontCamera}
      ref={cameraRef}
      isActive={isCameraActive}
      video
    >
      <SafeAreaView style={styles.bottomContainer}>
        <Pressable
          onPress={onRecordPress}
          style={isRecording ? styles.recordingButton : styles.recordButton}
        />
      </SafeAreaView>
      <LoadingModal visible={isLoading} />
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
  camera: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  recordButton: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    width: '10%',
    aspectRatio: 1,
    borderRadius: 5,
    backgroundColor: colors.accent,
    opacity: 0.8,
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
