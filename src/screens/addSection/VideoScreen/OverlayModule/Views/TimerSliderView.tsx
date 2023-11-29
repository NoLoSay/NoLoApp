import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Button from '@source/components/Button'
import colors from '@source/global/colors'

type Props = {
  toggleVisibility: () => void
  setTimerValue: React.Dispatch<React.SetStateAction<number>>
  initialTimer: number
  setInitialTimer: (timer: number) => void
}

function TimerSliderView({ toggleVisibility, setTimerValue, initialTimer, setInitialTimer }: Props) {
  const [selectedValue, setSelectedValue] = useState(initialTimer)

  const handleSliderChange = (value: number) => {
    setSelectedValue(value)
  }

  const handleSliderConfirm = () => {
    setTimerValue(selectedValue)
    setInitialTimer(selectedValue)
    toggleVisibility()
  }

  const handleSliderCancel = () => {
    toggleVisibility()
  }

  const TIMER_OPTIONS = [
    {
      label: 'Désactivé',
      value: 0,
      color: 'red',
    },
    {
      label: '1s',
      value: 1,
    },
    {
      label: '3s',
      value: 3,
    },
    {
      label: '5s',
      value: 5,
    },
    {
      label: '10s',
      value: 10,
    },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choisissez un temps avant que la vidéo commence</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleSliderChange}
        style={styles.picker}
        prompt='Select Timer Value'
      >
        {TIMER_OPTIONS.map(option => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
            color={option.color}
          />
        ))}
      </Picker>
      <View style={styles.buttonContainer}>
        <Button
          text='Confirmer'
          onPress={handleSliderConfirm}
          style={styles.validateButton}
          textStyle={styles.textButton}
        />
        <Button
          text='Annuler'
          onPress={handleSliderCancel}
          style={styles.cancelButton}
          textStyle={styles.textButton}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: 36,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Poppins',
  },
  picker: {
    width: 150,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textButton: {
    paddingHorizontal: 16,
  },
  validateButton: {
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: colors.white,
  },
})

export default TimerSliderView
