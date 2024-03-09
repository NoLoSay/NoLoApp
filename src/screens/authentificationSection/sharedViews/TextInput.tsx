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
  leftIcon?: ImageSourcePropType
  rightIcon?: ImageSourcePropType
  value: string
  setValue: (value: string) => void
  containerStyle?: ViewStyle
}

export default function Input({
  placeholder,
  secureTextEntry = false,
  setSecureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'words',
  returnKeyType = 'done',
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
        placeholderTextColor={colors.lightGrey}
        placeholder={placeholder}
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
    backgroundColor: colors.darkGrey,
    paddingVertical: 16,
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
