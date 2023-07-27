import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from '@source/global/colors'

interface ForgotPasswordProps {
  onPress: () => void
}

export default function ForgotPassword({ onPress }: ForgotPasswordProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonView}
        onPress={onPress}
      >
        <Text style={styles.text}>Un trou de mémoire ?</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    fontSize: 12,
    color: colors.accent,
    textDecorationLine: 'underline',
  },
  buttonView: {
    alignSelf: 'flex-end',
    marginRight: 52,
    marginTop: 8,
  },
})
