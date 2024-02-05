/**
 * @fileoverview Settings screen controller.
 * @module useSettingsScreenController
 * @description Controller for the scan screen.
 * @requires react react
 */

import { useContext, useState } from 'react'
import { Linking } from 'react-native'
import { AccountContext, defaultAccount } from '@global/contexts/AccountProvider'
import { AccountType } from '@global/types/Account'

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
  isHelpModalVisible: boolean
  showHelpModal: () => void
  hideHelpModal: () => void
  goToMail: () => void
  isBiometryEnabled: boolean
  toggleBiometry: () => void
  logoutUser: () => void
  aboutApp: () => void
  openTerms: () => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

/**
 * @function useSettingsScreenController
 * @description Controller that handles the logic for the settings screen.
 * @param navigation Object containing the navigation prop.
 * @returns {SettingsScreenController} Scan screen controller.
 */
const useSettingsScreenController = ({ navigation }: any): SettingsScreenController => {
  const { account, setAccount } = useContext(AccountContext)
  const [firstName, setFirstName] = useState(account.name.firstName)
  const [lastName, setLastName] = useState(account.name.lastName)
  const [username, setUsername] = useState(account.username)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false)
  const [isBiometryEnabled, setIsBiometryEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const showModal = () => setIsModalVisible(true)

  const hideModal = () => setIsModalVisible(false)

  const showHelpModal = () => setIsHelpModalVisible(true)

  const hideHelpModal = () => setIsHelpModalVisible(false)

  const goToMail = () => Linking.openURL('mailto:johan@chrillesen.net')

  const toggleBiometry = () => setIsBiometryEnabled(!isBiometryEnabled)

  const logoutUser = () => {
    setAccount(defaultAccount)
    navigation.popToTop()
  }

  // TODO: Change to about us route
  const aboutApp = () => navigation.navigate('WebViewModal', { uri: 'https://nolosay.com', name: 'À propos' })

  // TODO: Change to CGU route
  const openTerms = () => navigation.navigate('WebViewModal', { uri: 'https://nolosay.com', name: 'CGU' })

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
    isHelpModalVisible,
    showHelpModal,
    hideHelpModal,
    goToMail,
    isBiometryEnabled,
    toggleBiometry,
    logoutUser,
    aboutApp,
    openTerms,
    isLoading,
    setIsLoading,
  }
}

export default useSettingsScreenController
