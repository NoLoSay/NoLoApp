/**
 * @fileoverview Settings screen controller.
 * @module useSettingsScreenController
 * @description Controller for the scan screen.
 * @requires react react
 */

import { useContext, useState } from 'react'
import { Alert, Linking } from 'react-native'
import { AccountContext, defaultAccount } from '@global/contexts/AccountProvider'
import { AccountType } from '@global/types/Account'
import useDeleteUser from '@helpers/httpClient/queries/user/useDeleteUser'

type SettingsScreenController = {
  account: AccountType
  username: string
  isHelpModalVisible: boolean
  showHelpModal: () => void
  hideHelpModal: () => void
  goToMail: () => void
  isBiometryEnabled: boolean
  toggleBiometry: () => void
  logoutUser: () => void
  aboutApp: () => void
  openTerms: () => void
  openAccountSettings: () => void
  removeAccount: () => void
  error: string
  isLoading: boolean
}

/**
 * @function useSettingsScreenController
 * @description Controller that handles the logic for the settings screen.
 * @param navigation Object containing the navigation prop.
 * @returns {SettingsScreenController} Scan screen controller.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSettingsScreenController = ({ navigation }: any): SettingsScreenController => {
  const { account, setAccount } = useContext(AccountContext)
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false)
  const [isBiometryEnabled, setIsBiometryEnabled] = useState(false)
  const [error, setError] = useState('')
  const deleteAccountMutation = useDeleteUser({ setError, navigation })

  const showHelpModal = () => setIsHelpModalVisible(true)

  const hideHelpModal = () => setIsHelpModalVisible(false)

  const openAccountSettings = () => navigation.navigate('AccountModification')

  const goToMail = () => Linking.openURL('mailto:no.lo.pro@gmail.com')

  const toggleBiometry = () => setIsBiometryEnabled(!isBiometryEnabled)

  const removeAccount = () =>
    Alert.alert('Suppression du compte', 'Êtes-vous sûr de vouloir supprimer votre compte ?', [
      {
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => deleteAccountMutation.mutate(),
      },
    ])

  const logoutUser = () => {
    setAccount(defaultAccount)
    navigation.popToTop()
  }

  // TODO: Change to about us route
  const aboutApp = () => navigation.navigate('WebViewModal', { uri: 'https://nolosay.com/about', name: 'À propos' })

  // TODO: Change to CGU route
  const openTerms = () => navigation.navigate('WebViewModal', { uri: 'https://nolosay.com', name: 'CGU' })

  return {
    account,
    username: account.username,
    isHelpModalVisible,
    showHelpModal,
    hideHelpModal,
    goToMail,
    isBiometryEnabled,
    toggleBiometry,
    logoutUser,
    aboutApp,
    openTerms,
    openAccountSettings,
    removeAccount,
    error,
    isLoading: deleteAccountMutation.isPending,
  }
}

export default useSettingsScreenController
