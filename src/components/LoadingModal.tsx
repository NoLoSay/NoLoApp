/**
 * @fileoverview Loading modal component
 * @module LoadingModal
 * @description Component that renders a loading modal.
 * @requires react react-native
 * @requires Modal react-native
 * @requires View react-native
 * @requires ActivityIndicator react-native
 * @requires StyleSheet react-native
 */

import React from 'react'
import colors from '@source/global/colors'
import { Modal, View, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from 'react-native'

type Props = {
  visible: boolean
  loadingColor?: string
  size?: number | 'small' | 'large' | undefined
  loadingStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
}

/**
 * @function LoadingModal
 * @param visible Wether the modal is visible or not
 * @param loadingColor Color of the loading indicator
 * @param size Size of the loading indicator
 * @param loadingStyle Style of the loading indicator
 * @param containerStyle Style of the container
 * @returns {JSX.Element}
 */
export default function LoadingModal({
  visible,
  loadingColor = colors.accent,
  size = 'large',
  loadingStyle,
  containerStyle,
}: Props): JSX.Element {
  return (
    <Modal
      visible={visible}
      transparent
    >
      <View style={styles.background}>
        <View style={[styles.container, containerStyle]}>
          <ActivityIndicator
            size={size}
            color={loadingColor}
            style={loadingStyle}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000A0',
    zIndex: 100,
  },
  container: {
    backgroundColor: 'white',
    padding: 62,
    borderRadius: 8,
  },
})
