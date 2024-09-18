/**
 * @fileoverview Input component that renders an input field.
 * @description This component renders an input field.
 * @module TextInput
 * @requires react react
 * @requires react-native react-native
 * @requires ImageSourcePropType from 'react-native'
 * @requires TouchableOpacity from 'react-native'
 * @requires Keyboard from 'react-native'
 * @requires ViewStyle from 'react-native'
 */
import React from 'react'
import {
  View,
  TextInput,
  KeyboardType,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ReturnKeyType,
  Keyboard,
  ViewStyle,
} from 'react-native'
import { colors } from '@global/colors'

interface InputProps {
  placeholder: string
  secureTextEntry?: boolean
  setSecureTextEntry?: (value: boolean) => void
  keyboardType?: KeyboardType
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  returnKeyType?: ReturnKeyType
  autoCorrect?: boolean
  leftIcon?: ImageSourcePropType
  rightIcon?: ImageSourcePropType
  value: string
  setValue: (value: string) => void
  containerStyle?: ViewStyle
}

/**
 * @function Input
 * @description Component that renders an input field.
 * @param {InputProps} props - Component props
 * @param {string} props.placeholder - Input placeholder
 * @param {boolean} [props.secureTextEntry=false] - Wether the input should be a password field
 * @param {Function} [props.setSecureTextEntry] - Function to set the secureTextEntry value
 * @param {KeyboardType} [props.keyboardType='default'] - Keyboard type
 * @param {'none' | 'sentences' | 'words' | 'characters'} [props.autoCapitalize='none'] - Auto capitalize type
 * @param {ReturnKeyType} [props.returnKeyType='done'] - Return key type
 * @param {boolean} [props.autoCorrect=false] - Wether the input should be auto corrected
 * @param {ImageSourcePropType} [props.leftIcon] - Left icon
 * @param {ImageSourcePropType} [props.rightIcon] - Right icon
 * @param {string} props.value - Input value
 * @param {Function} props.setValue - Function to set the input value
 * @param {ViewStyle} [props.containerStyle] - Input container style
 * @returns {JSX.Element} Input component template
 */
export default function Input({
  placeholder,
  secureTextEntry = false,
  setSecureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  returnKeyType = 'done',
  autoCorrect = false,
  leftIcon,
  rightIcon,
  value,
  setValue,
  containerStyle,
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon && (
        <Image
          style={styles.icon}
          source={leftIcon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.darkGrey}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={text => setValue && setValue(text)}
        style={styles.input}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      {rightIcon && setSecureTextEntry && (
        <TouchableOpacity
          onPressIn={() => setSecureTextEntry(true)}
          onPressOut={() => setSecureTextEntry(false)}
        >
          <Image
            style={[styles.icon, !secureTextEntry && { opacity: 0.5 }]}
            source={rightIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 48,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderColor: colors.accent,
    borderWidth: 1,
  },
  input: {
    paddingHorizontal: 12,
    color: colors.darkGrey,
    fontFamily: 'Poppins-Medium',
    width: '80%',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.accent,
  },
})
