/**
 * @fileoverview Timer countdown view component
 * @module TimerCountdownView
 * @description Timer countdown view, it is the view that is displayed when the user is recording a video.
 * @requires react react-native
 */
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

/**
 * @typedef Props
 * @property {number} timerValue The current timer value
 * @property {number} initialTimerValue The initial timer value
 * @property {boolean} isRecording Wether the user is recording a video or not
 */
type Props = {
  timerValue: number
  initialTimerValue: number
  isRecording: boolean
}

/**
 * @function TimerCountdownView
 * @description Component that renders the Timer countdown view.
 * @param {number} timerValue The current timer value
 * @param {number} initialTimerValue The initial timer value
 * @param {boolean} isRecording Wether the user is recording a video or not
 * @returns {JSX.Element} TimerCountdownView component
 */
export default function TimerCountdownView({ timerValue, initialTimerValue, isRecording }: Props): JSX.Element {
  const [timer, setTimer] = useState(timerValue)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isRecording) {
      const countdownInterval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1)
      }, 1000)

      return () => clearInterval(countdownInterval)
    }
    setTimer(initialTimerValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording])

  useEffect(() => {
    setTimer(timerValue)
  }, [timerValue])

  return <View style={styles.container}>{timer > 0 && <Text style={styles.textStyle}>{timer}</Text>}</View>
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
