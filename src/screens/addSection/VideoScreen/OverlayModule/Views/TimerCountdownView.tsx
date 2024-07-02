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
 */
type Props = {
  timerValue: number
}

/**
 * @function TimerCountdownView
 * @description Component that renders the Timer countdown view.
 * @param {number} timerValue The current timer value
 * @param {number} endTimerValue The end timer value
 * @param {boolean} isRecording Wether the user is recording a video or not
 * @returns {JSX.Element} TimerCountdownView component
 */
export default function TimerCountdownView({ timerValue }: Props): JSX.Element {
  if (timerValue > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>{timerValue}</Text>
      </View>
    )
  }
  return <View />
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 75,
  },
  textStyle: {
    fontSize: 80,
    fontFamily: 'Poppins',
    fontWeight: '700',
    opacity: 0.5,
  },
})
