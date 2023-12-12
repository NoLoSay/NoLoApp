/**
 * @fileoverview Timer slider view component
 * @module TimerSliderView
 * @description Timer slider view, it is the view that is displayed when the user wants to change the timer value.
 * @requires react react-native
 * @requires @react-native-picker/picker
 */
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Button from '@source/components/Button'
import colors from '@source/global/colors'

/**
 * @typedef Props
 * @property {Function} toggleVisibility Function that toggles the visibility of the timer slider
 * @property {React.Dispatch<React.SetStateAction<number>>} setTimerValue Function that sets the timer value
 * @property {number} defaultTimerValue The default timer value
 * @property {Function} setDefaultTimerValue Function that sets the default timer value
 */
type Props = {
  toggleVisibility: () => void
  setTimerValue: React.Dispatch<React.SetStateAction<number>>
  defaultTimerValue: number
  setDefaultTimerValue: (timer: number) => void
}

/**
 * @function TimerSliderView
 * @description Component that renders the Timer slider view.
 * @param {() => void} toggleVisibility Function that toggles the visibility of the timer slider
 * @param {React.Dispatch<React.SetStateAction<number>>} setTimerValue Function that sets the timer value
 * @param {number} defaultTimerValue The default timer value
 * @param {(timer: number) => void} setDefaultTimerValue Function that sets the default timer value
 * @returns
 */
function TimerSliderView({ toggleVisibility, setTimerValue, defaultTimerValue, setDefaultTimerValue }: Props) {
  const [selectedValue, setSelectedValue] = useState(defaultTimerValue)

  /**
   * @function handleSliderChange
   * @description Function that handles the change of the slider value
   * @param {number} value The new value of the slider
   */
  const handleSliderChange = (value: number) => {
    setSelectedValue(value)
    setTimerValue(value)
    setDefaultTimerValue(value)
  }

  /**
   * @function handleSliderConfirm
   * @description Function that handles the confirmation of the slider value
   */
  const handleSliderConfirm = () => {
    toggleVisibility()
  }

  /**
   * @function handleSliderCancel
   * @description Function that handles the cancellation of the slider value
   */
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
      <Text style={styles.text}>Choisissez une durée avant que la vidéo commence</Text>
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
