/**
 * @fileoverview Modal view controller.
 * @module useModalViewController
 * @description Controller for the modal.
 * @requires react react-native
 */
import { AccountType } from '@global/types/Account'
import ChangeUserJSON from '@global/types/httpClient/user/ChangeUser'
import { UseMutationResult } from '@tanstack/react-query'

type Props = {
  account: AccountType
  hideModal: () => void
  changeUserMutation: UseMutationResult<ChangeUserJSON, Error, void, unknown>
  tmpUsername: string
  setTmpUsername: (username: string) => void
}

type ModalViewController = {
  account: AccountType
  tmpUsername: string
  setTmpUsername: (username: string) => void
  onModalValidate: () => void
}

/**
 * @function useModalViewController
 * @description Controller that handles the logic for the modal.
 * @param account Account.
 * @param hideModal Function to hide the modal.
 * @param setUsername Function to set the username.
 * @param setIsLoading Function to set the loading state.
 * @returns {ModalViewController} Modal view controller.
 */
export default function useModalViewController({
  account,
  hideModal,
  changeUserMutation,
  tmpUsername,
  setTmpUsername,
}: Props): ModalViewController {
  const handleSave = () => {
    hideModal()
    changeUserMutation.mutate()
  }

  return {
    account,
    tmpUsername,
    setTmpUsername,
    onModalValidate: handleSave,
  }
}
