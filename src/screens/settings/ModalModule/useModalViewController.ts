/**
 * @fileoverview Modal view controller.
 * @module useModalViewController
 * @description Controller for the modal.
 * @requires react react-native
 */
import { useState } from 'react'
import { AccountType } from '../../../global/types/Account'

type Props = {
  account: AccountType
  hideModal: () => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setUsername: (username: string) => void
  setIsLoading: (isLoading: boolean) => void
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
 * @param setIsLoading Function to set the loading state.
 * @returns {ModalViewController} Modal view controller.
 */
export default function useModalViewController({
  account,
  hideModal,
  setFirstName,
  setLastName,
  setUsername,
  setIsLoading,
}: Props): ModalViewController {
  const [tmpFirstName, setTmpFirstName] = useState(account.name.firstName)
  const [tmpLastName, setTmpLastName] = useState(account.name.lastName)
  const [tmpUsername, setTmpUsername] = useState(account.username)

  const handleSave = () => {
    hideModal()
    setIsLoading(true)
    // TODO: Send request to update account to the server
    setTimeout(() => {
      setFirstName(tmpFirstName)
      setLastName(tmpLastName)
      setUsername(tmpUsername)
      setIsLoading(false)
    }, 1000)
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
