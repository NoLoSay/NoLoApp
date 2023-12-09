/**
 * @fileoverview Timer countdown view component
 * @module TimerCountdownView
 * @description Timer countdown view, it is the view that is displayed when the user is recording a video.
 * @requires react react-native
 */
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

/**
 * @typedef Props
 * @property {number} timerValue The current timer value
 * @property {number} initialTimerValue The initial timer value
 * @property {boolean} isRecording Wether the user is recording a video or not
 */
type Props = {
  timerValue: number
}

/**
 * @function TimerCountdownView
 * @description Component that renders the Timer countdown view.
 * @param {number} timerValue The current timer value
 * @param {number} initialTimerValue The initial timer value
 * @param {boolean} isRecording Wether the user is recording a video or not
 * @returns {JSX.Element} TimerCountdownView component
 */
export default function TimerCountdownView({ timerValue }: Props): JSX.Element {
  return <View style={styles.container}>{timerValue > 0 && <Text style={styles.textStyle}>{timerValue}</Text>}</View>
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 120,
    fontFamily: 'Poppins',
    fontWeight: '700',
    opacity: 0.5,
  },
})
