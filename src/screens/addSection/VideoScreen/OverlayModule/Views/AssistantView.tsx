import colors from '@source/global/colors'
import React from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'

export default function AssistantView() {
  const { width } = useWindowDimensions()
  const assistantDimensions = {
    height: 130,
  }
  return (
    <View
      style={[
        styles.positionOverlay,
        {
          left: width / 2 - (assistantDimensions.height * 0.9) / 2,
          height: assistantDimensions.height,
          aspectRatio: 0.9,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  positionOverlay: {
    position: 'absolute',
    top: '20%',
    left: '36.5%',
    borderWidth: 5,
    borderColor: colors.accent,
    borderStyle: 'dashed',
    borderRadius: 400,
  },
})
