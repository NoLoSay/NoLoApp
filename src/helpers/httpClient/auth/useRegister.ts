import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Header } from '../../../global/types/httpClient/Header'
import { AccountContext } from '../../../global/contexts/AccountProvider'
import { subscribe } from '../auth'
import RegisterJSON from '../../../global/types/httpClient/auth/Registration'

interface RegisterProps {
  url?: string
  formUsername: string
  formEmail: string
  password: string
  navigation: any
  headers?: Header
  setError: (error: string) => void
}

type RegisterUserProps = {
  username: string
  email: string
  status: number
  message: string
}

export default function useRegister({ formEmail, formUsername, password, navigation, setError }: RegisterProps) {
  const { account, setAccount } = useContext(AccountContext)

  function registerUser({ username, email, status, message }: RegisterUserProps) {
    if (status === 201) {
      setAccount({
        ...account,
        email,
        username,
      })
      navigation.navigate('AppRouter')
    } else {
      setError(message)
    }
  }

  const mutation = useMutation<RegisterJSON>({
    mutationFn: () => subscribe({ email: formEmail, username: formUsername, password }),
    onSuccess: data => {
      try {
        registerUser({
          username: data.json.username,
          email: data.json.email,
          status: data.status,
          message: data.message,
        })
      } catch (error) {
        // @ts-expect-error - error is a string
        setError(error.message)
      }
    },
    onError: error => {
      setError(error.message)
    },
  })

  return mutation
}
