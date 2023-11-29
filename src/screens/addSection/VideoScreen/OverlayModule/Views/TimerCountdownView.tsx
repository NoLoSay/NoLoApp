import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

type Props = {
  timerValue: number
  initialTimerValue: number
  isRecording: boolean
}

export default function TimerCountdownView({ timerValue, initialTimerValue, isRecording }: Props) {
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
