import { useContext, useState } from 'react'
import { Alert } from 'react-native'
import { AccountContext } from '@global/contexts/AccountProvider'
import post from '@helpers/httpClient/httpClient'

interface SubscriptionController {
  email: string
  setEmail: (email: string) => void
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
  navigation: any
}

export default function useSubscriptionController({
  navigation,
}: useSubscriptionControllerProps): SubscriptionController {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const { account, setAccount } = useContext(AccountContext)
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

  async function subscribe() {
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
    setAccount({
      ...account,
      authentified: true,
      email,
      username: email,
    })
    await post({
      url: 'http://api.nolosay.com:3001/users',
      body: {
        username: email,
        email,
        password,
      },
    })
      .then((response: any) => {
        if (response.status !== 201) {
          setError('Une erreur est survenue')
          return
        }
        Alert.alert('Inscription réussie')
        navigation.navigate('AppRouter')
      })
      .catch(() => {
        setError('Une erreur est survenue')
      })
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    showPassword,
    setShowPassword,
    showPasswordConfirmation,
    setShowPasswordConfirmation,
    subscribe,
    error,
  }
}
