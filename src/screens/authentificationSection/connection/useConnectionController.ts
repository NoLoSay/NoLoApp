/**
 * @fileoverview Connection screen controller.
 * @module useConnectionController
 * @description Controller for the Connection screen.
 * @requires react react
 */

import { useState } from 'react'
import { Alert } from 'react-native'
import { forgotPassword } from '@helpers/httpClient/queries/auth/auth'
import useConnect from '@helpers/httpClient/queries/auth/useConnect'

interface ConnectionController {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  showPassword: boolean
  setShowPassword: (showPassword: boolean) => void
  connect: () => void
  forgottenPassword: () => void
  error: string | undefined
  isLoading: boolean
}

interface useConnectionControllerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

/**
 * @function useConnectionController
 * @description Controller for the Connection screen.
 * @param navigation Object containing the navigation prop.
 * @returns {ConnectionController} Object containing the email, setEmail, password, setPassword, passwordConfirmation, setPasswordConfirmation, showPassword, setShowPassword, showPasswordConfirmation, setShowPasswordConfirmation, subscribe, and error.
 */
export default function useConnectionController({ navigation }: useConnectionControllerProps): ConnectionController {
  const [email, setEmail] = useState<string>(__DEV__ ? 'User' : '')
  const [password, setPassword] = useState<string>(__DEV__ ? 'password' : '')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  const connectionMutation = useConnect({ formUsername: email, password, navigation, setError })

  /**
   * @function connectUser
   * @description Send the user's email and password to the server to connect them to the app.
   * @returns {Promise<void>} Promise of void
   */
  async function connectUser(): Promise<void> {
    setError(undefined)
    connectionMutation.mutate()
  }

  /**
   * @function forgottenPassword
   * @description Send the user's email to the server to reset their password.
   * @returns {Promise<void>} Promise of void
   */
  async function forgottenPassword(): Promise<void> {
    setError(undefined)
    if (emailRegex.test(email) === false) {
      setError('Veuillez rentrer un email valide')
      return
    }
    await forgotPassword({ email })
    Alert.alert('Email envoyé', 'Si le compte existe, un email a été envoyé pour réinitialiser le mot de passe.')
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    connect: connectUser,
    forgottenPassword,
    error,
    isLoading: connectionMutation.isPending,
  }
}
