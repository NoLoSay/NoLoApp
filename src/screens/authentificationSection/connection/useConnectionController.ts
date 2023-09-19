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
}

interface useConnectionControllerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

/**
 * @function useConnectionController
 * @description Controller for the Connection screen.
 * @param param0 Object containing the navigation prop.
 * @returns {ConnectionController} Object containing the email, setEmail, password, setPassword, passwordConfirmation, setPasswordConfirmation, showPassword, setShowPassword, showPasswordConfirmation, setShowPasswordConfirmation, subscribe, and error.
 */
export default function useConnectionController({ navigation }: useConnectionControllerProps): ConnectionController {
  const [email, setEmail] = useState<string>(__DEV__ ? 'NoLoUser1' : '')
  const [password, setPassword] = useState<string>(__DEV__ ? 'tata' : '')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const { account, setAccount } = useContext(AccountContext)
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

  async function analyseServerResponse(res: Response) {
    res.json().then(response => {
      if (res.status === 201) {
        setAccount({
          ...account,
          authentified: true,
          email,
          username: response.username,
          accessToken: response.accessToken,
        })
        navigation.navigate('AppRouter')
      } else {
        setError(response.message)
      }
    })
  }

  async function connectUser() {
    setError(undefined)
    await connect({
      email,
      password,
    })
      .then(async res => {
        await analyseServerResponse(res)
      })
      .catch(() => {
        setError('Une erreur est survenue')
      })
  }

  async function forgottenPassword() {
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
  }
}
