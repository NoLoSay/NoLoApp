/**
 * @fileoverview AssistantView component.
 * @module AssistantView
 * @requires react react-native
 */
import colors from '@source/global/colors'
import React from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'

/**
 * @function AssistantView
 * @description Component that renders the assistant view.
 * @returns {JSX.Element} AssistantView component
 */
export default function AssistantView(): JSX.Element {
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
