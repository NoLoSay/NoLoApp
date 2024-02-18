/**
 * @fileoverview Settings screen controller.
 * @module useSettingsScreenController
 * @description Controller for the scan screen.
 * @requires react react
 */

import { useContext, useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { AccountContext, defaultAccount } from '@global/contexts/AccountProvider'
import { AccountType } from '@global/types/Account'
import useChangeUser from '@helpers/httpClient/queries/user/useChangeUser'
import ChangeUserJSON from '@global/types/httpClient/user/ChangeUser'
import { UseMutationResult } from '@tanstack/react-query'

type SettingsScreenController = {
  account: AccountType
  username: string
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
  changeUserMutation: UseMutationResult<ChangeUserJSON, Error, void, unknown>
  tmpUsername: string
  setTmpUsername: (username: string) => void
}

/**
 * @function useSettingsScreenController
 * @description Controller that handles the logic for the settings screen.
 * @param navigation Object containing the navigation prop.
 * @returns {SettingsScreenController} Scan screen controller.
 */
const useSettingsScreenController = ({ navigation }: any): SettingsScreenController => {
  const { account, setAccount } = useContext(AccountContext)
  const [username, setUsername] = useState(account.username)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false)
  const [isBiometryEnabled, setIsBiometryEnabled] = useState(false)
  const [tmpUsername, setTmpUsername] = useState(account.username)
  const changeUserMutation = useChangeUser({ formUsername: tmpUsername })

  useEffect(() => {
    if (changeUserMutation.isSuccess) {
      setUsername(tmpUsername)
    }
  }, [changeUserMutation.isSuccess, setUsername, tmpUsername])

  const showModal = () => setIsModalVisible(true)

  const hideModal = () => setIsModalVisible(false)

  const showHelpModal = () => setIsHelpModalVisible(true)

  const hideHelpModal = () => setIsHelpModalVisible(false)

  const goToMail = () => Linking.openURL('mailto:no.lo.pro@gmail.com')

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
    username,
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
    isLoading: changeUserMutation.isPending,
    changeUserMutation,
    tmpUsername,
    setTmpUsername,
  }
}

export default useSettingsScreenController
