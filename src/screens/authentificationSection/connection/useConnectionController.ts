/**
 * @fileoverview Connection screen controller.
 * @module useConnectionController
 * @description Controller for the Connection screen.
 * @requires react react
 */

import { useContext, useState } from 'react'
import { AccountContext } from '@global/contexts/AccountProvider'
import { connect, forgotPassword } from '@helpers/httpClient/auth'
import { Alert } from 'react-native'

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
  const [email, setEmail] = useState<string>(__DEV__ ? 'Johan1@chrillesen.net' : '')
  const [password, setPassword] = useState<string>(__DEV__ ? 'JesuisJohan2003?' : '')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { account, setAccount } = useContext(AccountContext)
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

  /**
   * @function analyseServerResponse
   * @description Analyse the server's response to the request.
   * @param res Response object from the server.
   * @returns {Promise<void>} Promise of void
   */
  async function analyseServerResponse(res: Response): Promise<void> {
    res.json().then(response => {
      if (res.status === 201) {
        setAccount({
          ...account,
          email,
          username: response.username,
          accessToken: response.access_token,
        })
        setIsLoading(false)
        navigation.navigate('AppRouter')
      } else {
        setError(response.message)
      }
      setIsLoading(false)
    })
  }

  /**
   * @function connectUser
   * @description Send the user's email and password to the server to connect them to the app.
   * @returns {Promise<void>} Promise of void
   */
  async function connectUser(): Promise<void> {
    setError(undefined)
    setIsLoading(true)
    await connect({
      username: email,
      password,
    })
      .then(async res => {
        await analyseServerResponse(res)
      })
      .catch(() => {
        setError('Une erreur est survenue')
      })
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
    isLoading,
  }
}
