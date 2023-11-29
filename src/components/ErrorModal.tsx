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
import { Modal, View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native'

type Props = {
  visible: boolean
  errorText: string
  containerStyle?: StyleProp<ViewStyle>
}

/**
 * @function ErrorModal
 * @param visible Wether the modal is visible or not
 * @param containerStyle Style of the container
 * @returns {JSX.Element}
 */
export default function ErrorModal({ visible, containerStyle, errorText }: Props): JSX.Element {
  return (
    <Modal
      visible={visible}
      transparent
    >
      <View style={styles.background}>
        <View style={[styles.container, containerStyle]}>
          <Text style={styles.text}>{errorText}</Text>
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
    paddingHorizontal: 62,
    paddingVertical: 32,
    borderRadius: 8,
    width: '66%',
  },
  text: {
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
    fontWeight: '700',
  },
})
