/**
 * @fileoverview Settings screen controller.
 * @module useSettingsScreenController
 * @description Controller for the scan screen.
 * @requires react react
 */

import { AccountContext } from '@source/global/contexts/AccountProvider'
import { AccountType } from '@source/global/types/Account'
import { useContext, useState } from 'react'

type SettingsScreenController = {
  account: AccountType
  firstName: string
  setFirstName: (firstName: string) => void
  lastName: string
  setLastName: (lastName: string) => void
  username: string
  setUsername: (username: string) => void
  isModalVisible: boolean
  showModal: () => void
  hideModal: () => void
}

/**
 * @function useSettingsScreenController
 * @description Controller that handles the logic for the settings screen.
 * @returns {SettingsScreenController} Scan screen controller.
 */
const useSettingsScreenController = (): SettingsScreenController => {
  const { account } = useContext(AccountContext)
  const [firstName, setFirstName] = useState(account.name.firstName)
  const [lastName, setLastName] = useState(account.name.lastName)
  const [username, setUsername] = useState(account.username)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => setIsModalVisible(true)

  const hideModal = () => setIsModalVisible(false)

  return {
    account,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    isModalVisible,
    showModal,
    hideModal,
  }
}

export default useSettingsScreenController
