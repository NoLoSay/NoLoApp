import { colors } from '@source/global/colors'
import React from 'react'
import { View, TextInput, KeyboardType, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'

interface InputProps {
  placeholder: string
  secureTextEntry?: boolean
  setSecureTextEntry?: (value: boolean) => void
  keyboardType?: KeyboardType
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  leftIcon?: ImageSourcePropType
  rightIcon?: ImageSourcePropType
  value: string
  setValue: (value: string) => void
}

export default function Input({
  placeholder,
  secureTextEntry = false,
  setSecureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'words',
  leftIcon,
  rightIcon,
  value,
  setValue,
}: InputProps) {
  return (
    <View style={styles.container}>
      {leftIcon && (
        <Image
          style={styles.icon}
          source={leftIcon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.lightGrey}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={text => setValue && setValue(text)}
        style={styles.input}
        autoCapitalize={autoCapitalize}
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
    marginHorizontal: 52,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.darkGrey,
    paddingVertical: 20,
  },
  input: {
    paddingHorizontal: 12,
    color: colors.white,
    fontFamily: 'Poppins-Medium',
    width: '80%',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.accent,
  },
})
