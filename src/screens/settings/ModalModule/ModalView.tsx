/**
 * @fileoverview Modal view for the SettingsScreen component
 * @module ModalView
 * @description Modal that displays the inputs that the user can use to change his name and username.
 * @requires react react-native
 */
import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import colors from '@global/colors'
import Button from '@components/Button'
import { AccountType } from '@global/types/Account'
import ChangeUserJSON from '@global/types/httpClient/user/ChangeUser'
import { UseMutationResult } from '@tanstack/react-query'
import Input from '../Views/Input'
import useModalViewController from './useModalViewController'

type Props = {
  account: AccountType
  isVisible: boolean
  hideModal: () => void
  changeUserMutation: UseMutationResult<ChangeUserJSON, Error, void, unknown>
  tmpUsername: string
  setTmpUsername: (username: string) => void
}

/**
 * @function ModalView
 * @description Component that renders the Modal view.
 * @param account The account object
 * @param setUsername The function that sets the username
 * @param isVisible Is the modal visible
 * @param hideModal The function that hides the modal
 * @param setIsLoading The function that sets the loading state
 * @returns {React.JSX.Element} Modal component View
 */
export default function ModalView({
  account,
  isVisible,
  hideModal,
  changeUserMutation,
  tmpUsername,
  setTmpUsername,
}: Props): React.JSX.Element {
  const { onModalValidate } = useModalViewController({
    account,
    hideModal,
    changeUserMutation,
    tmpUsername,
    setTmpUsername,
  })
  return (
    <Modal
      animationType='fade'
      transparent
      visible={isVisible}
    >
      <View style={styles.backgroundOpacity}>
        <View style={styles.container}>
          <Input
            value={tmpUsername}
            setValue={setTmpUsername}
            placeholder="Nom d'utilisateur"
            autoCapitalize='none'
          />
          <View style={styles.buttonContainer}>
            <Button
              text='Valider'
              onPress={onModalValidate}
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
})
