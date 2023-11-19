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
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native'

type Props = {
  visible: boolean
}

/**
 * @function LoadingModal
 * @param visible Wether the modal is visible or not
 * @returns
 */
export default function LoadingModal({ visible }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <ActivityIndicator
            size='large'
            color={colors.accent}
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
  },
  container: {
    backgroundColor: 'white',
    padding: 62,
    borderRadius: 8,
  },
})
