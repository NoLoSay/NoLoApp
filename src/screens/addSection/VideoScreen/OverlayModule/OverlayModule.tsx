/**
 * @fileoverview Overlay module that displays different options to help the user while he records a video.
 * @module OverlayModule
 * @requires react react-native
 */
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '@source/global/colors'
import useOverlayModuleController from './useOverlayModuleController'
import AssistantView from './Views/AssistantView'
import TimerCountdownView from './Views/TimerCountdownView'
import TimerSliderView from './Views/TimerSliderView'

/**
 * @typedef Props
 * @property {boolean} isRecording Wether the user is recording a video or not
 * @property {React.Dispatch<React.SetStateAction<number>>} setTimer Function that sets the timer value
 * @property {number} timer The timer value
 */
type Props = {
  isRecording: boolean
  setTimer: React.Dispatch<React.SetStateAction<number>>
  timer: number
}

/**
 * @function OverlayModule
 * @description Component that renders the Overlay module.
 * @param {boolean} isRecording Wether the user is recording a video or not
 * @param {React.Dispatch<React.SetStateAction<number>>} setTimer Function that sets the timer value
 * @param {number} timer The timer value
 * @returns {JSX.Element} OverlayModule component
 */
export default function OverlayModule({ isRecording, setTimer, timer }: Props): JSX.Element {
  const { isAssistantVisible, onTimerPress, isTimerModalVisible, OVERLAY_OPTIONS, initialTimer, setInitialTimer } =
    useOverlayModuleController({
      timer,
    })

  return (
    <View style={styles.container}>
      {isAssistantVisible && <AssistantView />}
      <TimerCountdownView
        timerValue={timer}
        initialTimerValue={initialTimer}
        isRecording={isRecording}
      />
      {isTimerModalVisible && (
        <TimerSliderView
          toggleVisibility={onTimerPress}
          setTimerValue={setTimer}
          initialTimer={initialTimer}
          setInitialTimer={setInitialTimer}
        />
      )}
      {!isRecording && (
        <View style={styles.optionsContainer}>
          {OVERLAY_OPTIONS.map(option => (
            <Pressable
              key={option.title}
              style={styles.overlayCategoryButton}
              onPress={option.onPress}
            >
              <Image
                source={option.icon}
                style={styles.icon}
              />
              <Text style={styles.categoryText}>{option.title}</Text>
              {option.isActivated() && <View style={styles.activatedLine} />}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlayCategoryButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionsContainer: {
    width: '20%',
    backgroundColor: colors.black,
    opacity: 0.5,
    paddingHorizontal: 4,
    paddingVertical: 8,
    position: 'absolute',
    right: 8,
    top: '16%',
    borderRadius: 16,
  },
  icon: {
    height: 36,
    aspectRatio: 1,
    tintColor: colors.white,
  },
  activatedLine: {
    position: 'absolute',
    top: 18,
    width: 56,
    height: 2,
    backgroundColor: colors.accent,
    transform: [{ rotate: '45deg' }],
  },
  categoryText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    textAlign: 'center',
    color: colors.white,
  },
})
