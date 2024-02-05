import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '@global/colors'

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
