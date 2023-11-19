import colors from '@source/global/colors'
import React from 'react'
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native'

export default function LoadingModal({ visible }: { visible: boolean }) {
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
