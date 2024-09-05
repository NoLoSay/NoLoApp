/**
 * @fileoverview Video screen component
 * @module VideoScreen
 * @description Video screen, it is the screen that the user will be shown when he wants to create a video.
 * @requires react react-native
 */

import React from 'react'
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native'
import { Camera } from 'react-native-vision-camera'
import LoadingModal from '@components/LoadingModal'
import ErrorModal from '@components/ErrorModal'
import { colors } from '@global/colors'
import useVideoScreenController from './useVideoScreenController'
import NoCameraView from './Views/NoCameraView'
import OverlayModule from './OverlayModule/OverlayModule'

/**
 * @function VideoScreen
 * @description Component that renders the Video screen.
 * @returns {React.JSX.Element} App component template
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function VideoScreen({ route }: any): React.JSX.Element {
  const {
    hasPermission,
    frontCamera,
    cameraRef,
    isRecording,
    onRecordPress,
    isLoading,
    isCameraActive,
    isErrorModalVisible,
    errorText,
    timerValue,
    setTimerValue,
    defaultTimerValue,
    setDefaultTimerValue,
    isTimerModalVisible,
    setIsTimerModalVisible,
  } = useVideoScreenController()

  if (!frontCamera || !hasPermission) return <NoCameraView hasPermission={hasPermission} />
  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={frontCamera}
        ref={cameraRef}
        isActive={isCameraActive}
        video
      />
      <OverlayModule
        isRecording={isRecording}
        timerValue={timerValue}
        setTimerValue={setTimerValue}
        defaultTimerValue={defaultTimerValue}
        setDefaultTimerValue={setDefaultTimerValue}
        isTimerModalVisible={isTimerModalVisible}
        setIsTimerModalVisible={setIsTimerModalVisible}
        translatedText={route.params.translateText}
      />
      <SafeAreaView style={styles.bottomContainer}>
        <Pressable
          onPress={onRecordPress}
          style={isRecording ? styles.recordingButton : styles.recordButton}
        >
          {isRecording && <View style={styles.recordingSquare} />}
        </Pressable>
      </SafeAreaView>
      <LoadingModal visible={isLoading} />
      <ErrorModal
        visible={isErrorModalVisible}
        errorText={errorText}
      />
    </>
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
    zIndex: 0,
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
    width: '20%',
    aspectRatio: 1,
    borderRadius: 50,
    borderColor: colors.accent,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  recordingSquare: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 5,
    backgroundColor: colors.accent,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
