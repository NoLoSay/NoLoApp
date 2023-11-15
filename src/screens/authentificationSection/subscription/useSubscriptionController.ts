/**
 * @fileoverview Subscription screen controller.
 * @module useSubscriptionController
 * @description Controller for the Subscription screen.
 * @requires react react
 */

import { useContext, useState } from 'react'
import { AccountContext } from '@global/contexts/AccountProvider'
import { subscribe } from '@helpers/httpClient/auth'

interface SubscriptionController {
  email: string
  setEmail: (email: string) => void
  username: string
  setUsername: (username: string) => void
  password: string
  setPassword: (password: string) => void
  passwordConfirmation: string
  setPasswordConfirmation: (passwordConfirmation: string) => void
  showPassword: boolean
  setShowPassword: (showPassword: boolean) => void
  showPasswordConfirmation: boolean
  setShowPasswordConfirmation: (showPasswordConfirmation: boolean) => void
  subscribe: () => void
  error: string | undefined
}

interface useSubscriptionControllerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any
}

/**
 * @function useSubscriptionController
 * @description Controller for the Subscription screen.
 * @param param0 Object containing the navigation prop.
 * @returns {SubscriptionController} Object containing the email, setEmail, password, setPassword, passwordConfirmation, setPasswordConfirmation, showPassword, setShowPassword, showPasswordConfirmation, setShowPasswordConfirmation, subscribe, and error.
 */
export default function useSubscriptionController({
  navigation,
}: useSubscriptionControllerProps): SubscriptionController {
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
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
          authentified: true,
          email,
          username: response.username,
        })
        navigation.navigate('AppRouter')
      } else {
        setError(response.message)
      }
    })
  }

  /**
   * @function subscribeUser
   * @description Send the user's email and password to the server to subscribe them to the app.
   * @returns {Promise<void>} Promise of void
   */
  async function subscribeUser(): Promise<void> {
    setError(undefined)
    if (emailRegex.test(email) === false) {
      setError('Veuillez rentrer un email valide')
      return
    }
    if (!__DEV__ && password.length < 8) {
      setError('Mot de passe trop court')
      return
    }
    if (password !== passwordConfirmation) {
      setError('Mots de passe différents')
      return
    }
    await subscribe({
      email,
      username,
      password,
    })
      .then(async res => {
        await analyseServerResponse(res)
      })
      .catch(() => {
        setError('Une erreur est survenue')
      })
  }

  return {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    showPassword,
    setShowPassword,
    showPasswordConfirmation,
    setShowPasswordConfirmation,
    subscribe: subscribeUser,
    error,
  }
}
