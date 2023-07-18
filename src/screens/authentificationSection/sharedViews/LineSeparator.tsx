import { colors } from '@source/global/colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function LineSeparator() {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separatorLine} />
    </View>
  )
}

const styles = StyleSheet.create({
  separatorContainer: {
    paddingHorizontal: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.darkGrey,
  },
})
