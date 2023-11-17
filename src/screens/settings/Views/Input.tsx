/**
 * @fileoverview Input view for the SettingsScreen component
 * @module Input
 * @description Input view for the SettingsScreen component
 * @requires react react-native
 */
import colors from '@source/global/colors'
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

type Props = {
  value: string
  setValue: (value: string) => void
  placeholder: string
  autoCapitalize: TextInput['props']['autoCapitalize']
}

/**
 * @function Input
 * @description Component that renders the Input view.
 * @param value Input value
 * @param setValue Input value setter
 * @param placeholder Input placeholder
 * @param autoCapitalize Should the input capitalize the first letter of each word
 * @returns {React.JSX.Element} Input component template
 */
export default function Input({ value, setValue, placeholder, autoCapitalize }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.inputName}>{`${placeholder}:`}</Text>
      <TextInput
        style={styles.inputContainer}
        onChangeText={(t: string) => setValue(t)}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        value={value}
        placeholderTextColor={colors.darkGrey}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 40,
  },
  inputName: {
    textAlign: 'left',
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  inputContainer: {
    color: colors.black,
    borderBottomColor: colors.accent,
    borderBottomWidth: 2,
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 14,
  },
})
