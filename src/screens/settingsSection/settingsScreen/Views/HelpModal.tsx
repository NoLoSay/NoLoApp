/**
 * @fileoverview HelpModal component that renders the HelpModal.
 * @module HelpModal
 * @description Component that renders the HelpModal.
 * @requires react
 */

import React from 'react'
import { Text, Modal, View, StyleSheet } from 'react-native'
import Button from '@components/Button'
import colors from '@global/colors'

type Props = {
  isVisible: boolean
  hideModal: () => void
  onValidate: () => void
}

/**
 * @function HelpModal
 * @description Component that renders the HelpModal.
 * @param props HelpModal props
 * @param props.isVisible HelpModal visibility
 * @param props.hideModal HelpModal hide function
 * @param props.onValidate HelpModal validate function
 * @returns {React.JSX.Element} HelpModal component template
 */
export default function HelpModal({ isVisible, hideModal, onValidate }: Props): React.JSX.Element {
  return (
    <Modal
      animationType='fade'
      transparent
      visible={isVisible}
    >
      <View style={styles.backgroundOpacity}>
        <View style={styles.container}>
          <Text style={styles.title}>Vous avez besoin d&apos;aide ?</Text>
          <Text style={styles.text}>Contactez-nous par mail en cliquant sur le bouton ci-dessous.</Text>
          <Text style={styles.text}>
            Expliquez-nous votre besoin et nous vous répondrons dans les plus brefs délais.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              text='Envoyer'
              onPress={onValidate}
              style={styles.validateButton}
            />
            <Button
              text='Annuler'
              onPress={hideModal}
              style={styles.cancelButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backgroundOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000AA',
    opacity: 1,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    padding: 24,
    alignItems: 'center',
    opacity: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  validateButton: {
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: colors.white,
    borderColor: colors.accent,
    borderWidth: 1,
  },
  title: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  text: {
    color: colors.black,
    fontSize: 18,
    marginBottom: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
})
