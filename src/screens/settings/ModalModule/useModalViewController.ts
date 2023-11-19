/**
 * @fileoverview Modal view controller.
 * @module useModalViewController
 * @description Controller for the modal.
 * @requires react react-native
 */
import { AccountType } from '@source/global/types/Account'
import { useState } from 'react'

type Props = {
  account: AccountType
  hideModal: () => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setUsername: (username: string) => void
}

type ModalViewController = {
  account: AccountType
  tmpFirstName: string
  setTmpFirstName: (firstName: string) => void
  tmpLastName: string
  setTmpLastName: (lastName: string) => void
  tmpUsername: string
  setTmpUsername: (username: string) => void
  onModalValidate: () => void
}

/**
 * @function useModalViewController
 * @description Controller that handles the logic for the modal.
 * @param account Account.
 * @param hideModal Function to hide the modal.
 * @param setFirstName Function to set the first name.
 * @param setLastName Function to set the last name.
 * @param setUsername Function to set the username.
 * @returns {ModalViewController} Modal view controller.
 */
export default function useModalViewController({
  account,
  hideModal,
  setFirstName,
  setLastName,
  setUsername,
}: Props): ModalViewController {
  const [tmpFirstName, setTmpFirstName] = useState(account.name.firstName)
  const [tmpLastName, setTmpLastName] = useState(account.name.lastName)
  const [tmpUsername, setTmpUsername] = useState(account.username)

  const handleSave = () => {
    // TODO: Send request to update account to the server
    setFirstName(tmpFirstName)
    setLastName(tmpLastName)
    setUsername(tmpUsername)
    hideModal()
  }

  return {
    account,
    tmpFirstName,
    setTmpFirstName,
    tmpLastName,
    setTmpLastName,
    tmpUsername,
    setTmpUsername,
    onModalValidate: handleSave,
  }
}
