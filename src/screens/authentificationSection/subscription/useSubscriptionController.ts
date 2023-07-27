import { AccountContext } from '@global/contexts/AccountContext'
import { useContext, useState } from 'react'

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
  const { account, setAccount } = useContext(AccountContext)

  function subscribe() {
    console.log('subscribe', email, password, passwordConfirmation)
    setAccount({ username: email, authentified: true, phoneNumber: '', email })
    navigation.navigate('AppRouter')
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
  }
}
