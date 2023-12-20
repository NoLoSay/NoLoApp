/**
 * @fileoverview Overlay module that displays different options to help the user while he records a video.
 * @module OverlayModule
 * @requires react react-native
 */
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '../../../../global/colors'
import useOverlayModuleController from './useOverlayModuleController'
import AssistantView from './Views/AssistantView'
import TimerCountdownView from './Views/TimerCountdownView'
import TimerSliderView from './Views/TimerSliderView'
import PrompterModule from './PrompterModule/PrompterModule'

/**
 * @typedef Props
 * @property {boolean} isRecording Wether the user is recording a video or not
 * @property {number} timerValue The timer value
 * @property {React.Dispatch<React.SetStateAction<number>>} setTimerValue Function that sets the timer value
 * @property {number} defaultTimerValue The default timer value
 * @property {React.Dispatch<React.SetStateAction<number>>} setDefaultTimerValue Function that sets the default timer value
 */
type Props = {
  isRecording: boolean
  timerValue: number
  setTimerValue: React.Dispatch<React.SetStateAction<number>>
  defaultTimerValue: number
  setDefaultTimerValue: React.Dispatch<React.SetStateAction<number>>
  translatedText: string
}

/**
 * @function OverlayModule
 * @description Component that renders the Overlay module.
 * @param {boolean} isRecording Wether the user is recording a video or not
 * @param {number} timerValue The timer value
 * @param {React.Dispatch<React.SetStateAction<number>>} setTimerValue Function that sets the timer value
 * @param {number} defaultTimerValue The default timer value
 * @param {React.Dispatch<React.SetStateAction<number>>} setDefaultTimerValue Function that sets the default timer value
 * @returns {JSX.Element} OverlayModule component
 */
export default function OverlayModule({
  isRecording,
  timerValue,
  setTimerValue,
  defaultTimerValue,
  setDefaultTimerValue,
  translatedText,
}: Props): JSX.Element {
  const { isAssistantVisible, onTimerPress, isTimerModalVisible, OVERLAY_OPTIONS, isPrompterVisible } =
    useOverlayModuleController({
      defaultTimerValue,
    })

  return (
    <View style={styles.container}>
      {isAssistantVisible && <AssistantView />}
      <TimerCountdownView timerValue={timerValue} />
      {isTimerModalVisible && (
        <TimerSliderView
          toggleVisibility={onTimerPress}
          setTimerValue={setTimerValue}
          defaultTimerValue={defaultTimerValue}
          setDefaultTimerValue={setDefaultTimerValue}
        />
      )}
      {isPrompterVisible && !isTimerModalVisible && (
        <PrompterModule
          text={translatedText}
          isRecording={isRecording}
          timer={timerValue}
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
