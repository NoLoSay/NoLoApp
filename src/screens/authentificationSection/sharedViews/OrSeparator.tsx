import { colors } from '@source/global/colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function OrSeparator() {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separatorLine} />
      <Text style={styles.separatorText}>ou avec</Text>
      <View style={styles.separatorLine} />
    </View>
  )
}

const styles = StyleSheet.create({
  separatorContainer: {
    paddingHorizontal: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.darkGrey,
  },
  separatorText: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: colors.darkGrey,
    paddingHorizontal: 26,
  },
})
